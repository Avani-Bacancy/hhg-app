import React from "react";
import { Spinner } from "reactstrap";

const Loader = () => {
  return (
    <div className='d-flex justify-content-center'>
      <Spinner type='grow' color='primary' />
      <Spinner type='grow' color='secondary' />
      <Spinner type='grow' color='primary' />
    </div>
  );
};

export default Loader;
