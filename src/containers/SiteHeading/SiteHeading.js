import React from 'react';
import Button from '@material-ui/core/Button';
import Text from '../../components/Text';
import { wrapper, buttonContainer } from './siteHeading.module.scss';

const SiteHeading = () => (
  <div className={wrapper}>
    <Text text="Cryptocurrency stock exchange" type="HEADING_3" state="ACCENT" />
    <div className={buttonContainer}>
      <Button variant="outlined" color="primary">
        Log in
      </Button>
      <Button variant="contained" color="primary">
        Register
      </Button>
    </div>
  </div>
);

export default SiteHeading;
