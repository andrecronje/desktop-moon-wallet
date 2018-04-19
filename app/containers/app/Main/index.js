import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import classnames from 'classnames/bind';

import { checkThemeState } from '../../../redux/modules/app/theme';

import AuthWrapper from '../AuthWrapper';

import s from './styles.css';

const cx = classnames.bind(s);

class Main extends Component {
  componentDidMount() {
    const { theme, checkThemeState } = this.props;
    checkThemeState();
    if (theme) document.body.className = theme;
  }

  componentWillReceiveProps(nextProps) {
    const { theme } = this.props;

    if (theme !== nextProps.theme) {
      document.body.className = nextProps.theme;
    }
  }

  render() {
    const {
      theme
    } = this.props;

    return (
      <div className={cx(s.app, theme)}>
        <Switch>
          <Route path="/" component={AuthWrapper} />
        </Switch>
      </div>
    );
  }
}

const ConnectedComponent = connect(
  (state) => ({
    ...state.app.theme
  }),
  {
    checkThemeState
  }
)(Main);
const ComponentWithRouter = withRouter(ConnectedComponent);
export default ComponentWithRouter;
