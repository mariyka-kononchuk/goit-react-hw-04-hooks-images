import React, { useState, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import Modal from '../Modal';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import { Container } from './App.styled'
import { fetchImages } from '../../services/images-api';
import LoadMoreButton from '../Button';
import SpinnerLoader from '../Loader';

const Status = {
    IDLE: 'idle',
    RESOLVED: 'resolved',
    REJECTED:'rejected'
}

export default function App() {
  const [searchName, setSearchName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [spinner, setSpinner] = useState(false);

  const myRef = useRef();

  const handleSearchSubmit = (searchName) => {
    setSearchName(searchName);
    setPage(1);
    setImages([]);
  }

  useEffect(() => {
    if (!searchName) {
      return
    }
    fetchImages(searchName, page)
      .then((data) => {
        if (data.hits.length === 0) {
          return toast('Извините, по вашему запросу ничего не найдено', {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
        }
        let newImages = [...images, ...data.hits];
        setImages(newImages);
        setSearchResult(data.total);
        setStatus(Status.RESOLVED);
        setSpinner(false);
        scrollToRef();
      })
      .catch(error => {
        setStatus(Status.REJECTED);
        setSpinner(false);
      });

  }, [searchName, page])

  const handleSelectImage = imageUrl => {
    setSelectedImage(imageUrl);
  }

  const scrollToRef = () => {
        myRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }
    
  const toggleLoadMore = () => {
        setSpinner(true);
        setPage(page => page + 1);
    }

  const closeModal = () => setSelectedImage(null);

      return (
      <Container>
        
          <Searchbar onSubmit={handleSearchSubmit} />
          <ImageGallery
            images={images}
            status={status}
            onSelect={handleSelectImage} />
          {spinner && <SpinnerLoader />}
          <div ref={myRef} >{searchResult > 12 && <LoadMoreButton onClick={toggleLoadMore} />}</div>
          {selectedImage && <Modal onClose = {closeModal}>
            <img src={selectedImage} alt="" />
          </Modal>}
          <Toaster/>
        
      </Container>
    );
  
}


