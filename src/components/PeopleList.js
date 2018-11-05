import React, {Component} from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';
import PeopleItem from './PeopleItem';
import PeopleDetail from './PeopleDetail';
import { loadInitialContacts } from '../actions';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 353,
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingLeft: 20,
  },
});

class PeopleList extends Component {
  static navigationOptions = {
    tabBarLabel: 'People',
    tabBarIcon: ({ tintColor }) => (
        <Icon 
            name={'user'}
            size={45}
            style={{color: tintColor}}
        />
      )
  };

  // componentWillMount() {
  //   // const ds = new ListView.DataSource({
  //   //   rowHasChanged: (r1, r2) => r1 !== r2,
  //   // });
  //   //this.dataSource = ds.cloneWithRows(this.props.people);
  // };

  componentWillMount() {
    this.props.loadInitialContacts();
  }

  renderInitialVIew() {
    // const ds = new FlatList.data({
    //   rowHasChanged: (r1, r2) => r1 !== r2,
    // });
    // this.data = ds.cloneWithRows(this.props.people);
    if (this.props.detailView === true) {
      return (
        <PeopleDetail />
      );
    } else {
        return (
          <FlatList
            data={this.props.people}
            renderItem={({item}) => 
              <PeopleItem people={item} />
            }
            keyExtractor={item => item.first_name}
          />
        );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderInitialVIew()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const people = _.map(state.people, (val, uid) => {
    return { ...val, uid };
  });

  return {
    people,
    detailView: state.detailView
  };
};

export default connect(mapStateToProps, {loadInitialContacts})(PeopleList);