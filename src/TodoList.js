import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import TodoItem from './TodoItem';

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    componentWillMount() {

        //localStorage.removeItem('todos');

        if(!localStorage.getItem('todos')) {
            localStorage.setItem('todos', JSON.stringify([
                {
                    id: 1,
                    name: 'Learn React JS',
                    complete: true
                },
                {
                    id: 2,
                    name: 'Learn Vue JS',
                    complete: false
                },
                {
                    id: 3,
                    name: 'Learn Angular JS',
                    complete: false
                }
            ]))
        }
        
        this.setState({
            todos: JSON.parse(localStorage.getItem('todos'))
        })
    }

    addTodo() {
        this.props.history.push("/new")
    }

    handleDelete(todo) {
        if(window.confirm('Are you sure you want to delete this todo?')) {

            let todos = localStorage.getItem('todos');
                todos = JSON.parse(todos);

            let index = todos.indexOf(todo);

            todos.splice(index, 1);

            localStorage.setItem('todos', JSON.stringify(todos));

            this.setState({
                todos: JSON.parse(localStorage.getItem('todos'))
            })

            this.props.onAction('Deleted')
        }
    }

    render() {

        let todos = this.state.todos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} handleDelete={this.handleDelete.bind(this)} />;
        })

        return (
            <div className="todos">
                <h2>Todo List</h2>
                {this.props.alert}
                <button type="button" className="btn btn-sm btn-primary mb-3" onClick={this.addTodo.bind(this)}>Add Todo</button>
                <table>
                    <thead>
                        <tr>
                            <th>Todo Name</th>
                            <th>Todo Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withRouter(TodoList);