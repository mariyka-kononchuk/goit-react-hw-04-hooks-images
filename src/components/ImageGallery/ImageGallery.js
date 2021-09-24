import {useState, useEffect, useRef} from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';
import LoadMoreButton from '../Button';
import SpinnerLoader from '../Loader';

import { fetchImages } from '../../services/images-api';
import {List} from './ImageGallery.styled.jsx'

export default function ImageGallery({ searchName, onSelect }) {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [searchResult, setSearchResult] = useState(null);
    const [status, setStatus] = useState('idle');
    const [spinner, setSpinner] = useState(false);

    const myRef = useRef();
    
     useEffect(() => {
         console.log('вызывается useEffect2')
         console.log(searchName)
         if (!searchName) return;
         setSpinner(true);
         

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
                setStatus('resolved');
                setSpinner(false);
                console.log(data.hits.length)
                 console.log(myRef)
                scrollToRef();
            })
            
            .catch(error => {
                console.log('errors')
                setStatus('rejected');
                setSpinner(false);
            });
         
    },[searchName, page])

    

    const toggleLoadMore = () => {
        setSpinner(true);
        setPage(page => page + 1);
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