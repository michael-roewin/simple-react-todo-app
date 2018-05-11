import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class TodoItem extends Component {


    editTodo() {
        this.props.history.push('/todo/' + this.props.todo.id)
    }

    deleteTodo(todo) {
        this.props.handleDelete(todo);
    }

    render() {
        return (
           <tr>
                <td>{this.props.todo.name}</td>
                <td>{this.props.todo.complete ? 'Complete' : 'Pending'}</td>
                <td>
                    <button type="button" className="btn btn-sm btn-primary" onClick={this.editTodo.bind(this)}> Edit</button>&nbsp;
                    <button type="button" className="btn btn-sm btn-danger" onClick={this.deleteTodo.bind(this, this.props.todo)}>Delete</button>
                </td>
           </tr>
        );
    }
}

export default withRouter(TodoItem);