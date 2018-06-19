import React, { Component } from 'react';
import {ListView, Text, View} from 'react-native';
import TestGroupRow from "../../../../../components/common/Demo/TestGroupRow";

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class EmptyStatistic extends Component {
    state = {
        role: false,
        token: false,

    };
    constructor(props){
        super(props);
        const result = [
            {groupNumber: 351004}
        ];
        this.state = {
            dataSource: ds.cloneWithRows(result)
        };
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text>
                        <Text style={styles.name}>{this.props.navigation.state.params.testName}{"\n"}</Text>
                        {"\t"}Статистика отсутствует
                    </Text>
                </View>
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
    },
    name: {
        fontWeight: 'bold'
    }
};
