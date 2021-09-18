import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import {Spinner} from './Loader.styled.jsx'

const SpinnerLoader = () => (
    <Spinner>
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </Spinner>
)

export default SpinnerLoader;
