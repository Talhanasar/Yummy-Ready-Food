import React, { useState } from 'react';
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff, Loader2, Lock, User, Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import FullPageLoader from '../components/ui/FullPageLoader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { adminSignupSchema } from '../utils/zodValidation';

const AdminSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const validatedData = adminSignupSchema.parse(formData);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin`, validatedData);
      if(res.status === 201){
        toast.success('Signup successful');
        setSubmitting(false);
        navigate('/admin/login');
      }
    } catch (error) {
      setSubmitting(false);
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
        toast.error(error.errors[0].message);
      } else {
        if(error.response.status === 400){
          setError(error.response.data.message);
          toast.error(error.response.data.message);
        }else{
          setError('An error occurred. Please try again.');
          toast.error('An error occurred. Please try again.');
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {submitting && <FullPageLoader />}
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/images/logo.jpg"
            alt="Yummy Ready Food Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Signup
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full pl-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 z-10" />
              </div>
            </div>
            <div>
              <label htmlFor="phoneNumber" className="sr-only">
                Phone Number
              </label>
              <div className="relative">
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="appearance-none rounded-none relative block w-full pl-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 z-10" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full pl-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 z-10" />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {submitting ? <Loader2 className="animate-spin" /> : "Sign up"}
            </Button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account? <Link to="/admin/login" className="font-medium text-orange-600 hover:text-orange-500">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
