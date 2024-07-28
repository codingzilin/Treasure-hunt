import React from 'react';

// Card Component
export const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

// Input Component
export const Input = React.forwardRef(({ className = '', ...props }, ref) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    ref={ref}
    {...props}
  />
));

Input.displayName = 'Input';

// Button Component
export const Button = React.forwardRef(({ className = '', children, ...props }, ref) => (
  <button
    className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
    ref={ref}
    {...props}
  >
    {children}
  </button>
));

Button.displayName = 'Button';

// Alert Component
export const Alert = ({ children, className = '' }) => (
  <div className={`bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 ${className}`} role="alert">
    {children}
  </div>
);

export const AlertTitle = ({ children, className = '' }) => (
  <h3 className={`font-bold ${className}`}>{children}</h3>
);

export const AlertDescription = ({ children, className = '' }) => (
  <p className={className}>{children}</p>
);