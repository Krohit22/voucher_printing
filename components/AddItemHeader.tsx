import React from "react";
import { View,StyleSheet,Text } from "react-native";
import Constant from "expo-constants";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from "react-native";

export default function SupplierHeader(){
    const [fontsLoaded] = useFonts({
        'Poppins': require('../assets/fonts/Poppins-Medium.ttf'), // Adjust the path to your font file
        'love': require('../assets/fonts/PlaywriteSK-ExtraLight.ttf')
      });
    
      useEffect(() => {
        if (fontsLoaded) {
          SplashScreen.hideAsync(); // Hide splash screen when fonts are loaded
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) {
        return null; // Or a loading indicator
      }
    

    return(
<View style={{backgroundColor:'#ffff',width:'100%',height:45,borderBottomWidth:0.8,borderBottomColor:'#D9D9D9',flexDirection:'row'}}>
        <View style={{width:100,marginTop:7,marginLeft:10,}}><AntDesign name="arrowleft" size={30} color="#800020"/></View>
    <Text style={{color:'#800020',fontSize:24,textAlign:"center",fontFamily:'Poppins',fontWeight:600,width:200}}>Add Items</Text>
</View>
    );
}