import React, { useEffect, useRef } from 'react';
import { useDataContext } from '../context/DataContext';
import Loader from './Loader';

const LazyLoading = () => {
  const { isLoading, contextError, fetchData } = useDataContext();
  const observer = useRef();

  useEffect(() => {
    if (isLoading) return;

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchData();
      }
    });

    observer.current.observe(document.querySelector('#lazy-load-marker'));

    return () => {
      observer.current.disconnect();
    };
  }, [isLoading, fetchData]);

  return <div id='lazy-load-marker'>{isLoading && contextError !== '' && <Loader />}</div>;
};

export default LazyLoading;
