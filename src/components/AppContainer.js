import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import PeopleList from './PeopleList';
import CompanyList from './CompanyList';
import AddPerson from './AddPerson';

const BottomTabNavigator = createBottomTabNavigator(
    {
        PeopleList: { screen: PeopleList },
        AddPerson: { screen: AddPerson },
        CompanyList: { screen: CompanyList },

    }, 
    {
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: '#80cbc4',
            swipeEnabled: true,
            showLabel: false,
            style: {
                backgroundColor: '#26a69a',
            },
        }
      }
    );

const AppContainer = createAppContainer(BottomTabNavigator);

export default AppContainer;