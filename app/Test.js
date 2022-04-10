import React, {useState, useEffect, Component} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {
  Image,
  View,
  Text,
  Keyboard,
  BackHandler,
  ScrollView,
  Alert,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillMount() {
  }
  //Android back button handler
  render() {
  
    return (
      <>
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
         
          <Text>Hello</Text>
        </View>
      </>
    );
  }
}


export default Test;
