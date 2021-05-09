import React, { useEffect } from 'react';
import axios from 'axios';
import { setTitle } from '../common/functions';

const Index = ({ user, followStats }) => {
  useEffect(() => {
    setTitle(`Welcome, ${user.name.split(' ')[0]}`);
  });
  return (
    <>
      <h1>HomePage</h1>
      <div>{`Hi ${user.userName}`}</div>
    </>
  );
};

export default Index;
