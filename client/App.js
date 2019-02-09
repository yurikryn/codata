//import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SelectorScreen from './SelectorScreen';
import ValueScreen from './ValueScreen';

const AppNavigator = createStackNavigator(
	/********************************************/
	{
		Selector: SelectorScreen,
		Value: ValueScreen
	},
	/********************************************/
	{
		initialRouteName: "Selector",
		initialRouteParams: {
			adress: 'http://192.168.1.211:8080/api/codata',
			title: 'CODATA constants'
		},
		defaultNavigationOptions: {
			headerStyle: {
			  backgroundColor: '#f4511e',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
//				fontSize: 20,
				fontWeight: 'bold'
			}
		}
	}
	/********************************************/
);

export default createAppContainer(AppNavigator);