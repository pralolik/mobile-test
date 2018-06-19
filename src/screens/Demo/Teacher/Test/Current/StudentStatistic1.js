import React, { Component } from 'react';
import {Text, View} from 'react-native';

export default class ResultTotal extends Component {
    state = {
        role: false,
        token: false,

    };
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text>
                        <Text style={styles.name}>Основы ВТ{"\n"}</Text>
                        <Text style={styles.name}>351004{"\n"}</Text>
                        <Text style={styles.name}>Олег Скрипко{"\n"}</Text>
                        <Text style={styles.name}>Вариант 1{"\n"}</Text>
                        <Text style={styles.valid}>
                            {"\t"}Что такое сервер?:{"\n"}
                            {"\t"}{"\t"}- Это специализированное аппаратное устройство,
                            которое выполняет те или иные задачи удалённо{"\n"}
                        </Text>

                        <Text style={styles.error}>
                            {"\t"}Порт для SSL:{"\n"}
                            {"\t"}{"\t"}- 22{"\n"}
                        </Text>

                        <Text style={styles.valid}>
                            {"\t"}Протоколами являются:{"\n"}
                            {"\t"}{"\t"}- TCP{"\n"}
                            {"\t"}{"\t"}- UDP{"\n"}
                        </Text>
                        <Text style={styles.name}>Результат: 15 (б.){"\n"}</Text>
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
    },
    valid: {
        color: 'green'
    },
    error: {
        color: 'red'
    }
};
