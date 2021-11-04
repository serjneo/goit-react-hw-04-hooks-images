import { useState, useEffect } from 'react';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import Searchbar from './components/Searchbar';
import Load from './components/Loader';
import fetchImages from './services/imageApi';
import './App.scss';

export default function App() {
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState(null);

  useEffect(() => {
    if (!text) {
      return;
    }
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const getImages = async () => {
    setStatus('pending');
    try {
      const images = await fetchImages(text, page);
      if (images.length < 1) {
        toast.error('Nothing found, specify your search');
      }
      setImages(prevState => [...prevState, ...images]);
      setStatus('resolved');
      setPage(prevState => prevState + 1);
      if (page !== 1) {
        pageScroll();
      }
    } catch (error) {
      console.log('Error:', error.message);
      setError({ error });
    } finally {
      setStatus('resolved');
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const setModalImgInfo = ({ largeImageURL, tags }) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    toggleModal();
  };

  const pageScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const onSubmit = text => {
    setText(text);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    getImages();
  };

  return (
    <>
      <div className="App">
        <Searchbar onSubmit={onSubmit} />
        {status === 'pending' && <Load />}
        <ImageGallery images={images} setModalImgInfo={setModalImgInfo} />
        {images.length > 0 && <Button onLoadMore={onLoadMore} />}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </div>
      <ToastContainer transition={Zoom} />
    </>
  );
}
