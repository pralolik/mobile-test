import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    button: {
        right: 'right'
    }
});

export default class TestRow extends Component {
    static navigatorStyle = {
        tabBarHidden: true
    };
    constructor(props) {
        super(props);
    }

    render() {

        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Image source={{ uri: 'http://rossmillfarm.com/rossmill3/wp-content/uploads/2017/03/Testing.jpg'}}
                       style={styles.photo} />
                <Text style={styles.text}>
                    {this.props.testName}{"\n"}
                    {this.props.dueDate}{"\n"}
                    {this.props.lessonName}{"\n"}
                </Text>
                <Button onPress={() => navigate('StudentTestDetails', {testId: this.props.id, view: this })} style={styles.text} title={'Start TEST!'} />
            </View>
        );
    }
};
