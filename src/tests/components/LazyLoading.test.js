import React from 'react';
import { screen, render, act } from '@testing-library/react';
import LazyLoading from '../../components/LazyLoading';
import { DataProvider } from '../../context/DataContext';

// Mock the fetchData function
jest.mock('./DataContext', () => ({
  useDataContext: () => ({
    isLoading: false,
    contextError: '',
    fetchData: jest.fn(),
  }),
}));

describe('LazyLoading component', () => {
  it('should render without errors', () => {
    render(
      <DataProvider>
        <LazyLoading />
      </DataProvider>
    );

    const lazyLoadMarker = screen.getByTestId('lazy-load-marker');
    expect(lazyLoadMarker).toBeInTheDocument();
  });

  it('should observe intersection and trigger fetchData', () => {
    render(
      <DataProvider>
        <LazyLoading />
      </DataProvider>
    );

    const lazyLoadMarker = screen.getByTestId('lazy-load-marker');
    const observerCallback = jest.fn();

    // Mock IntersectionObserver
    window.IntersectionObserver = jest.fn(function (callback) {
      this.observe = jest.fn((element) => {
        observerCallback(element);
      });
      this.disconnect = jest.fn();
    });

    // Simulate intersection
    act(() => {
      observerCallback({ isIntersecting: true });
    });

    expect(observerCallback).toHaveBeenCalledWith(lazyLoadMarker);
    expect(observerCallback).toHaveBeenCalledTimes(1);

    // fetchData should be called when intersecting
    expect(DataProvider.useDataContext().fetchData).toHaveBeenCalled();
  });

  it('should not trigger fetchData when isLoading is true', () => {
    // Mock isLoading to be true
    DataProvider.useDataContext().isLoading = true;

    render(
      <DataProvider>
        <LazyLoading />
      </DataProvider>
    );

    const lazyLoadMarker = screen.getByTestId('lazy-load-marker');
    const observerCallback = jest.fn();

    // Mock IntersectionObserver
    window.IntersectionObserver = jest.fn(function (callback) {
      this.observe = jest.fn((element) => {
        observerCallback(element);
      });
      this.disconnect = jest.fn();
    });

    // Simulate intersection
    act(() => {
      observerCallback({ isIntersecting: true });
    });

    expect(observerCallback).toHaveBeenCalledWith(lazyLoadMarker);
    expect(observerCallback).toHaveBeenCalledTimes(1);

    // fetchData should not be called when isLoading is true
    expect(DataProvider.useDataContext().fetchData).not.toHaveBeenCalled();
  });
});
