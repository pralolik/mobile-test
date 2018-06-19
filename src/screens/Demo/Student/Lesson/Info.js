import React, { Component } from 'react';
import {Text, View} from 'react-native';

export default class Info extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Предмет: {this.props.navigation.state.params.lesson}{"\n"}
                    Оценки: 10, 8, 10{"\n"}
                </Text>
            </View>
        );
    }
}

const styles = {
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    spinner: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'center'
    }
};
