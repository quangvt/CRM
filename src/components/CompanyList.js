import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CompanyItem from './CompanyItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e5e5e5',
  },
});

class CompanyList extends Component {
  static navigationOptions = {
    tabBarLabel: 'Companies',
    tabBarIcon: ({ tintColor }) => (
        <Icon 
            name={'business'}
            size={45}
            style={{color: tintColor}}
        />
        )
  }
  render() {
    console.log('halohalo');
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.companies}
          renderItem={({item}) => 
            <CompanyItem companies={item} />
          }
          keyExtractor={item => item.company}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const people = _.map(state.people, (val, uid) => {
    return { ...val, uid };
  });

  const companies = 
    _.chain(people)
    .groupBy('company')
    .map((value, key) => {
      return {
        company: key,
        names: value
      };
    })
    .value();

  return {
    companies,
  };
};

export default connect(mapStateToProps)(CompanyList);