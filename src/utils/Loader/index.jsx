import React from 'react';
// Make sure the file name matches exactly (case-sensitive)
import CustomLoader from './customLoader.jsx';

const Loader = (props) => {
  return <CustomLoader {...props} />;
};

export default Loader;