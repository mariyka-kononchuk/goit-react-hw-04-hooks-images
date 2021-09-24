import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
import Modal from '../Modal';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import {Container} from './App.styled'

class App extends Component {

  state = {
    searchName: '',
    images: null,
    selectedImage:null
  }

  handleSearchSubmit = searchName => {
    this.setState({ searchName });
  }

  handleSelectImage = imageUrl => {
    this.setState({ selectedImage: imageUrl })
  }

  closeModal = () => this.setState({ selectedImage: null });

  render() {
    const { searchName, selectedImage  } = this.state;
    
    return (
      <Container>
        
          <Searchbar onSubmit={this.handleSearchSubmit} />
          <ImageGallery searchName={searchName} onSelect={this.handleSelectImage}/>
          {selectedImage && <Modal onClose = {this.closeModal}>
            <img src={selectedImage} alt="" />
          </Modal>}
          <Toaster/>
        
      </Container>
    );
  }
}

export default App;
