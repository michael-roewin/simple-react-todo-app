import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

class Todo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alert: ''
        }
        this.timeOut = null;
    }

    handleAction(action) {

        clearTimeout(this.timeOut);

        this.setState({
            alert: (<div className={'alert alert-' + (action == 'Deleted' ? 'danger' : 'success')}>Todo Successfully {action}!</div>)
        })

        this.timeOut = setTimeout(function() {
            this.setState({
                alert: ''
            })
        }.bind(this), 3000)
    }

    removeAlert() {
        this.setState({
            alert: ''
        })
    }

    render() {
        return (
            <div>
                <Route exact path="/" render={() => <TodoList alert={this.state.alert} onAction={this.handleAction.bind(this)} />} />
                <Route path="/new" render={() => <TodoForm onAction={this.handleAction.bind(this)} onAccess={this.removeAlert.bind(this)} />} />
                <Route path="/todo/:id" render={() => <TodoForm onAction={this.handleAction.bind(this)} onAccess={this.removeAlert.bind(this)} />} />
            </div>
        );
    }

}

export default Todo;