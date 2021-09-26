import {useState, useEffect, useRef} from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';
import LoadMoreButton from '../Button';
import SpinnerLoader from '../Loader';

import { fetchImages } from '../../services/images-api';
import { List } from './ImageGallery.styled.jsx'

const Status = {
    IDLE: 'idle',
    RESOLVED: 'resolved',
    REJECTED:'rejected'
}

export default function ImageGallery({ searchName, onSelect}) {
    const [images, setImages] = useState( []);
    const [page, setPage] = useState( 1 );
    const [searchResult, setSearchResult] = useState(null);
    const [status, setStatus] = useState(Status.IDLE);
    const [spinner, setSpinner] = useState(false);

    const myRef = useRef();
    
    //new search
     useEffect(() => {
        if (!searchName) {
            return; 
        }
        setSpinner(true);
    
        fetchImages(searchName, 1)
            .then((data) => {
                if (data.hits.length === 0) {
                    return toast('Alas, no items found per your query', {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
                }
                setImages(data.hits);
                setSearchResult(data.total);
                setStatus(Status.RESOLVED);
                setSpinner(false);
                scrollToRef();
            })
            .catch(error => {
                setStatus(Status.REJECTED);
                setSpinner(false);
            });
        
     }, [searchName])
    
    //load more
    useEffect(() => {
        if (!searchName) {
            return; 
        }
        setSpinner(true);
        fetchImages(searchName, page)
            .then((data) => {
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
        
    },[page])

    const toggleLoadMore = () => {
        setSpinner(true);
        setPage(page => page + 1);
    }

    const scrollToRef = () => {
        myRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    if (status === Status.IDLE) {
        return <div></div>
    }
    
    if (status === Status.REJECTED) {
        return toast('Извините, по вашему запросу ничего не найдено', {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    }
    
    if (status === Status.RESOLVED) {
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

ImageGallery.propTypes = {
    onSubmit: PropTypes.func,
    onSelect: PropTypes.func,
    searchName: PropTypes.string.isRequired,
};