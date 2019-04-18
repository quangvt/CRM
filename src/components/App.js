import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import Login from './Login';
import Loader from './Loader';
// import BottomTabNavigator from './BottomTabNavigator';
import AppContainer from './AppContainer';
import reducers from '../reducers/PeopleReducer';
import Thunk from 'redux-thunk';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

// error
// const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(Thunk));

// fix
// https://github.com/jhen0409/react-native-debugger/issues/280
// https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
const enhancer = composeEnhancers(
  applyMiddleware(Thunk),
);
const store = createStore(reducers, enhancer);

export default class App extends Component {
  state = {
    loggedIn: null,
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDxgSeVCOJNR8HZ6G-7egTiqxu0w5IR3so",
      authDomain: "crmlinked-2061d.firebaseapp.com",
      databaseURL: "https://crmlinked-2061d.firebaseio.com",
      projectId: "crmlinked-2061d",
      storageBucket: "crmlinked-2061d.appspot.com",
      messagingSenderId: "302592578297"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    });
  };

  renderInitialView() {
    switch (this.state.loggedIn) {
      case true:
        // return <BottomTabNavigator />;
        return <AppContainer />;
      case false:
        return (
          <View style={styles.container}>
            <Login />
          </View>
        )
      default:
        return (
          <View style={styles.container}>
            <Loader size="large" />
          </View>
        )
    }
  };

  render() {
    return (
      <Provider store={store}>
          {this.renderInitialView()}
      </Provider>
    );
  }
}


