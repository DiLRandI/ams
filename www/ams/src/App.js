import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Asset Management System</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col items-center justify-center">
              <img src={logo} className="h-40 w-40 animate-spin" alt="logo" />
              <p className="mt-4 text-xl text-center">
                Edit <code className="font-mono bg-gray-200 rounded p-1">src/App.js</code> and save to reload.
              </p>
              <a
                className="mt-4 text-blue-600 hover:text-blue-800 transition-colors duration-300"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
