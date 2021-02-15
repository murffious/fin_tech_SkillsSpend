
import React from 'react'
// import a CSS module
import classes from './main.css';
import {MultipleContainers} from './components/Sortable'

 const App = () => {
  console.log(classes.main);
  return (<div><MultipleContainers/></div>)
};

export default App;