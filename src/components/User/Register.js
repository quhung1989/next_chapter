import React, { Component } from 'react';
import Button from '../UI/Button';
import classes from './Register.module.css';
import axios from 'axios';
import Input from '../UI/Input';
import { withRouter } from 'react-router-dom';
import Loading from '../UI/Loading';
import { inputChanger } from '../../utils/inputChanger';

class Register extends Component {
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
      passwordConfirm: {
        eleType: 'input',
        eleConfig: {
          type: 'password',
          placeholder: 'Confirm Password',
        },
        value: '',
        validation: {
          required: true,
          type: 'password',
        },
        valid: false,
      },
      email: {
        eleType: 'input',
        eleConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
          email: true,
          type: 'email',
        },
        valid: false,
      },
      emailConfirm: {
        eleType: 'input',
        eleConfig: {
          type: 'email',
          placeholder: 'Confirm Email',
        },
        value: '',
        validation: {
          required: true,
          email: true,
          type: 'email',
        },
        valid: false,
      },
    },
    loading: false,
  }
  
  render() {
    let formsArray = [];

    for (let key in this.state.user) {
      formsArray.push({
        id: key,
        config: this.state.user[key],
      });
    }

    let registerForm = (
      <form className={classes.Form}>
        <h1 className={classes.PageTitle}>Register</h1>
        {formsArray.map(ele => (
          <Input
            key={ele.id}
            eleType={ele.config.eleType}
            eleConfig={ele.config.eleConfig}
            value={ele.config.value}
            invalid={!ele.config.valid}
            onChange={(e) => {
              this.setState({user: inputChanger(e, ele.id, this.state.user, ele.config.validation.type)})
            }}
          />
        ))}
        <Button clicked={this.registerHandler} type={'submit'}>
          Submit
        </Button>
      </form>
    );

    if (this.state.loading) {
      registerForm = <Loading/>
    }

    return (
      <div className={classes.Container}>
        {registerForm}
      </div>
    );
  }

  registerHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    let user = undefined;
    if ((this.state.user.password.value === this.state.user.passwordConfirm.value) && (this.state.user.email.value === this.state.user.emailConfirm.value) && (this.state.user.username.valid) && (this.state.user.password.valid)) {
      user = {
        username: this.state.user.username.value,
        password: this.state.user.password.value,
        email: this.state.user.email.value,
      };
    }

    if (user) {
      axios.post("/api/users/register", user)
      .then((res) => {
        console.log(res);
        this.setState({loading: false}, this.props.history.push('/'));
      })
      .catch((err) => {
        console.log(err);
        this.setState({loading: false}, this.props.history.push('/'))
      });
    }
  }
}

export default withRouter(Register);