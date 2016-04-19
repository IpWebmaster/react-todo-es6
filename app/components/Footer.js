import React from 'react';
import { destroyCompleted } from '../actions/TodoActions';

const ReactPropTypes = React.PropTypes;

class Footer extends React.Component {
  /**
   * Event handler to delete all completed TODOs
   */
  _onClearCompletedClick() {
    destroyCompleted();
  }

  render() {
    const allTodos = this.props.allTodos;
    const total = Object.keys(allTodos).length;
    let completed = 0;
    let clearCompletedButton;

    if (total === 0) {
      return null;
    }

    for (const key in allTodos) {
      if (allTodos[key].complete) {
        completed++;
      }
    }

    const itemsLeft = total - completed;
    let itemsLeftPhrase = itemsLeft === 1 ? ' item' : ' items';
    itemsLeftPhrase += 'left';

    if (completed) {
      clearCompletedButton = (
        <button id = "clear-completed" onClick = {this._onClearCompletedClick}>
          Clear completed({
            completed
          })
        </button>
      );
    }

    return (
      <footer id = "footer">
        <span id = "todo-count">
          <strong>{itemsLeft}</strong>{itemsLeftPhrase}
        </span> {clearCompletedButton}
      </footer>
    );
  }
}

Footer.propTypes = {
  allTodos: ReactPropTypes.object.isRequired
};

export default Footer;
