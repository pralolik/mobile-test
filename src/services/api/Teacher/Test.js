import config from '../../../Config';
import React, {AsyncStorage, ListView} from 'react-native';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Lessons {

    static async getTests(view) {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.url}:${config.port}/teacher/tests`, {
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

    static async saveTest(json, view)
    {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.url}:${config.port}/teacher/tests`, {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : token.toString()}
        });
        const jsonResponse = await response.json();
        var result = [];
        if (jsonResponse.errors) {

        } else {
            alert('Сохранено');
            view.props.navigation.navigate('TeacherTestCreationVariants', {testId: jsonResponse.id});
        }
    }


    static async getVariants(testId, view)
    {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.url}:${config.port}/teacher/tests/${testId}`, {
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
            json.variants.forEach(function (variant) {
                let newVariant = {};
                newVariant.id = variant.id;
                newVariant.variantName = variant.variant_text;
                result.push(newVariant);
            });
            view.setState(() => {
                return {
                    dataSource: ds.cloneWithRows(result),
                    isLoaded: true
                }
            });
        }
    }

    static async getQuestions(variantId, view)
    {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.url}:${config.port}/teacher/variants/${variantId}`, {
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
            json.questions.forEach(function (question) {
                let newQuestion = {};
                newQuestion.id = question.id;
                newQuestion.questionText = question.question_text;
                newQuestion.questionType = question.question_type;
                result.push(newQuestion);
            });
            view.setState(() => {
                return {
                    dataSource: ds.cloneWithRows(result),
                    isLoaded: true
                }
            });
        }
    }

    static async saveQuestion(questionJson, view)
    {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.url}:${config.port}/teacher/questions`, {
            method: 'POST',
            body: JSON.stringify(questionJson),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : token.toString()}
        });
        const jsonResponse = await response.json();
        var result = [];
        if (jsonResponse.errors) {

        } else {
            alert('Сохранено');
            view.props.navigation.pop();
        }
    }
}
