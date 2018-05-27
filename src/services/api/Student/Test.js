import config from '../../../Config';
import React, {AsyncStorage, ListView} from 'react-native';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

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
        let result = [];
        if (json.errors) {
            result = [];
            view.state = {
                dataSource: result,
                isLoaded: false
            };

        } else {
            json.questions.forEach(function (question) {
                let newQuestion = question;
                result.push(newQuestion);
            });
            view.setState(() => {
                return {
                    dataSource: result,
                    isLoaded: true,
                    restData: json
                }
            });
        }
    }

    static async updateTest(json, view)
    {
        const token = await AsyncStorage.getItem('token');
        let variantId = json.id;
        const response = await fetch(`${config.url}:${config.port}/student/test/update/${variantId}`, {
            method: 'PUT',
            body: JSON.stringify(json),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : token.toString()}
        });
        const jsonResponse = await response.json();
        let result = [];
        if (jsonResponse.errors) {
            result = [];
            view.state = {
                dataSource: result,
                isLoaded: false
            };
        }
    }


    static async endTest(json, view)
    {
        const token = await AsyncStorage.getItem('token');
        let variantId = json.id;
        const response = await fetch(`${config.url}:${config.port}/student/test/end/${variantId}`, {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : token.toString()}
        });
        const jsonResponse = await response.json();
        let result = [];
        if (jsonResponse.errors) {
            result = [];
            view.state = {
                dataSource: result,
                isLoaded: false
            };
        } else {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${config.url}:${config.port}/student/tests`, {
                method: 'GET',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : token.toString()}
            });
            const json = await response.json();
            if (json.errors) {

            } else {
                json.forEach(function (test) {
                    var newTest = {id: '', testName: '', dueDate: '', lessonName: '', navigation: ''};
                    newTest.lessonName = test.lesson_name;
                    newTest.testName = test.test_name;
                    newTest.dueDate = test.due_date;
                    newTest.id = test.id;
                    result.push(newTest);
                });

                view.props.navigation.state.params.view.props.parent.setState({
                    dataSource: ds.cloneWithRows(result)
                });
                view.props.navigation.pop();
            }

        }
    }
}
