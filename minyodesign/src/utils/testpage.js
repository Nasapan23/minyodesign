import React from 'react';

const TestPage = () => {
  return (
    <div className="bg-red-200 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Test Page</h1>

      <div className="flex justify-center mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Click Me
        </button>
      </div>

      <div className="text-center text-gray-700">
        <p>This is a simple test page.</p>
        <p>Use this page to test rendering within the DataSquare component.</p>
      </div>

      <div className="flex justify-center mt-4">
        <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white">Circle</span>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
