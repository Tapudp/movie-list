import constants from '../constants';

// formats the fetched data item with image field attached to base url
function formatDataWithImage(item) {
  return {
    ...item,
    image:
      item['poster-image'] === 'posterthatismissing.jpg'
        ? './favicon.ico'
        : `${constants.urls.BASE_API}/images/${item['poster-image']}`,
  };
}

const utils = {
  formatDataWithImage,
};

export default utils;
