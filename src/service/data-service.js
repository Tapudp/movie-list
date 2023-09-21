import constants from '../constants';

// to fetch the page level data
export const fetchData = async (pageNumber) => {
  const response = await fetch(`${constants.urls.BASE_API}/data/page${pageNumber}.json`);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to fetch data');
  }
};
