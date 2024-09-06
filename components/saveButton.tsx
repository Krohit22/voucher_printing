import React, { useEffect } from "react";
import { View,Text,StyleSheet,TouchableOpacity, GestureResponderEvent } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { router } from "expo-router";

interface SaveButtonProps {
    link: any;
    itemsData: Array<{ id: string; name: string,unit: string,qty:string,amt:string}>;
}
export default function SaveButton({ link, itemsData }: SaveButtonProps){
    // const handlePress = () => {
    //     // Serialize itemsData to a JSON string
    //     const queryParams = new URLSearchParams({
    //         itemsData: JSON.stringify(itemsData),
    //     }).toString();

    //     // Append queryParams to the link
    //     router.push(`${link}?${queryParams}`);
    //     };
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
        
            <TouchableOpacity style={{width:'96%',height:39.6,backgroundColor:'#800020',borderRadius:5,justifyContent:'center',alignContent:'center',marginLeft:8}} onPress={() => router.push({
                pathname: link,
                params: { itemsData: JSON.stringify(itemsData) } // Serialize itemsData as a JSON string
            })}>
                <Text style={{fontFamily:'poppins',color:'white',fontWeight:500,fontSize:16,textAlign:'center'}}>Save</Text>
            </TouchableOpacity>
            
        
    );
}