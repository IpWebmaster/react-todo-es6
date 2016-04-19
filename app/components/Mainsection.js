import React, { PropTypes } from 'react';
import { toggleCompleteAll } from '../actions/TodoActions';
import TodoItem from './TodoItem';

class MainSection extends React.Component {
  _onToggleCompleteAll() {
    toggleCompleteAll();
  }

  render() {
    if (Object.keys(this.props.allTodos).length < 1) {
      return null;
    }

    const allTodos = this.props.allTodos;
    let todos = [];

    for (const key in allTodos) {
      if ({}.hasOwnProperty.call(allTodos, key)) {
        todos.push(<TodoItem key={key} todo={allTodos[key]} />);
      }
    }

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll}
          checked={this.props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{todos}</ul>
      </section>
    );
  }
}

MainSection.propTypes = {
  allTodos: PropTypes.object.isRequired,
  areAllComplete: PropTypes.bool.isRequired
};

export default MainSection;
