import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut/SignOut';
import * as routes from '../../constants/routes';

import './Navigation.css';
import Icon from 'react-icons-kit';
import { signIn } from 'react-icons-kit/fa/signIn';
import { user } from 'react-icons-kit/icomoon/user';

const Navigation = (props, { authUser }) =>
  <div>
    {authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </div>

Navigation.contextTypes = {
  authUser: PropTypes.object,
};

const NavigationAuth = () =>
  <div className="navigation-header">
    <ul>
      <li><Link to={routes.LANDING}>Landing</Link></li>
      <li><Link to={routes.HOME}>Home</Link></li>
      <li className="right"><SignOutButton /></li>
      <li className="right"><Link to={routes.ACCOUNT}><Icon icon={user} /></Link></li>
    </ul>
  </div>


const NavigationNonAuth = () =>
  <div className="navigation-header">
    <ul>
      <li className="active"><Link to={routes.LANDING}>Landing</Link></li>
      <li className="right"><Link to={routes.SIGN_IN}><Icon icon={signIn} /></Link></li>
    </ul>
  </div>

export default Navigation;
