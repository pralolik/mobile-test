import React, { Component } from 'react';
import Start from './Start';
/** Demo */
import Demo from './Demo/DemoStart';
import DemoStudentTabs from './Demo/Student/DemoTabs';
import DemoStudentLessonDetails from './Demo/Student/Lesson/Info';
import DemoStudentTestDetails from './Demo/Student/Test/Info';
import DemoTeacherTabs from './Demo/Teacher/DemoTabs';
import DemoTeacherLessonGroupList from './Demo/Teacher/Lesson/GroupList';
import DemoTeacherLessonStudentList from './Demo/Teacher/Lesson/StudentList';
import DemoTeacherLessonMarkList from './Demo/Teacher/Lesson/MarkList';
import Fake from './ResultTotal3';
/** Prod */
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
        Start: {
            screen: Start
        },
        /** Demo */
        DemoStart: {
            screen: Demo
        },
        DemoStudentTabs:{
            screen: DemoStudentTabs
        },
        DemoStudentLessonDetails: {
            screen: DemoStudentLessonDetails
        },
        DemoStudentTestDetails: {
            screen: DemoStudentTestDetails
        },

        DemoTeacherTabs:{
            screen: DemoTeacherTabs
        },
        DemoTeacherLessonGroupList: {
            screen: DemoTeacherLessonGroupList
        },
        DemoTeacherLessonStudentList: {
            screen: DemoTeacherLessonStudentList
        },
        DemoTeacherLessonMarkList: {
            screen: DemoTeacherLessonMarkList
        },
        /** Prod */
        Login: {
            screen: Login
        },
        Fake: {
            screen: Fake
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
        initialRouteName: 'Start',
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