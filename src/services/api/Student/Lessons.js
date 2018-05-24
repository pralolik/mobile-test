import config from '../../../Config';
import React, {AsyncStorage, ListView} from 'react-native';
export default class Lessons {

    static async getLessons(view) {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.url}:${config.port}/student/lessons`, {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : token.toString()}
        });
        const json = await response.json();
        var result = [];
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
                var newLesson = {lessonName: '', teacherName: '', type: ''};
                newLesson.lessonName = lesson.lesson_name;
                newLesson.teacherName = lesson.name + ' ' + lesson.surname;
                newLesson.type = lesson.lesson_type;
                result.push(newLesson);
            });
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            view.setState(() => {
                return {
                    dataSource: ds.cloneWithRows(result),
                    isLoaded: true
                }
            });
        }

    }
}
