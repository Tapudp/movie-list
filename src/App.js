import React from 'react';
import ContentGrid from './containers/ContentGrid';
import Navbar from './containers/Navbar';
import { DataProvider } from './context/DataContext';
import './styles/app.css';

function App() {
  return (
    <DataProvider>
      <div className='App'>
        <Navbar />
        <ContentGrid />
      </div>
    </DataProvider>
  );
}

export default App;
