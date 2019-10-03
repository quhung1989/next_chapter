import React, {Component} from 'react';
import Button from '../UI/Button';
import classes from './ForgotPassword.module.css';
import Input from '../UI/Input'
import axios from 'axios'

class ForgotPassword extends Component {
  state = {
    username: undefined,
    newPassword: undefined,
  }

  resetHandler = () => {
    if (this.state.username && this.state.newPassword) {
      const data = {
        username: this.state.username,
        newPassword: this.state.newPassword
      }
      axios.post('/api/users/reset-password', data)
      .then(res => {
        this.setState({username: undefined})
      })
      .catch(err => {
        console.log(err)
      });
    }
  }

  render() {
    return (
      <div>
        <h1 className={classes.PageTitle}>Forgot Password</h1>
        <div>
          <label>
            Please enter the username of the account.
          </label>
          <Input eleType={'text'}
            value={this.state.username}
            placeholder={'Username'}
            changed={(e) => {
              if (this._isMounted) {
                this.setState({
                  username: e.target.value
                })
              }
            }}/>
          <Input eleType={'password'} 
            value={this.state.newPassword}
            placeholder={'New Password'}
            changed={(e) => {
              if (this._isMounted) {
                this.setState({
                  newPassword: e.target.value
                })
              }
            }}/>
          <Button clicked={this.resetHandler} type={'submit'}>
            Reset
          </Button>
          <Button clicked={this.props.toggleShowLogIn}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;