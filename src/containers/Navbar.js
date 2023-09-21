import React from 'react';
import Search from '../components/Search';
import '../styles/navbar.css';
import { useDataContext } from '../context/DataContext';

export default function Navbar() {
  const { pageTitle } = useDataContext();
  return (
    <div className='navbar'>
      <h1 className='app-title'>{pageTitle}</h1>
      <Search />
    </div>
  );
}
