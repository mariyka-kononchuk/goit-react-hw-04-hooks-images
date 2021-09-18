import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Header, SearchForm, SearchFormButton, Label, Input } from './Searchbar.styled'

export default class Searchbar extends Component {
    state = {
        searchName: '',
    };

    handleNameChange = e => {
        this.setState({ searchName: e.currentTarget.value.toLowerCase() })
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.searchName.trim() === '') {
            return toast('Введите слово в поиск', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            });
        }
        this.props.onSubmit(this.state.searchName);
        this.setState({ searchName: '' });
    }

    render() {
        const { searchName } = this.state;
        return (
            <Header>
                <SearchForm  onSubmit={this.handleSubmit}>
                    <SearchFormButton type="submit">
                        <Label>Search</Label>
                    </SearchFormButton>
                    <Input
                        type="text"
                        name={searchName}
                        value={searchName}
                        onChange = {this.handleNameChange}
                        autocomplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </SearchForm>
            </Header>
        )
    }
}

Searchbar.propTypes = {
    searchName: PropTypes.string,
    onSubmit: PropTypes.func,
    onChange:PropTypes.func
};

