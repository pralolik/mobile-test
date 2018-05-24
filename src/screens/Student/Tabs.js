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
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: false,
    },
);

export default StudentTabNav;