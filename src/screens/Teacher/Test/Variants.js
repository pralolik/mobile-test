import React, { Component } from 'react';
import {View, ListView, StyleSheet, ActivityIndicator} from 'react-native';
import TestService from '../../../services/api/Teacher/Test';
import VariantRow from "../../../components/common/VariantRow";

export default class Tests extends Component {
    state = {
        isLoaded : false
    };
    constructor(props){
        super(props);
        TestService.getVariants(this.props.navigation.state.params.testId, this);
    }

    render() {

        if (!this.state.isLoaded){
            return <View style={styles.spinner}><ActivityIndicator size="large" color="#0000ff" /></View>
        } else {
            return (
                <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(data) => <VariantRow   {...data} parent={this} navigation={this.props.navigation} />}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
            );
        }
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

