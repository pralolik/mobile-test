import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'column',
        alignItems: 'center'
    },
    text: {
        marginLeft: 12,
        fontSize: 20,
    },
    textInput: {
        height: 40,
        width: 125,
        borderRadius: 20,
        fontSize: 15,
        alignItems: 'center'
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
                <TextInput style={styles.textInput} placeholder='Answer' />
            </View>
        );
    }
};
