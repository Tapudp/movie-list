import React from 'react';
import { screen, render } from '@testing-library/react';
import Navbar from '../../components/Navbar';
import { DataProvider } from '../../context/DataContext';

// Mock the useDataContext hook
jest.mock('./DataContext', () => ({
  useDataContext: () => ({
    pageTitle: 'Test Page', // Mock the pageTitle value
  }),
}));

describe('Navbar component', () => {
  it('should render without errors', () => {
    render(
      <DataProvider>
        <Navbar />
      </DataProvider>
    );

    const appTitle = screen.getByText('Test Page');
    expect(appTitle).toBeInTheDocument();
  });

  it('should render the app title', () => {
    render(
      <DataProvider>
        <Navbar />
      </DataProvider>
    );

    const appTitle = screen.getByText('Test Page');
    expect(appTitle).toBeInTheDocument();
  });

  it('should render the Search component', () => {
    render(
      <DataProvider>
        <Navbar />
      </DataProvider>
    );

    const searchComponent = screen.getByTestId('search-component');
    expect(searchComponent).toBeInTheDocument();
  });
});
