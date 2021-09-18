import React, { Component, createRef } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';
import LoadMoreButton from '../Button';
import SpinnerLoader from '../Loader';

import { fetchImages } from '../../services/images-api';
import {List} from './ImageGallery.styled.jsx'

export default class ImageGallery extends Component {

    state = {
        images: null,
        error: null,
        page: 1,
        searchResult: null,
        status: 'idle',
        spinner: false
    }

    myRef = createRef();

    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.searchName;
        const nextName = this.props.searchName;
        const prevPage = prevState.page;
        const nextPage = this.state.page;
        const images = this.state.images;

        if (prevPage < nextPage) {
            this.setState({spinner:true});
            fetchImages(nextName, nextPage)
            .then((data) => {
                let newImages = [...images, ...data.hits];
                this.setState({ images: newImages, status: 'resolved', spinner:false });
                this.scrollToRef();
            })
                .catch(error => this.setState({ error, status: 'rejected', spinner:false }))
            ;
        }

        if (prevName !== nextName) {
            this.setState({ spinner:true, page:1 });
            fetchImages(nextName, 1)
                .then((data) => {
                    this.setState({ images: data.hits, searchResult: data.total, status: 'resolved', spinner: false });
                    if (this.state.images.length === 0) {
                    return toast('Извините, по вашему запросу ничего не найдено', {style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                    },});
                }
            })
            .catch (error => this.setState({ error, status: 'rejected' }))
        }
    }

    toggleLoadMore = () => {
        this.setState({ spinner:true, page: this.state.page + 1 });
    }

    scrollToRef = () => {
        this.myRef.current.scrollIntoView({behavior: "smooth", block: "end"});
    }
    
    render() {
        const { images, status, searchResult, spinner } = this.state;

        if (status === 'idle') {
            return <div></div>
        }

        if (status === 'rejected') {
            return toast('Извините, по вашему запросу ничего не найдено', {style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
            });
        }

        if (status === 'resolved') {
            return (
                <div>
                    <List >
                        {images.map(image=> (
                            <ImageGalleryItem src={image.webformatURL} alt={image.tags} onClick={() => this.props.onSelect(image.largeImageURL)} key={image.id}/>
                        ))}
                    </List>
                    {spinner && <SpinnerLoader /> }
                    <div ref={this.myRef} >{searchResult>12 && <LoadMoreButton onClick={this.toggleLoadMore} />}</div>
                </div>
                
            )
        }
    }
}

ImageGallery.propTypes = {
    onSubmit: PropTypes.func,
    onSelect: PropTypes.func,
    searchName: PropTypes.string.isRequired,
};

