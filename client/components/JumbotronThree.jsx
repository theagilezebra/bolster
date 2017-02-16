import React from 'react';
import Signin from './Signin.jsx';
import Signup from './Signup.jsx';

const JumbotronThree = ({ formType }) => (
  <div className="lightgreenjumbo">
    {
      formType === 'Signin' ? <Signin /> : <Signup />
    }
  </div>
);

export default JumbotronThree;
