import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

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
});

export default class InputType extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.question_text}</Text>
                <TextInput style={styles.text} placeholder='Enter your answer' />
            </View>
        );
    }
};
