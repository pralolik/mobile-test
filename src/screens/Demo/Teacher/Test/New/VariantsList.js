import React, { Component } from 'react';
import {View, ListView, StyleSheet, Button} from 'react-native';
import VariantRow from "../../../../../components/common/Demo/VariantRow";

export default class VariantsList extends Component {

    constructor(props){
        super(props);
        let testData = this.props.navigation.state.params.testData;
        const testName = this.props.navigation.state.params.testName;

        let variants = [];
        testData.forEach(function (test) {
            if(test.testName == testName){
                test.variants.forEach(function (variant) {
                    variants.push({variantName: variant.variantName})
                })
            }
        });
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(variants)
        };
    }

    render() {
        const testData = this.props.navigation.state.params.testData;
        const testName = this.props.navigation.state.params.testName;
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <VariantRow   {...data} testData={testData} testName={testName} parent={this.props.navigation.state.params.parent} navigation={this.props.navigation} />}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                renderFooter={this.renderFooter.bind(this)}
            />
        );
    };


    renderFooter = () => {
        const testName = this.props.navigation.state.params.testName;
        const oldTests = this.props.navigation.state.params.parent.state.startData;
        const parent = this.props.navigation.state.params.parent;

        var footer = (
            <Button title='Сохранить' onPress={() => {
                let newTests = [];
                oldTests.forEach(function (test) {
                    if(test.testName == testName){
                        test.release = true;
                    }
                    newTests.push(test);
                });

                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                parent.setState(
                    () => {
                        return {
                            dataSource: ds.cloneWithRows(newTests),
                            startData : newTests
                        }
                    }
                );

                this.props.navigation.pop();
            }} />
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

