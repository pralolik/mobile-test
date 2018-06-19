import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import LessonScreen from './Lesson/List';
import Tests from './Test/List';
import InfoTab from '../Info';

const commonNavigationOptions = ({ navigation }) => ({
    header: null,
    title: navigation.state.routeName,
});

const DemoStudentTabNav = TabNavigator(
    {
        ['Предметы']: {
            screen: LessonScreen,
            navigationOptions: commonNavigationOptions,
            parent: this
        },
        // ['Тесты']: {
        //     screen: Tests,
        //     navigationOptions: commonNavigationOptions,
        //     parent: this
        // },
        ['Общее']: {
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

export default DemoStudentTabNav;