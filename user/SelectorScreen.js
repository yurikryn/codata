import React, {Component} from 'react';
import {FlatList, ActivityIndicator, Button, StyleSheet, View, Alert } from 'react-native';

export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            adress: this.props.navigation.getParam('adress'),
            dataSource: {}
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('title')
        }
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
        const route = (this.state.dataSource.type === "categories")? 'Selector': 'Value';
        return (
            <View style = { styles.container }>
            <FlatList
                data = {this.state.dataSource.names}
                renderItem = { ({item,index}) =>
                    <Button
                        style = { styles.button }
                        onPress = { () => this.props.navigation.push( route, {
								adress : this.state.adress + '/' + encodeURIComponent(item),
								title: item 
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
