import React, { Component } from 'react';
import {View, StyleSheet, Button, AsyncStorage} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'

export default class Info extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    render() {
        return <View style={styles.spinner}><Button onPress={this.logout} title='Выход'/></View>
    }

    logout()
    {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Start'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    spinner: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'center'
    }
});
