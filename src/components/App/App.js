import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
import Modal from '../Modal';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import {Container} from './App.styled'

export default function App() {
  
  const [searchName, setSearchName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
 
  const handleSearchSubmit = (searchName) => {
    setSearchName(searchName);
  }

  const handleSelectImage = imageUrl => {
    setSelectedImage(imageUrl);
  }

  const closeModal = () => setSelectedImage(null);

      return (
      <Container>
        
          <Searchbar onSubmit={handleSearchSubmit} />
        <ImageGallery
          searchName={searchName}
          onSelect={handleSelectImage} />
          {selectedImage && <Modal onClose = {closeModal}>
            <img src={selectedImage} alt="" />
          </Modal>}
          <Toaster/>
        
      </Container>
    );
  
}


