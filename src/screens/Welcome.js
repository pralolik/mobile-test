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

import DemoTeacherTestInfo from './Demo/Teacher/Test/Current/Info';
import DemoTeacherTestGroupInfo from './Demo/Teacher/Test/Current/GroupsStatistic';
import DemoTeacherTestStudentInfo1 from './Demo/Teacher/Test/Current/StudentStatistic1';
import DemoTeacherTestStudentInfo2 from './Demo/Teacher/Test/Current/StudentStatistic2';


import DemoTeacherTestCreate from './Demo/Teacher/Test/New/EnterInfo';
import DemoTeacherTestVariants from './Demo/Teacher/Test/New/VariantsList';
import DemoTeacherTestQuestions from './Demo/Teacher/Test/New/QuestionList';
import DemoTeacherTestQuestionCreate from './Demo/Teacher/Test/New/QuestionCreate';

import DemoTeacherTestEmpty from './Demo/Teacher/Test/New/EmptyStatistic';

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
        /** Student */
        DemoStudentTabs:{
            screen: DemoStudentTabs
        },
        DemoStudentLessonDetails: {
            screen: DemoStudentLessonDetails
        },
        DemoStudentTestDetails: {
            screen: DemoStudentTestDetails
        },
        /** Teacher Lesson */
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
        /** Teacher Current test */
        DemoTeacherTestInfo: {
            screen: DemoTeacherTestInfo
        },
        DemoTeacherTestGroupInfo: {
            screen: DemoTeacherTestGroupInfo
        },
        DemoTeacherTestStudentInfo1: {
            screen: DemoTeacherTestStudentInfo1
        },
        DemoTeacherTestStudentInfo2: {
            screen: DemoTeacherTestStudentInfo2
        },
        /** Teaher New test */
        DemoTeacherTestCreate: {
            screen: DemoTeacherTestCreate
        },
        DemoTeacherTestVariants: {
            screen: DemoTeacherTestVariants
        },
        DemoTeacherTestQuestions: {
            screen: DemoTeacherTestQuestions
        },
        DemoTeacherTestQuestionCreate: {
            screen: DemoTeacherTestQuestionCreate
        },
        DemoTeacherTestEmpty: {
            screen: DemoTeacherTestEmpty
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