import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

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

export default class VariantRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        {this.props.questionText}{"\n"}
                        {this.props.questionType}{"\n"}
                    </Text>
                </View>
            </View>
        );
    }
};
