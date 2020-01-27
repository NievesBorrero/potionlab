import React from 'react';

import {APPLICATION_ROUTES} from '../constants/routes';
import RouterController from './RouterController';

export const App = () => {
  return (
        <div>
            <RouterController routes={APPLICATION_ROUTES} />
        </div>
  );
};
