import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import SaveButton from "../components/saveButton";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen"

export default function CreateNewItems() {

    const [fontload] = useFonts({
        Poppins:require('../assets/fonts/Poppins-Medium.ttf'),
        }
    );
    useEffect(()=>{
        const prepare = async()=>{
            if(fontload){
                await SplashScreen.hideAsync()
            }
        } 
        prepare();
    },[fontload])

    if(!fontload){
        return null;
    }
    return (
        <View style={styles.wrapper}>
                <View style={styles.AddNewItemConatainer}>
                    
                    <View style={styles.AddItemsContainerBackground}>
                                <View><TextInput style={styles.addNewItemInputs} placeholder="Item Name*"></TextInput></View>
                                <View><TextInput style={styles.addNewItemInputs} placeholder="Item Category*"></TextInput></View>
                                <View><TextInput style={styles.addNewItemInputs} placeholder="HSN Code*"></TextInput></View>
                                <TouchableOpacity style={styles.AddBtn}><Text style={styles.AddBtnText}>Add</Text></TouchableOpacity>
                                <View style={styles.AddNewItemSaveButton}><SaveButton link={"/AddItem"} DataList={[]} onButtonPress={undefined}/></View>
                    </View>
                </View>

        </View>
    );
}

const styles = StyleSheet.create({
    AddNewItemConatainer:{
        backgroundColor:'white',
        height:"100%",
        width:"100%",
    },
    AddItemsContainerBackground:{

        padding:20,
        marginTop:100
    },
    AddNewItemheader:{
        flexDirection:'row',
        justifyContent:'center',
        
    },
    AddNewItemheaderText:{
        color:'#800020',
        fontFamily:'Poppins',
        fontSize:24,
        marginBottom:10,

        
    },
    addNewItemInputs:{
        width:'95%',
        borderColor:'black',
        borderWidth:1,
        padding:10,
        marginLeft:10,
        marginTop:15,
        borderRadius:8
    },
    AddNewItemSaveButton:{
        marginTop:50
    },
    wrapper:{
        width:"100%",
        height:"100%",
    },
    AddBtn:{
        width:'96%',
        height:39.6,backgroundColor:'#800020',
        borderRadius:5,
        justifyContent:'center',
        alignContent:'center',
        marginLeft:8,
        position:'relative',
        top:40
    },
    AddBtnText:{
        fontFamily:'Poppins',
        color:'white',
        fontWeight:'500',
        fontSize:16,
        textAlign:'center',
    }
});
