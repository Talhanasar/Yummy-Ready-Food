import React from 'react'
import { Home, Search } from 'lucide-react'
import Button from '../components/ui/Button'
import { useNavigate, useRouteError } from 'react-router'

export default function NotFound() {
  const navigate = useNavigate()
  const error = useRouteError()

  if (error.status === 404) {
    return (
      <div className="flex flex-col min-h-screen bg-white text-black">
        <main className="flex-1 flex items-center justify-center bg-orange-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 text-center">
            <div>
              <h1 className="mt-6 text-center text-6xl font-extrabold text-orange-500">
                404
              </h1>
              <h2 className="mt-2 text-center text-3xl font-bold text-gray-900">
                Page Not Found
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Oops! The page you're looking for doesn't exist.
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <p className="text-md text-gray-700">
                It seems you've taken a wrong turn in our kitchen. Don't worry, we'll help you find your way back to deliciousness!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  onClick={() => navigate('/')}
                  className="flex items-center justify-center bg-orange-500 text-white hover:bg-orange-600"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Go to Homepage
                </Button>
                <Button
                  onClick={() => navigate('/shop')}
                  className="flex items-center justify-center bg-white text-orange-500 border border-orange-500 hover:bg-orange-100"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Browse Our Shop
                </Button>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                If you believe this is an error, please{' '}
                <a href="https://wa.me/8801835384531" className="font-medium text-orange-600 hover:text-orange-500">
                  contact our support team
                </a>
                .
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }else{
    toast.error("something went wrong");
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="text-lg mb-6">{error.message}</p>
      <Button
        onClick={() => navigate('/')}
        className="flex items-center justify-center bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded"
      >
        <Home className="mr-2 h-5 w-5" />
        Go to Homepage
      </Button>
    </div>
  )
}