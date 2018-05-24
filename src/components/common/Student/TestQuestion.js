import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import InputQuestion from './Test/InputType';
import SelectQuestion from './Test/Select';
import MultiselectQuestion from './Test/Multiselect';

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

export default class TestQuestion extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.question_type == 'INPUT') {
            return <InputQuestion {...this.props}/>
        } else if (this.props.question_type == 'SELECT'){
            return <SelectQuestion {...this.props}/>
        } else if (this.props.question_type == 'MULTISELECT'){
            return <MultiselectQuestion {...this.props}/>
        }
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Opps, something bad happens with renderer
                </Text>
            </View>
        );
    }
};
