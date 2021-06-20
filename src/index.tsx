/* {RepositoryWarning}  */
/* {RepositoryUrl}/tree/master/templates/sample/src/index  */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './i18n';
import './index.css'; // styles shared between all samples

import Layout from "./Layout";
import ExcelLikeGrid from './ExcelLikeGrid';
import DockManagerUpdatingPanes from './DockManagerUpdatingPanes';

const app = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/grid" component={ExcelLikeGrid}></Route>
        <Route exact path="/dm" component={DockManagerUpdatingPanes}></Route>
      </Switch>
    </Layout>
  </Router>
  ,
app);