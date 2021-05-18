import React, { Component } from "react";

class Form extends Component {
  doSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  };

  render() {
    return <form onSubmit={this.doSubmit} id={this.props.id}>{this.props.children}</form>;
  }
}

export default Form;
