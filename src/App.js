import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './Header';
import Todo from './Todo';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Todo />
                </div>
            </Router>
        );
    }
}

export default App;
