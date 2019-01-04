//import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SelectorScreen from './SelectorScreen';
//import ValueScreen from './ValueScreen';

const AppNavigator = createStackNavigator(
		{
			Selector: SelectorScreen,
//			Value: ValueScreen
		},
		{
			initialRouteName: "Selector"
		}
);

export default createAppContainer(AppNavigator);