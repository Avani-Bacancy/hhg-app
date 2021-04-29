import React, { useState } from "react";
import { Button } from "reactstrap";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div className='mb-5'>
      <h2>Counter App</h2>
      <div className='d-flex justify-content-center align-items-center'>
        <Button
          color='primary'
          size='lg'
          className='mr-2'
          onClick={() => setCounter(counter + 1)}
        >
          Increase the counter to +1
        </Button>
        <Button
          color='secondary'
          size='lg'
          className='mr-2'
          onClick={() => setCounter(0)}
        >
          Reset the counter to 0
        </Button>
        <h5 className='mb-0 text-success font-weight-bold'>{`Counter: ${counter}`}</h5>
      </div>
    </div>
  );
};

export default Counter;
