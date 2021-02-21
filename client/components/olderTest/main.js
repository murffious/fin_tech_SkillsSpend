// import a CSS module
import React from 'react'

import classes from './main.css';
import Sortable from './components/Sortable'

export default () => {
  console.log(classes.main);
  return (<div><Sortable/></div>)
};

