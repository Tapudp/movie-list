import constants from '../constants';

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
