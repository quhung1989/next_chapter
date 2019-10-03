import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

class UserSettings extends Component {
  state = {
    email: undefined,
    isAdmin: undefined,
  }

  componentDidMount() {
    this.getUserSettings(this.props.match.params.username)
  }

  render() {
    let email
    let isAdmin
    if (this.state.email) {
      email = this.state.email
      this.state.isAdmin ? isAdmin = 'True' : isAdmin = 'False'
    }
    return (
      <div>
        Hello!
        <div>
          Email Address: {email}
        </div>
        <div>
          Admin Status: {isAdmin}
        </div>
      </div>
    );
  }

  getUserSettings = (username) => {
  axios.get(`/api/users/get-user-settings/${username}`)
    .then(res => {
      if (res.status === 200) {
        this.setState({
          email: res.data.email,
          isAdmin: res.data.isAdmin,
        })
      }
    })
    .catch(err => {
      console.error(err)
    })
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    showModal: state.misc.showModal,
    isAuthenticated: state.auth.isAuthenticated,
    showDrawer: state.misc.showDrawer,
    showLogIn: state.misc.showLogIn,
    dropDown: state.misc.dropDown,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(UserSettings);