import React, { Component } from 'react';
import {View, ListView, StyleSheet, ActivityIndicator, Button} from 'react-native';
import TestRow from '../../components/common/TeacherTestRow';
import TestService from '../../services/api/Teacher/Test';

export default class Tests extends Component {
    state = {
        isLoaded : false
    };
    constructor(props){
        super(props);
        TestService.getTests(this);
    }

    render() {

        if (!this.state.isLoaded){
            return <View style={styles.spinner}><ActivityIndicator size="large" color="#0000ff" /></View>
        } else {
            return (
                <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(data) => <TestRow   {...data} parent={this} navigation={this.props.navigation} />}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    renderFooter={this.renderFooter}
                />
            );
        }
    };

    renderFooter = () => {
        const { navigate } = this.props.navigation;
        var footer = (
            <Button title='Создать тест' onPress={() => this.props.navigation.navigate('TeacherTestCreation')} />
        );

        return footer;

    };
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

