import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchImages = async (text, page) => {
  const API_KEY = '22969482-37b7f2c7deb329174334b9da4';
  const perPage = 12;
  const request = `/?image_type=photo&orientation=horizontal&q=${text}&page=${page}&per_page=${perPage}&key=${API_KEY}`;
  const { data } = await axios.get(request);
  const images = data.hits;
  return images;
};

export default fetchImages;
