import config from '../../../Config';
import React, {AsyncStorage, ListView} from 'react-native';
export default class Lessons {

    static async getTests(view) {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.url}:${config.port}/student/tests`, {
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
            json.forEach(function (test) {
                var newTest = {id: '', testName: '', dueDate: '', lessonName: '', navigation: ''};
                newTest.lessonName = test.lesson_name;
                newTest.testName = test.test_name;
                newTest.dueDate = test.due_date;
                newTest.id = test.id;
                result.push(newTest);
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

    static async startTest(testId, view)
    {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.url}:${config.port}/student/test/${testId}`, {
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
            json.questions.forEach(function (question) {
                var newQuestion = question;
                result.push(newQuestion);
            });
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            view.setState(() => {
                return {
                    dataSource: ds.cloneWithRows(result),
                    isLoaded: true,
                    restData: json
                }
            });
        }
    }
}
