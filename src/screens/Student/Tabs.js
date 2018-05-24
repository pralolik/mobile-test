import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'react-native-elements'
import LessonScreen from './Lessons';
import TestNavigator from './TestsNavigator';
import Colors from '../../constants/Colors';

const commonNavigationOptions = ({ navigation }) => ({
    header: null,
    title: navigation.state.routeName,
});

const routeOptionsLessons = {
    screen: LessonScreen,
    navigationOptions: commonNavigationOptions,
};
const routeOptionsTests = {
    screen: TestNavigator,
    navigationOptions: commonNavigationOptions,
};

const StudentTabNav = TabNavigator(
    {
        ['Lessons']: routeOptionsLessons,
        ['Tests']: routeOptionsTests
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                let iconName;
                switch (routeName) {
                    case 'Lessons':
                        iconName = 'calendar-o';
                        break;
                    case 'Tests':
                        iconName = 'question';
                        break;
                }
                return (
                    <Icon
                        name={iconName}
                        size={30}
                        style={{ marginBottom: -3 }}
                        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                    />
                );
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
    },
);

export default StudentTabNav;