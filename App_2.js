import React from 'react';
import { Button, View, Text, FlatList, ActivityIndicator, Alert, StyleSheet} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
/*********************************************************************************/
class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Home',
	};
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Home Screen</Text>
				<Button
					title="Go to Details"
					onPress={() => this.props.navigation.navigate('Details')}
				/>
			</View>
		);
	}
}

class DetailsScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    };
  };
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text>Details Screen</Text>
			</View>
		);
	}
}

const AppNavigator = createStackNavigator(
		{
			Home: HomeScreen,
			Details: DetailsScreen
		},
		{
			initialRouteName: "Home"
		}
);
	
	
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
	render() {
		return <AppContainer />;
	}
}