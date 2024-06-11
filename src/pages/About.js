import React from 'react';
import userContext from '../context/userContext';
import Base from '../component/Base';

function About() {
  return (
    <userContext.Consumer>
      {(contextValue) => (
        <Base>
          <h1>This is About Page</h1>
          {console.log(contextValue)}
          <h2>
            Welcome User: {contextValue?.user?.login && contextValue?.user?.data?.user?.name}
          </h2>
        </Base>
      )}
    </userContext.Consumer>
  );
}

export default About;
