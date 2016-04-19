import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import { TodoConstants } from '../constants/TodoConstants';

const CHANGE_EVENT = 'change';
const _todos = {};

/**
* Create a TODO item
* @param  {string} text The content of the TODO
*/
const create = (text) => {
  const id = Date.now();

  _todos[id] = {
    id,
    complete: false,
    text
  };
};

/**
* Update a TODO item
* @param  {String} id
* @param  {Object} updates An object literal containing only the data to be updated.
*/
const update = (id, updates) => {
  _todos[id] = Object.assign({}, _todos[id], updates);
};

/**
* Update all of the TODO items with the same object
* @param  {Object} updates An object literal containing only the data to be updated.
*/
const updateAll = (updates) => {
  for (const id in _todos) {
    if ({}.hasOwnProperty.call(_todos, id)) {
      update(id, updates);
    }
  }
};

/**
* Delete a ToDO item
* @param  {string} id
*/
const destroy = (id) => {
  delete _todos[id];
};

/**
* Delete all the completed TODO items
*/
const destroyCompleted = () => {
  for (const id in _todos) {
    if ({}.hasOwnProperty.call(_todos, id) && _todos[id].complete) {
      destroy(id);
    }
  }
};

class TodoStoreClass extends EventEmitter {
  /**
  * Tests wheter all the remaining TODO items are marked as completed
  * @return {boolean}
  */
  areAllComplete() {
    for (const id in _todos) {
      if ({}.hasOwnProperty.call(_todos, id) && !_todos[id].complete) {
        return false;
      }
    }
    return true;
  }

  /**
  * Get the entire collection of TODOs.
  */
  getAll() {
    return _todos;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
  * @param  {function} callback
  */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
  * @param  {function} callback
  */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

const TodoStore = new TodoStoreClass();

AppDispatcher.register((action) => {
  let text;
  console.log(action, TodoConstants);
  switch (action.actionType) {
    case TodoConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        updateAll({ complete: false });
      } else {
        updateAll({ complete: true });
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      update(action.id, { complete: false });
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE:
      update(action.id, { complete: true });
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, { text });
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      TodoStore.emitChange();
      break;

    default:
      return true;
  }

  return true;
});

export default TodoStore;
