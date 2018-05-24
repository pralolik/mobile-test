import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Picker} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'column',
        alignItems: 'center'
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
    },
    select: {
        height: 150,
        width: 150,
        borderRadius: 20,
        alignItems: 'flex-start'
    },
});

export default class Select extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.question_text}</Text>
                <RadioForm style={styles.select}
                    radio_props={this.prepareOptions()}
                    initial={0}
                    onPress={(value) => {this.setState({value:value})}}
                />
            </View>
        );
    }

    prepareOptions()
    {
        let result = [];
        this.props.answers.forEach(function (option) {
            result.push({label: option.select_text, value: option.id})
        });

        return result;
    }
};
