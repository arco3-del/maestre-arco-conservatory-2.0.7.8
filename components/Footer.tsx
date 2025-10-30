
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Maestre Arco Conservatory. All rights reserved.</p>
        <p className="text-sm mt-1">Revolutionizing art education with AI.</p>
      </div>
    </footer>
  );
};
