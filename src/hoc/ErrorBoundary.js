import React, {Component} from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(`ERROR: ${error}\nINFO: ${info}`);
    
  }
  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;