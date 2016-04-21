import React, { PropTypes } from 'react';
import { toggleComplete, updateText, destroy } from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput';
import classNames from 'classname';

class TodoItem extends React.Component {
  static propTypes = {
    todo: PropTypes.object.isRequired
  }

  state = {
    isEditing: false
  }

  _onToggleComplete = () => {
    toggleComplete(this.props.todo);
  }

  _onDoubleClick = () => {
    this.setState({ isEditing: true });
  }

  _onSave = (text) => {
    updateText(this.props.todo.id, text);
    this.setState({ isEditing: false });
  }

  _onDestroyClick = () => {
    destroy(this.props.todo.id);
  }

  render() {
    const todo = this.props.todo;
    let input;

    if (this.state.isEditing) {
      input = (
        <TodoTextInput
          className="edit"
          onSave={this._onSave}
          value={todo.text}
        />
      );
    }

    return (
      <li
        className={classNames({
          completed: todo.complete,
          editing: this.state.isEditing
        })}
        key={todo.id}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
        {input}
      </li>
    );
  }
}

export default TodoItem;
