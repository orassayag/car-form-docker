import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as containers from '../../containers';
import { Auxiliary, Layout } from '../../hoc';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={containers.Home} />
        <Route path='*' exact component={containers.Home} />
      </Switch>
    );

    return (
      <Auxiliary>
        <Layout>
          {routes}
        </Layout>
      </Auxiliary>
    );
  }
}

export default App;