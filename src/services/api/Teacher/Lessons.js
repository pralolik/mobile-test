import config from '../../../Config';
import React, {AsyncStorage, ListView} from 'react-native';
export default class Lessons {

    static async getLessons(view) {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.url}:${config.port}/teacher/lessons`, {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : token.toString()}
        });
        const json = await response.json();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let result = [];
        if (json.errors) {
            result = [];
            view.state = {
                dataSource: ds.cloneWithRows(result),
                isLoaded: false
            };

        } else {
            if(json.length < 1){
                return '';
            }
            json.forEach(function (lesson) {
                let newLesson = {};
                newLesson.lessonName = lesson.lesson_name;
                newLesson.id = lesson.id;
                newLesson.type = lesson.lesson_type;
                result.push(newLesson);
            });
            view.setState(() => {
                return {
                    dataSource: ds.cloneWithRows(result),
                    isLoaded: true
                }
            });
        }
    }

    static async getLessonGroups(lessonId, view)
    {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.url}:${config.port}/teacher/lessons/${lessonId}`, {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : token.toString()}
        });
        const json = await response.json();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let result = [];
        if (json.errors) {
            result = [];
            view.state = {
                dataSource: ds.cloneWithRows(result),
                isLoaded: false
            };

        } else {
            if(json.length < 1){
                return '';
            }
            json.lesson_groups.forEach(function (group) {
                let newGroup = {};
                newGroup.groupNumber = group.group_number;
                result.push(newGroup);
            });
            view.setState(() => {
                return {
                    dataSource: ds.cloneWithRows(result),
                    isLoaded: true
                }
            });
        }
    }

    static async getGroupPeople(lessonId, group, view)
    {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.url}:${config.port}/teacher/lessons/${lessonId}/group/${group}`, {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : token.toString()}
        });
        const json = await response.json();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let result = [];
        if (json.errors) {
            result = [];
            view.state = {
                dataSource: ds.cloneWithRows(result),
                isLoaded: false
            };

        } else {
            if(json.length < 1){
                return '';
            }
            json.forEach(function (user) {
                let newUser = {};
                newUser.name = user.name;
                newUser.surname = user.surname;
                result.push(newUser);
            });
            view.setState(() => {
                return {
                    dataSource: ds.cloneWithRows(result),
                    isLoaded: true
                }
            });
        }
    }

}
