import React from 'react';
import PropTypes from 'prop-types';
import {Item, ItemImage} from './ImageGalleryItem.styled'

const ImageGalleryItem = ({ src, alt, largeImage, onClick }) => (
    <Item onClick={() => onClick({ largeImage }) }  >
        <ItemImage src={src} alt={alt} />
    </Item>
)

ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImage: PropTypes.string,
    onClick:PropTypes.func.isRequired
};

export default ImageGalleryItem;