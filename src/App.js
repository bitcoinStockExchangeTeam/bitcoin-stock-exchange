import React from 'react';
import SiteHeading from './containers/SiteHeading';
import MarketPage from './containers/MarketPage';
import { wrapper } from './App.module.scss';

const App = () => (
  <div className={wrapper}>
    <SiteHeading />
    <MarketPage />
  </div>
);

export default App;
