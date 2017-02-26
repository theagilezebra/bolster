import React from 'react';
import Signin from './Signin.jsx';
import Signup from './Signup.jsx';

const JumbotronThree = ({ formType }) => (
  <div className=" container-flud lightgreenjumbo">
    {
      formType === 'Signin' ? <Signin /> : <Signup />
    }
  </div>
);

export default JumbotronThree;
