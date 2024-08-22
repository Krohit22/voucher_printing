import React, { useEffect } from "react";
import { View,Text,StyleSheet,TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

export default function saveButton(){
    const [loaded] = useFonts({
        "poppins":require("../assets/fonts/Poppins-Medium.ttf")
    });
    useEffect(()=>{
        if(loaded){
            SplashScreen.hideAsync();
        }
    },[loaded]);
    if(!loaded){
        return null;
    }
    return(
        <View>
            <TouchableOpacity style={{width:359,height:39.6,backgroundColor:'#800020',borderRadius:5,justifyContent:'center',alignContent:'center'}}>
                <Text style={{fontFamily:'poppins',color:'white',fontWeight:500,fontSize:16,textAlign:'center'}}>Save</Text>
            </TouchableOpacity>
            
        </View>
    );
}