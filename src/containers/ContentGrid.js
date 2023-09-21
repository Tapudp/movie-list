import React from 'react';
import { useDataContext } from '../context/DataContext';
import '../styles/content-grid.css';
import LazyLoading from '../components/LazyLoading';

// renders the grid with lazy loading marker and a loader
export default function ContentGrid() {
  const { data, contextError, filteredData } = useDataContext();
  const rowsToRender = filteredData.length === 0 ? data : filteredData;
  return (
    <div>
      <div className='grid-container'>
        {rowsToRender.length !== 0 &&
          rowsToRender.map((item, index) => (
            <div key={index} className='grid-item'>
              <div className='thumbnail'>
                <img src={item.image} alt={`Fallback placeholder for (${item.name})`} />
              </div>
              <div className='title'>{item.name}</div>
            </div>
          ))}
      </div>
      <div className='error-contianer'>{contextError !== '' ? contextError : null}</div>
      <LazyLoading />
    </div>
  );
}
