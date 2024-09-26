import React from 'react';

const Sparkle: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center h-12 w-12">
     
      <div className="absolute h-2 w-2 rounded-full bg-yellow-300 animate-ping"></div>
      <div className="absolute h-2 w-2 rounded-full bg-yellow-400 animate-ping delay-100"></div>
      <div className="absolute h-2 w-2 rounded-full bg-yellow-500 animate-ping delay-200"></div>
      <div className="absolute h-2 w-2 rounded-full bg-yellow-600 animate-ping delay-300"></div>
    </div>
  );
};

export default Sparkle;
