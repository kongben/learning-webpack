import React from "react";
import ReactDOM from 'react-dom'
import './search.css'
import './search.less'
import logo from '../assets/avatar.png'
import "../../common";
import { a } from "./tree-sharking";
class Search extends React.Component {

    constructor() {
        super(...arguments);

        this.state = {
            Text: null
        }
    }

    loadComponent() {
        import('./test.js').then((Text) => {
            this.setState({
                Text: Text.default
            })
        })
    }

    render() {
        const funcA = a()
        const { Text } = this.state

        return <div className='search-text'>
            {
                Text ? <Text /> : null
            }
            {funcA} <img src={logo} onClick={this.loadComponent.bind(this)}/>
            Search Text
            </div>
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)