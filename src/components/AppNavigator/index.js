import React from 'react';
import Navigator from '../../navigators';
import AnalyticsUtils from '../../utils/analytics';
import { connect } from 'react-redux';

class AppNavigator extends React.Component {
  getCurrentRouteName = navigationState => {
    if (!navigationState) {
      return null;
    }

    const route = navigationState.routes[navigationState.index];

    if (route.routes) {
      return this.getCurrentRouteName(route);
    }

    return route.routeName;
  };

  handleNavigationStateChange(prevState, currentState) {
    const currentScreen = this.getCurrentRouteName(currentState);
    const prevScreen = this.getCurrentRouteName(prevState);
    if (prevScreen !== currentScreen) {
      AnalyticsUtils.trackScreen(currentScreen);
    }
  }

  render() {
    return (
      <Navigator
        onNavigationStateChange={this.handleNavigationStateChange.bind(this)}
      />
    );
  }
}

export default AppNavigator;
