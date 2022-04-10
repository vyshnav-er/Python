import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Platform,TextInput,TouchableOpacity } from "react-native";
import { moderateScale } from 'react-native-size-matters';
import metrics from '../config/metrics';


export const CustomAlert = (props) => {

  const [verificationText,setVerificationText] = useState("");

  const getText = (text) =>{
    setVerificationText(text)
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props?.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}
    >
      <View style={styles.centeredView} >
        <View
          style={{
            zIndex:100,
            height: moderateScale(190),
            width: metrics.SCREEN_WIDTH - 80,
            backgroundColor: "#FAFAFA",
            borderRadius:10,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.1,
            shadowRadius: 5,
            padding:10
          }}
        >
          <View style={styles.headerBox}>
            <Text style={{...styles.headerText,fontSize: moderateScale(18)}}>Gtrackit</Text>
          </View>
          <View style={styles.headerBox}>
            <Text style={{...styles.message,fontSize: moderateScale(14)}}>{props.message}</Text>
            <TextInput
             style={{...styles.input, height: moderateScale(35)}}
             onChangeText={(txt)=> getText(txt)}
             value={verificationText}
             placeholder="Please enter"
             editable
           />
          </View>
          <View style={styles.buttonBox}>
             <TouchableOpacity style={{...styles.button,height: moderateScale(30)}}
             onPress={()=>props.setModalVisible(false)}>
             <Text>Cancel</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{...styles.button,height: moderateScale(30)}}
             onPress={()=> props.verifyText(verificationText)}>
             <Text>Ok</Text>
             </TouchableOpacity>
          </View>
        
        </View>
      </View>
      {/* </Pressable> */}
    </Modal>
  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerBox: {
  justifyContent: "flex-start",
  paddingBottom:10
  },
  headerText:{
   fontWeight:'bold',
   textAlign: 'center'
  },
  message:{
   textAlign: 'center',
   fontFamily:'Roboto'
  },
  input:{
    marginTop:15,
    marginHorizontal: 12,
    borderWidth: .5,
    borderRadius:5,
    borderBottomColor: '#333',
    padding: 5,
  },
  buttonBox:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'flex-start',
    padding:10
  },
  button: {
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#333',
    borderRadius: 5,
    width: metrics.SCREEN_WIDTH * .2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});