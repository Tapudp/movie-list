import React, { createContext, useContext, useState } from 'react';
import constants from '../constants';
import * as DataService from '../service/data-service';
import utils from '../utils';

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState(constants.user.BASE_TITLE);

  // fetch the page data
  const fetchData = async () => {
    setStatus('');
    setIsLoading(true);
    try {
      // maximum page limit is reached
      if (page > constants.user.MAX_PAGES) {
        setIsLoading(false);
        setStatus(constants.errors.MAX_PAGE_LIMIT_REACHED);
        return;
      }

      const response = await DataService.fetchData(page);
      const contentfulData =
        response?.page?.['content-items']?.content.map(utils.formatDataWithImage) || [];

      // only store the page data content that is in array format
      setData((prevData) => [...prevData, ...contentfulData]);
      setTitle(response.page.title);

      // update the page count to be it ready for the next page
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setStatus(`${constants.errors.PAGE_FETCH_ERROR}-${page}.`);
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = (query, userSubmited = true) => {
    // resets the list items back to show all data
    if (!userSubmited) {
      setFilteredData([]);
      return;
    }
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredData.length === 0) {
      alert(`There seems is no relevant mataches for ${query}`);
    }

    setFilteredData(filteredData);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        filteredData,
        isLoading,
        fetchData,
        onSearch,
        pageTitle: title,
        contextError: status,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
