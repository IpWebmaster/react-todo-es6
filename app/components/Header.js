import React from 'react';
import { create } from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput';

class Header extends React.Component {
  /**
  * Event handler called within TodoTextInput.
  * Defining this here allows TodoTextInput to be used in multiple places
  * in different ways.
  * @param  {string} text
  */
  _onSave(text) {
    if (text.trim()) {
      create(text);
    }
  }

  render() {
    return (
      <header id="header">
        <h1>todos</h1>
        <TodoTextInput
          id="new-todo"
          placeholder="What needs to be done?"
          onSave={this._onSave}
        />
      </header>
    );
  }
}

export default Header;
