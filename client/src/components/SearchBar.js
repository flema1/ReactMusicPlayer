import React, { Component } from 'react';
import * as Ionicons from 'react-icons/lib/io'
import {Link } from 'react-router-dom'


export default class SearchBar extends Component {
    render() {
        const {value, handleChange, handleSubmit} = this.props;
        return (
            <div className={'searchBar'}>
                <form >
                    <textarea value={value}  onChange={handleChange}/>       
                    <Link to={'/SearchResults'}><Ionicons.IoSearch width={'60px'} height={'2em'} onClick={handleSubmit} viewBox={"0 0 50 50"}/></Link>
                </form>   
            </div>
        )}  
}
