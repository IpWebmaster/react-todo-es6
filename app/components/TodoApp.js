import React from 'react';
import TodoStore from '../stores/TodoStore';
import Footer from './Footer';
import Header from './Header';
import MainSection from './Mainsection';

class TodoApp extends React.Component {
  state = {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  }

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState({
      allTodos: TodoStore.getAll(),
      areAllComplete: TodoStore.areAllComplete()
    });
  }

  render() {
    return (
      <div>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
      <Footer allTodos={this.state.allTodos} />
      </div>
    );
  }
}

export default TodoApp;
