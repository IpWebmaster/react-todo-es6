import React, { PropTypes } from 'react';

class TodoTextInput extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._save = this._save.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this.state = {
      value: this.props.value || ''
    };
  }

  /**
  * Invokes the callback passed in as onSave, allowing this component to be
  * used in different ways.
  */
  _save() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  }

  /**
  * @param  {object} event
  */
  _onChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  /**
  * @param  {object} event
  */
  _onKeyDown(event) {
    if (event.keyCode === 'ENTER_KEY_CODE') {
      this._save();
    }
  }

  render() {
    return (
      <input className={this.props.className}
        id={this.props.id}
        placeholder={this.props.placeholder}
        onBlur={this._save}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.value}
        autoFocus
      />
    );
  }
}

TodoTextInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default TodoTextInput;
