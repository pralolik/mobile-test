import React, { Component } from 'react';
import Login from './LoggedIn';
import TeacherTabNav from './Teacher/Tabs';
import TeacherLessonGroups from './Teacher/LessonDetails';
import TeacherLessonGroupList from './Teacher/GroupLessonDetails';
import TeacherTestCreation from './Teacher/Test/Main';
import TeacherTestCreationVariants from './Teacher/Test/Variants';
import TeacherTestCreationQuestions from './Teacher/Test/Questions';
import TeacherQuestionCreate from './Teacher/Test/AddQuestion';
import StudentTabNav from './Student/Tabs';
import StudentTestDetails from './Student/TestDetails';
import {StackNavigator} from 'react-navigation';

export const AppRouter = StackNavigator(
    {
        Login: {
            screen: Login
        },
        TeacherTabs: {
            screen: TeacherTabNav
        },
        TeacherLessonGroups: {
            screen: TeacherLessonGroups
        },
        TeacherLessonGroupList: {
            screen: TeacherLessonGroupList
        },
        TeacherTestCreation: {
            screen: TeacherTestCreation
        },
        TeacherTestCreationVariants: {
            screen: TeacherTestCreationVariants
        },
        TeacherTestCreationQuestions: {
            screen: TeacherTestCreationQuestions
        },
        TeacherQuestionCreate: {
            screen: TeacherQuestionCreate
        },
        StudentTabs: {
            screen: StudentTabNav
        },
        StudentTestDetails: {
            screen: StudentTestDetails
        }
    },
    {
        initialRouteName: 'Login',
        headerMode:'none'
    }
);


export default class Welcome extends Component{

    constructor(props) {
        super(props);
    }

    render() {
       return <AppRouter />
    }
}