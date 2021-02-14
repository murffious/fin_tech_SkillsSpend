
import React from 'react'
// import a CSS module
import classes from './main.css';
import Sortable from './components/Sortable'

 const App = () => {
  console.log(classes.main);
  return (<div><Sortable/></div>)
};

export default App;