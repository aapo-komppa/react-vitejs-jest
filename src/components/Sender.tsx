import React from 'react';
import classes from './Sender.module.scss';

const Sender: React.FC<{ sender: string; amount: number }> = ({
  sender,
  amount,
}) => {
  return (
    <div className={classes.sender}>
      <p>{sender}: {amount}</p>
    </div>
  );
};

export default Sender;
