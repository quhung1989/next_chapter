import React, { Component } from 'react';
import classes from './LoginRegister.module.css';
import Button from '../UI/Button';
import { withRouter } from 'react-router-dom';
import Input from '../UI/Input';
import { inputChanger } from '../../utils/inputChanger';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index'

class LoginRegister extends Component {
  _isMounted = false

  state = {
    user: {
      username: {
        eleType: 'input',
        eleConfig: {
          type: 'text',
          placeholder: 'Username',
        },
        value: '',
        validation: {
          required: true,
          type: 'username',
        },
        valid: false,
      },
      password: {
        eleType: 'input',
        eleConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          type: 'password',
        },
        valid: false,
      },
    }
  }

  componentWillMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  logInHandler = (event) => {
    event.preventDefault();
    if ((this.state.user.username.valid) && (this.state.user.password.valid)) {
      const user = {
        username: this.state.user.username.value,
        password: this.state.user.password.value,
      }
      if (!this.props.showDrawer) {
        this.props.toggleModal()
      } else {
        this.props.toggleDrawer()
      }
      this.props.logIn(user)
    } else {
      console.log('That is not a valid log in');
    }
  }

  render() {
    let formsArray = [];
    for (let key in this.state.user) {
      formsArray.push({
        id: key,
        config: this.state.user[key],
      });
    }

    let loginForm = (
      <form>
        <h1 className={classes.PageTitle}>Log In/Register</h1>
        {formsArray.map(ele => (
          <Input
            key={ele.id}
            eleType={ele.config.eleType}
            eleConfig={ele.config.eleConfig}
            value={ele.config.value}
            invalid={!ele.config.valid}
            changed={(event) => {
              if (this._isMounted) {
                this.setState({
                  user: inputChanger(event, ele.id, this.state.user, ele.config.validation.type)
                })
              }
            }}/>
        ))}
          <Button clicked={this.logInHandler} type={'submit'}>
            Log In
          </Button>
          <Button clicked={this.props.toggleShowLogIn}>
            Forgot Password
          </Button>
          <Button clicked={this.props.registerClicked}>
            Register
          </Button>
      </form>
    );

    return (
      <div className={classes.Container}>
        {loginForm}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (user) => {
      dispatch(actions.logIn(user))
    },
    toggleModal: () => {
      dispatch({
        type: actionTypes.TOGGLE_MODAL,
      })
    },
    toggleDrawer: () => {
      dispatch({
        type: actionTypes.TOGGLE_DRAWER,
      })
    },
  };
}

export default withRouter(connect(null, mapDispatchToProps)(LoginRegister));