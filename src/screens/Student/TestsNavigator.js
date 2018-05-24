import React from 'react';

import { StackNavigator } from 'react-navigation';
import Tests from './Tests';
import TestDetails from './TestDetails';

const TestsNavigator = StackNavigator({
    Tests: { screen: Tests},
    TestDetails: { screen: TestDetails}
});

export default TestsNavigator;