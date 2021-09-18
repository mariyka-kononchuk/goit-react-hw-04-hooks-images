import {useState, createRef} from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';
import LoadMoreButton from '../Button';
import SpinnerLoader from '../Loader';

import { fetchImages } from '../../services/images-api';
import {List} from './ImageGallery.styled.jsx'

export default function ImageGallery({ searchName, onSelect }) {
    const [images, setImages] = useState(null);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [searchResult, setSearchResult] = useState(null);
    const [status, setStatus] = useState('idle');
    const [spinner, setSpinner] = useState(false);

    const myRef = createRef();

    function componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.searchName;
        const nextName = searchName;
        const prevPage = prevState.page;
        const nextPage = page;
        const gallery = images;

        if (prevPage < nextPage) {
            setSpinner(true);
            fetchImages(nextName, nextPage)
                .then((data) => {
                    let newGallery = [...gallery, ...data.hits];
                    setStatus('resolved');
                    setSpinner(false);
                    setImages(newGallery);
                    scrollToRef();
                })
                .catch(error => {
                    setError(error);
                    setStatus('rejected');
                    setSpinner(false);
                })
                ;
        }

        if (prevName !== nextName) {
            this.setState({ spinner: true, page: 1 });
            fetchImages(nextName, 1)
                .then((data) => {
                    setStatus('resolved');
                    setSpinner(false);
                    setImages(data.hits);
                    setSearchResult(data.total);
                    
                    if (images.length === 0) {
                        return toast('Извините, по вашему запросу ничего не найдено', {
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
                        });
                    }
                })
                .catch(error => {
                    setError(error);
                    setStatus('rejected');
                })
        }
    }

    const toggleLoadMore = () => {
        setSpinner(true);
        setPage(page + 1)
    }

    const scrollToRef = () => {
        myRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    if (status === 'idle') {
        return <div></div>
    }
    
    if (status === 'rejected') {
        return toast('Извините, по вашему запросу ничего не найдено', {
            style: {
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
                    {images.map(image => (
                        <ImageGalleryItem src={image.webformatURL} alt={image.tags} onClick={() => onSelect(image.largeImageURL)} key={image.id} />
                    ))}
                </List>
                {spinner && <SpinnerLoader />}
                <div ref={myRef} >{searchResult > 12 && <LoadMoreButton onClick={toggleLoadMore} />}</div>
            </div>
                
        )
    
    }
}