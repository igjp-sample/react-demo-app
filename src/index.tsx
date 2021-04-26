/* {RepositoryWarning}  */
/* {RepositoryUrl}/tree/master/templates/sample/src/index  */

import React from 'react';
import ReactDOM from 'react-dom';

import './i18n';
import './index.css'; // styles shared between all samples

import DockManagerUpdatingPanes from './DockManagerUpdatingPanes';

ReactDOM.render(
    <DockManagerUpdatingPanes />,
    document.getElementById('root')
);