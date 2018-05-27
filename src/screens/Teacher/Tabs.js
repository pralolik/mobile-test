import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import LessonScreen from './Lessons';
import Tests from './Tests';
import InfoTab from '../Info';

const commonNavigationOptions = ({ navigation }) => ({
    header: null,
    title: navigation.state.routeName,
});

const TeacherTabNav = TabNavigator(
    {
        ['Lessons']: {
            screen: LessonScreen,
            navigationOptions: commonNavigationOptions,
            parent: this
        },
        ['Tests']: {
            screen: Tests,
            navigationOptions: commonNavigationOptions,
            parent: this
        },
        ['Info']: {
            screen: InfoTab,
            navigationOptions: commonNavigationOptions,
            parent: this
        }
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: false,
    },
);

export default TeacherTabNav;