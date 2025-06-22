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
  const [locating, setLocating] = useState(false);
  const [locationPermission, setLocationPermission] = useState('unknown'); // 'granted', 'denied', 'prompt', 'unknown'

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

  // Check location permission on component mount
  useEffect(() => {
    const checkLocationPermission = async () => {
      if ('permissions' in navigator) {
        try {
          const permission = await navigator.permissions.query({ name: 'geolocation' });
          setLocationPermission(permission.state);
          
          // Listen for permission changes
          permission.onchange = () => {
            setLocationPermission(permission.state);
          };
        } catch (error) {
          console.log('Permission API not supported');
          setLocationPermission('unknown');
        }
      }
    };
    
    checkLocationPermission();
  }, []);

  const requestLocation = useCallback(() => {
    // Check if location services are likely disabled
    if (locationPermission === 'denied') {
      toast.error("Location access is blocked. Please enable location services in your browser settings.");
      setTimeout(() => {
        toast.info("💡 Click the location icon in your browser's address bar and select 'Allow'");
      }, 1500);
      return;
    }

    if (!("geolocation" in navigator)) {
      toast.error("Geolocation is not supported by your browser. Please select your location manually on the map.");
      return;
    }

    setLocating(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation([latitude, longitude]);
        setShouldLocate(true);
        setLocating(false);
        setLocationPermission('granted');
        toast.success("📍 Location found successfully!");
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocating(false);
        
        let errorMessage = "";
        let helpMessage = "";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationPermission('denied');
            errorMessage = "🚫 Location access denied. Please enable location services to use this feature.";
            helpMessage = "💡 To enable: Click the location icon (🔒) in your browser's address bar → Select 'Allow location access'";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "📡 Location information is unavailable. Please check your internet connection and GPS.";
            helpMessage = "💡 Try: Turn on GPS/Location services in your device settings and refresh the page";
            break;
          case error.TIMEOUT:
            errorMessage = "⏱️ Location request timed out. Please try again.";
            helpMessage = "💡 Tip: Make sure you're in an area with good GPS signal";
            break;
          default:
            errorMessage = "❌ An unknown error occurred while getting your location.";
            helpMessage = "💡 Try refreshing the page or selecting your location manually on the map";
            break;
        }
        
        toast.error(errorMessage);
        
        // Show help message after a delay
        setTimeout(() => {
          toast.info(helpMessage);
        }, 2000);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 15000, // Increased timeout to 15 seconds
        maximumAge: 300000 // 5 minutes cache
      }
    );
  }, [locationPermission]);

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
        toast.success("📍 Location updated on map!");
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
                  <label htmlFor="map" className="block text-sm font-medium text-gray-700 mb-1">Select Your Location (Optional)</label>
                  <p className="text-xs text-gray-500 mb-2">📍 Click anywhere on the map to set your delivery location, or use the button below to get your current location</p>
                  <div className="w-full h-64 border-2 border-gray-200 rounded-lg overflow-hidden">
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
                  <div className="mt-2 flex flex-col gap-2">
                    <div 
                      onClick={locating ? undefined : requestLocation} 
                      className={`cursor-pointer px-4 py-2 rounded-md text-white flex items-center gap-2 transition-all duration-200 ${
                        locating 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : locationPermission === 'denied'
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-orange-500 hover:bg-orange-600'
                      }`}
                    >
                      {locating ? (
                        <>
                          <Loader size="small" />
                          <span>Getting Location...</span>
                        </>
                      ) : locationPermission === 'denied' ? (
                        <>
                          <MapPin size={16} />
                          <span>Enable Location Access</span>
                        </>
                      ) : (
                        <>
                          <MapPin size={16} />
                          <span>Use My Current Location</span>
                        </>
                      )}
                    </div>
                    
                    {/* Location Status Indicator */}
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-1">
                        {locationPermission === 'granted' && (
                          <span className="text-green-600 flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Location access enabled
                          </span>
                        )}
                        {locationPermission === 'denied' && (
                          <span className="text-red-600 flex items-center gap-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            Location access blocked
                          </span>
                        )}
                        {locationPermission === 'prompt' && (
                          <span className="text-yellow-600 flex items-center gap-1">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            Click to allow location access
                          </span>
                        )}
                      </div>
                      
                      {/* Current coordinates display */}
                      <div className="text-gray-500 font-mono text-xs">
                        📍 Current: {location[0].toFixed(6)}, {location[1].toFixed(6)}
                      </div>
                    </div>
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