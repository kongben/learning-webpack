import React from "react";
import ReactDOM from 'react-dom'
import './search.css'
import './search.less'
import logo from '../assets/avatar.png'
class Search extends React.Component {
    render() {
        return <div className='search-text'> <img src={ logo }></img>Search Text</div>
    }
}

ReactDOM.render(
    <Search/>,
    document.getElementById('root')
)