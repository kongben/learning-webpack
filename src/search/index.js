import React from "react";
import ReactDOM from 'react-dom'
import './search.css'
import './search.less'
import logo from '../assets/avatar.png'
import "../../common";
import { a } from "./tree-sharking";
class Search extends React.Component {
    render() {
        const funcA = a()
        return <div className='search-text'>{funcA} <img src={ logo }></img>Search Text</div>
    }
}

ReactDOM.render(
    <Search/>,
    document.getElementById('root')
)