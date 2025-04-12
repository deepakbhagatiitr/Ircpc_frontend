// loader.js
import React from 'react';

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 loader">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full spinner animate-spin"></div>
    </div>
  );
}
