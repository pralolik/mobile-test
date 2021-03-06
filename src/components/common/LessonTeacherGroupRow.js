import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';

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
});

export default class LessonTeacherGroupRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>

                    <View style={styles.container}>
                        <Image source={{ uri: 'https://cdn3.iconfinder.com/data/icons/black-easy/512/538303-user_512x512.png'}}
                               style={styles.photo} />
                        <Text style={styles.text}>
                            {this.props.groupNumber}{"\n"}
                        </Text>
                    </View>
            </View>
        );
    }
};
