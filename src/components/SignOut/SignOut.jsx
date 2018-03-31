import React from 'react';

import { auth } from '../../firebase';
import Icon from 'react-icons-kit';
import { signOut } from 'react-icons-kit/fa/signOut';

const SignOutButton = () =>
  <button
    type="button"
    onClick={auth.doSignOut}
  >
    <Icon icon={signOut} />
  </button>

export default SignOutButton;
