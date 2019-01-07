import React, {Component} from 'react';
import {FlatList, ActivityIndicator, Text, StyleSheet, View, Alert } from 'react-native';

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
        /*****************************************************************************************/ 

        return (
            <View style = { styles.container }>
            <FlatList
                data = {this.state.dataSource}
                renderItem = { ({item}) =>
                    <Text>{item.key}:{'\n'}{'\t'}{item.value}</Text>       
                }
            />
            </View>
        );
        /*****************************************************************************************/        
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
