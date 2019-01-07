import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';

export default class extends Component{
    render() {
        textPieces = [];
        const pattern = /(?:(_|\^)(.+?)(?=(?:$|\)|_|\^|\s))|(.+?)(?=(?:$|_|\^)))/g;
        let z, value, fontSizeRatio, lineHeightRatio;
        for(let i = 0; i < 100; i++){
            if( (z = pattern.exec(this.props.text) ) === null){ break;}
            if(z[1] === '_'){
                value = z[2];
                fontSizeRatio = 3/4;
                lineHeightRatio = 7/5;
            }
            else if(z[1] === '^'){
                value = z[2];
                fontSizeRatio = 3/4;
                lineHeightRatio = 3/5;
            }
            else{
                value = z[3];
                fontSizeRatio = 1;
                lineHeightRatio = 1; 
            }
            textPieces.push({value, fontSizeRatio, lineHeightRatio});
        }

	    return (
		    <View>
            <FlatList
                style = {{flexDirection: 'row', /*alignItems: 'flex-start'*/}}
                data = {textPieces}
                renderItem = { ({item}) =>
                    <Text style={{
                        fontSize: this.props.style.fontSize * item.fontSizeRatio,
                        lineHeight: this.props.style.fontSize * 3/2 * item.lineHeightRatio
                    }}>{item.value}</Text>
                }
                keyExtractor = {(item, index) => `${index}`}
            />
    	    </View>			  
	    );
    }
}