import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import './App.css';

const HatsPage = () => (
  <div>
    <h1>HATS</h1>
  </div>
);

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/hats" component={HatsPage} />
    </Switch>

    // <HomePage />
  );
}

export default App;
