import React from 'react';
import { useDispatch } from 'react-redux';
import SiteHeading from './containers/SiteHeading';
import MarketPage from './containers/MarketPage';
import { wrapper } from './App.module.scss';
import { getTickers } from './redux/reducers/stock/actions';

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTickers());
  }, []);

  return (
    <div className={wrapper}>
      <SiteHeading />
      <MarketPage />
    </div>
  );
};

export default App;
