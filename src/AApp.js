import React, {Component} from 'react';
import Layout from './hoc/Layout';
import classes from './App.module.css';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Layout />
      </div>
    )
  }
}

export default App;