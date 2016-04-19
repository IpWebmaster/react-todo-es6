import AppDispatcher from '../dispatcher/AppDispatcher';
import { TodoConstants } from '../constants/TodoConstants';

/**
 * create
 * @method create
 * @param  {string} text
 */
export function create(text) {
  AppDispatcher.dispatch({
    actionType: TodoConstants.TODO_CREATE,
    text
  });
}

/**
 * Update text
 * @method updateText
 * @param  {string}   id   The ID of the ToDo item
 * @param  {string}   text
 */
export function updateText(id, text) {
  AppDispatcher.dispatch({
    actionType: TodoConstants.TODO_UPDATE_TEXT,
    id,
    text
  });
}

/**
 * Toggle whether a single ToDo is complete
 * @method toggleComplete
 * @param  {object} todo
 */
export function toggleComplete(todo) {
  const id = todo.id;
  const actionType = todo.complete ?
   TodoConstants.TODO_UNDO_COMPLETE :
   TodoConstants.TODO_COMPLETE;

  AppDispatcher.dispatch({
    actionType,
    id
  });
}

/**
 * Mark all ToDos as complete
 * @method toggleCompleteAll
 */
export function toggleCompleteAll() {
  AppDispatcher.dispatch({
    actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
  });
}

/**
 * @method destroy
 * @param  {string} id
 */
export function destroy(id) {
  AppDispatcher.dispatch({
    actionType: TodoConstants.TODO_DESTROY,
    id
  });
}

/**
 * Delete all the completed ToDos
 * @method destroyCompleted
 */
export function destroyCompleted() {
  AppDispatcher.dispatch({
    actionType: TodoConstants.TODO_DESTROY_COMPLETED
  });
}
