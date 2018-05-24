import React, { Component } from 'react';
import Welcome from './screens/Welcome';
console.disableYellowBox = true;
export default class App extends Component {
    constructor() {
        super();
    }
    render() {
        return <Welcome />;
    }
}