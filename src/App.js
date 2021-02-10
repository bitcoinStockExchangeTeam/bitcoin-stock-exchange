import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.scss';
import About from './components/About';
import Home from './components/Home';

function App() {
  const counter = useSelector((state) => state.counterReducer);
  const isLogged = useSelector((state) => state.loggedReducer);
  return (
    <>
      <div>
        <p>
          Counter
          {` ${counter}`}
        </p>
        <p>
          Logged:
          {` ${isLogged ? 'yes' : 'no'}`}
        </p>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </>
  );
}

export default App;
