import React, { Component } from 'react';

import withAuthorization from '../Session/withAuthorization';
import { auth } from '../../firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUserId: ''
    };
  }

  componentDidMount() {

    let loggedInUserId = auth.getCurrentUserId();
    
    this.setState(() => ({ loggedInUserId: loggedInUserId }))
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>Logged in users id:</p>

        {this.state.loggedInUserId}
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);