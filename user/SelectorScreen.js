import React, {Component} from 'react';
import {FlatList, ActivityIndicator, Button, StyleSheet, View, Alert } from 'react-native';

export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
			adress: (this.props.navigation.getParam('adress', 'http://192.168.1.5:8080/api/codata')
				+ this.props.navigation.getParam('name', '').replace(/\x20/g,`_`))
        }
    }
    static navigationOptions = {
        title: 'Selector',
    };

    componentDidMount(){
        return (
            fetch(this.state.adress)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                });
            })
            .catch( (error) => {console.error(error);} )
        )
    }

    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View style = { styles.container }>
            <FlatList
                data = {this.state.dataSource}
                renderItem = { ({item,index}) =>
                    <Button
                        style = { styles.button }
                        onPress = { () => this.props.navigation.push('Selector', {
								adress : this.state.adress,
								name: '/' + item 
							})
                        }
                        title = {item}
                    />
                }
                keyExtractor = {(item, index) => `${index}`}
            />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    button:{
        margin: 10,
        padding:30,
        backgroundColor: 'red'
    }
});
