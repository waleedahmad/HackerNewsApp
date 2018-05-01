import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

const render = (Component) => {
  ReactDOM.render(
      <Component />,
    document.getElementById('reactbody'),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./Root', () => {
    // eslint-disable-next-line
    const nextApp = require('./Root').default;
    render(nextApp);
  });
}