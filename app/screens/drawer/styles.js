
import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import AppStyles from '../../config/styles';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.COLOR_WHITE,
  },
  contentContainer:{
      flex:1,
      width:'100%'
  },
  userDetails:{
    width:'100%',
    height:moderateScale(100),
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderBottomColor:AppStyles.colors.COLOR_GREY,
    borderBottomWidth:moderateScale(.5),
   
},
  pageButton:{
      width:'100%',
      height:moderateScale(50),
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row',
      borderBottomColor:AppStyles.colors.COLOR_GREY,
      borderBottomWidth:moderateScale(.5),
     
  },pageButtonText:{
      fontSize:moderateScale(14),
      fontFamily:'Roboto-Regular',
      color:AppStyles.colors.COLOR_PRIMARY
    
  },
  contentFooterContainer:{
      flex:1,justifyContent:'flex-end',paddingBottom:moderateScale(10),alignItems:'center'}

});
export default styles;
