import React from 'react';
import PropTypes from 'prop-types';

import { PasswordForgetForm } from '../PasswordForget/PasswordForget';
import PasswordChangeForm from '../PasswordChange/PasswordChange';
import withAuthorization from '../Session/withAuthorization';

import './Account.css';

const AccountPage = (props, { authUser }) =>
  <div className="account-container">
    <p>Account: {authUser.email}</p>
    <PasswordForgetForm />
    <hr/>
    <PasswordChangeForm />
  </div>

AccountPage.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);