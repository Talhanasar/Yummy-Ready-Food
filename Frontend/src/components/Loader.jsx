import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ size = 'default', fullScreen = false }) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    default: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50'
    : 'flex items-center justify-center p-4';

  return (
    <div className={containerClasses} role="status">
      <Loader2 className={`animate-spin text-orange-500 ${sizeClasses[size]}`} />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;