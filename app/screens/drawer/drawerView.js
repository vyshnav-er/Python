import React, {useState, useEffect, Component} from 'react';
import { moderateScale} from 'react-native-size-matters';
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
import {navigate} from '../../navigation/topLevelNavigation'
import styles from './styles';
import AppStyles from '../../config/styles';
class DrawerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
 
  }
  componentDidMount() {
  }
  componentWillMount() {
  }
  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
            
                <TouchableOpacity style={styles.pageButton}
                onPress={()=>{
                    navigate('DrawerSupport')
                 }}
                >
                    <Text style={styles.pageButtonText}>Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pageButton}
                onPress={()=>{
                    navigate('WhatsNew')
                 }}
                >
                    <Text style={styles.pageButtonText}>Coming Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pageButton}
                onPress={()=>{
                    navigate('Logout')
                 }}
                >
                    <Text style={styles.pageButtonText}>Logout</Text>
                </TouchableOpacity>
                
            </View>
            <View style={styles.contentFooterContainer}>
                <Text>gtrackIT</Text>
                <Text>Version 1.0.2</Text>
            </View>
        </SafeAreaView>
      </>
    );
  }
}

export default DrawerView;
