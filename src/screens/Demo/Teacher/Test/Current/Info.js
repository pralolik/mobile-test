import React, { Component } from 'react';
import {ListView, Text, View} from 'react-native';
import TestGroupRow from "../../../../../components/common/Demo/TestGroupRow";

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class ResultTotal extends Component {
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
                        <Text style={styles.name}>Основы ВТ{"\n"}</Text>
                        Вариант 1{"\n"}
                        {"\t"}Что такое сервер?:{"\t"}50%{"\n"}
                        {"\t"}Порт для SSL:{"\t"}50%{"\n"}
                        {"\t"}Протоколами являются:{"\t"}100%{"\n"}
                    </Text>
                </View>
                <Text>
                    Группы:
                </Text>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data) => <TestGroupRow
                        {...data} parent={this}
                        navigation={this.props.navigation} />}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
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
