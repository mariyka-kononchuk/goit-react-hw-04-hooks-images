import React from 'react';
import PropTypes from 'prop-types';
import {LoadMoreButton} from './Button.styled'


const Button = ({onClick}) => (
    <LoadMoreButton type="button" onClick ={onClick}>Load More</LoadMoreButton>
)

export default Button;

Button.propTypes = {
    onClick:PropTypes.func.isRequired
};