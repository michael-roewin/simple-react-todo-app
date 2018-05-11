import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class TodoForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: ''
        };

        this.props.onAccess();
    }

    //this will run before the view is loaded
    componentWillMount() {
        if(this.props.match.params.id) {

            this.setState({
                mode: 'Edit'
            })

        } else {

            this.setState({
                mode: 'Add'
            })
        }
    }

    //this will run after the view has been loaded
    componentDidMount() {
        if(this.props.match.params.id) {
            let todos = localStorage.getItem('todos');
                todos = JSON.parse(todos);

            var todoId = this.props.match.params.id;

            let index = todos.findIndex(function(todo) {
                return todo.id == todoId;
            });

            let todo = todos[index];

            this.refs.todo.value = todo.name;
            this.refs.complete.checked = todo.complete;
        }
    }

    saveTodo(e) {

        e.preventDefault();
        
        if(this.refs.todo.value === '') {
            alert('Please Enter the Todo Name');
            return false;
        }

        let todos = localStorage.getItem('todos');
            todos = JSON.parse(todos);

        var todoId = this.props.match.params.id;

        var index = todos.findIndex(function(todo) {
            return todo.id == todoId;
        });

        if(todoId) {

            todos[index].name = this.refs.todo.value;
            todos[index].complete = this.refs.complete.checked;

        } else {

            todos.push({
                id: todos.length + 1,
                name: this.refs.todo.value,
                complete: this.refs.complete.checked
            })

        }

        localStorage.setItem('todos', JSON.stringify(todos));

        this.props.history.push("/")

        this.props.onAction(todoId ? 'Updated' : 'Created')

    }

    showTodoList() {
        this.props.history.push("/")
    }

    render() {

        let mode = this.state.mode;

        return (
            <div>
                <div className="text-right">
                    <button type="button" className="btn btn-sm btn-default mb-3" onClick={this.showTodoList.bind(this)}>View Todos</button>
                </div>
                <h2>{mode} Todo</h2>
                <form method="post" onSubmit={this.saveTodo.bind(this)}>
                    <input type="text" className="form-control mb-2" ref="todo" placeholder="Todo Name" />
                    <div className="form-check  mb-3">
                      <input className="form-check-input" type="checkbox" id="complete" ref="complete" />
                      <label className="form-check-label" htmlFor="complete">
                        Complete
                      </label>
                    </div>
                    <button type="submit" className="btn btn-sm btn-primary ">{mode == 'Add' ? 'Create' : 'Update'} Todo</button>
                </form>
            </div>
        );
    }
}

export default withRouter(TodoForm);