import React, { Component } from "react";
import InputError from '../InputError';
import './style.css';

class InputField extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur(event) {
    const { validate } = this.props;
    validate(event.target.value);
  }

  render() {
    const { label, type, errorMessage } = this.props;
    return (
      <div className="input-wrap">
        <label>{ label }</label>
        <input
          type={ type }
          className={ 'form-control' }
          onBlur={ this.handleBlur }
        />
        <InputError
          visible={ !!errorMessage }
          errorMessage={ errorMessage } />
      </div>
    );
  }
}

export default InputField;