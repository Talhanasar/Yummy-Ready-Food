import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from "react-router";
import { ShoppingBag, MapPin, User, Phone, FileText, X, Map } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useCart } from '../contexts/CartContext';
import { useCoupon } from '../contexts/CouponContext';
import Loader from '../components/Loader';
import formSchema from '../utils/zodValidation';
import { toast } from 'react-toastify';
import axios from 'axios';
import L from 'leaflet';

// Import marker icon images
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon path
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, setConfirmOrderInfo } = useCart();
  const { discount, couponUsed, removeCoupon } = useCoupon();
  const [orderInfo, setOrderInfo] = useState({
    fullName: '',
    mobileNumber: '',
    extraNote: '',
    area: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [location, setLocation] = useState([22.3462, 91.7956]); 
  const [shouldLocate, setShouldLocate] = useState(false);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = 50;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + shippingCost - discountAmount;

  const handleInputChange = (e) => {
    setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      navigate('/');
    }
  }, [cart]);

  const requestLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
          setShouldLocate(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Unable to get your current location. Please try again or select manually.");
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const validation = formSchema.safeParse(orderInfo);
    if (!validation.success) {
      setSubmitting(false);
      toast.error(validation.error.errors[0].message);
      return;
    }

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/order', {
        customerName: orderInfo.fullName,
        phoneNumber: orderInfo.mobileNumber,
        location: `${location[0]}, ${location[1]}`,
        area: orderInfo.area,
        extraNote: orderInfo.extraNote,
        subTotal: subtotal,
        totalPrice: total,
        products: cart.map(item => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        couponUsed,
        discountPercentage: discount,
      });

      if (response.status === 201) {
        toast.success('Order placed successfully!');
        setConfirmOrderInfo({ cart, discount });
        clearCart();
        removeCoupon();
        navigate('/order-confirmation');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('There was an error submitting your order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLocation([e.latlng.lat, e.latlng.lng]);
      },
    });

    return location ? <Marker position={location}></Marker> : null;
  };

  const CurrentLocationMarker = () => {
    const map = useMapEvents({
      locationfound(e) {
        setLocation([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    useEffect(() => {
      if (shouldLocate) {
        map.flyTo(location, map.getZoom());
        setShouldLocate(false);
      }
    }, [map, shouldLocate, location]);

    return null;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>
          <Button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <X size={26} />
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Cart Summary */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ShoppingBag className="mr-2" /> Cart Summary
            </h2>
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img src={item.imagePath} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{(item.price * item.quantity)}<strong className='text-xl font-bold'>৳</strong> </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Information */}
          <form onSubmit={handleSubmit} className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin className="mr-2" /> Order Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="mr-2 text-gray-400" />
                <Input
                  label="Full Name"
                  name="fullName"
                  value={orderInfo.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className={'w-full'}
                />
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 text-gray-400" />
                <Input
                  label="Mobile Number"
                  name="mobileNumber"
                  value={orderInfo.mobileNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your mobile number"
                  className={'w-full'}
                />
              </div>
              <div className="relative flex items-center">
                <Map className="mr-2 text-gray-400" />
                <div className="w-full">
                  <select
                    name="area"
                    value={orderInfo.area}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select an Area</option>
                    <option value="Lalkhan bazar">Lalkhan bazar</option>
                    <option value="Pahartoli">Pahartoli</option>
                    <option value="Ak khan">Ak khan</option>
                    <option value="GEC">GEC</option>
                    <option value="Boropol">Boropol</option>
                  </select>
                </div>
              </div>
              <div className="relative flex items-center">
                <MapPin className="mr-2 text-gray-400" />
                <div className="w-full">
                  <label htmlFor="map" className="block text-sm font-medium text-gray-700 mb-1">Select Your Location(Optional)</label>
                  <div className="w-full h-64">
                    <MapContainer
                      center={location}
                      zoom={13}
                      style={{ height: '250px', width: '100%' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <LocationMarker />
                      <CurrentLocationMarker />
                    </MapContainer>
                  </div>
                  <div onClick={requestLocation} className="mt-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md w-max">
                    Use My Current Location
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <FileText className="mr-2 mt-2 text-gray-400" />
                <div className="w-full">
                  <label htmlFor="extraNote" className="block text-sm font-medium text-gray-700 mb-1">Extra Note (Optional)</label>
                  <textarea
                    id="extraNote"
                    name="extraNote"
                    value={orderInfo.extraNote}
                    onChange={handleInputChange}
                    placeholder="Any additional information for delivery"
                    className="w-full p-2 border rounded-md resize-none min-h-[100px]"
                    rows="4"
                  />
                </div>
              </div>
            </div>
            {/* Order Summary */}
            <div className="mt-8 p-6 border-t">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{subtotal}<strong className='text-xl font-bold'>৳</strong></span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>{shippingCost}<strong className='text-xl font-bold'>৳</strong></span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between mb-2 text-green-600">
                  <span>Discount ({discount}%)</span>
                  <span>-{discountAmount}<strong className='text-xl font-bold'>৳</strong></span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
                <span>Total</span>
                <span>{total}<strong className='text-xl font-bold'>৳</strong></span>
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full mt-6  text-white ${submitting ? 'flex items-center justify-center bg-gray-400' : 'hover:bg-orange-600 bg-orange-500'}`}
              disabled={submitting}
            >
              {submitting ? <Loader size="small" /> : 'Cash on Delivery'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;