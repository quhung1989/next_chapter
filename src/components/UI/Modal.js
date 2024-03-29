import React, { Component } from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../hoc/Auxiliary'
import Backdrop from './Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return ((nextProps.show !== this.props.show) || (nextProps.update !== this.props.update));
  }

  render() {
    return (
      <Auxiliary>
        <Backdrop
          show={this.props.show}
          clicked={this.props.modalClose}/>
        <div 
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
          }}
        >
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}

export default Modal;