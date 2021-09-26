import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import { List } from './ImageGallery.styled.jsx'

const Status = {
    IDLE: 'idle',
    RESOLVED: 'resolved',
    REJECTED:'rejected'
}

export default function ImageGallery({ images, status, onSelect}) {
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
            </div> 
        )
    }
}

ImageGallery.propTypes = {
    onSubmit: PropTypes.func,
    onSelect: PropTypes.func,
};