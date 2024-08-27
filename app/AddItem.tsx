import React, { useEffect, useState } from "react";
import { View,StyleSheet,Text,TextInput, TouchableOpacity, Modal} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
export default function AddItem(){
    const [IsUnitButton,SetUnitButton] = useState(false)
    const [fontloaded] = useFonts({
        Poppins:require('../assets/fonts/Poppins-Medium.ttf'),
        love: require('../assets/fonts/PlaywriteSK-ExtraLight.ttf')
    });
    
    useEffect(() => {
        const prepare= async() =>{
            if (fontloaded) {
                await SplashScreen.hideAsync();
            }
        }
        prepare();
    }, [fontloaded]);

    if(!fontloaded){
        return null;
    }
    return(
        <View style={styles.AddItemsContainer}>

            {/* add item name */}
            <View style={styles.itemsnameConatainer}><TextInput style={styles.itemsname}></TextInput></View>

            {/* add item qty and unit */}
            <View style={styles.itemsQtyAndUnitContainer}><TextInput style={styles.QuentyInput}></TextInput><TextInput style={styles.UnitInput}></TextInput></View>   
            <TouchableOpacity style={styles.AddUnitButton} onPress={()=>SetUnitButton(true)}><MaterialIcons name="keyboard-arrow-up" size={35} color="black" /></TouchableOpacity>

            {/* add item Rate */}
            <View style={styles.RateInputConatainer}><TextInput style={styles.RateInput}></TextInput></View>

            {/* add item HSN Code*/}
            <View style={styles.HSNCodeInputConatainer}><TextInput style={styles.HSNCodeInput}></TextInput></View>

            {/* Add unit modal */}
            <Modal visible={IsUnitButton} transparent={true}>
                <View style={styles.UnitModalConatainer}>
                    <View style={styles.UnitModalBackground}>
                        <View><Text style={styles.AddUnitModalTitle}>Change Item Unit</Text></View>

                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    AddItemsContainer:{
        width:'100%'
    },
    itemsname:{
        borderColor:'#938F8F',
        borderWidth:1,
        height:45,
        width:'96%',
        borderRadius:8,
        marginLeft:8,
        marginTop:20
    },
    itemsnameConatainer:{
        width:'100%',
    },
    itemsQtyAndUnitContainer:{
        width:'100%',
        flexDirection:'row'
    },
    QuentyInput:{
        width:192,
        height:45,
        borderColor:'#938F8F',
        borderWidth:1,
        borderRadius:8,
        marginLeft:8,
        marginTop:10
    },
    UnitInput:{
        width:192,
        height:45,
        borderColor:'#938F8F',
        borderWidth:1,
        borderRadius:8,
        marginLeft:10,
        marginTop:10,
        
    },
    RateInputConatainer:{
        width:'100%',
    },
    RateInput:{
        borderColor:'#938F8F',
        borderWidth:1,
        height:45,
        width:'96%',
        borderRadius:8,
        marginLeft:8,
        marginTop:10
    },
    HSNCodeInputConatainer:{
        width:'100%',
    },
    HSNCodeInput:{
        borderColor:'#938F8F',
        borderWidth:1,
        height:45,
        width:'96%',
        borderRadius:8,
        marginLeft:8,
        marginTop:10
    },
    AddUnitButton:{
        position:'absolute',
        right:20,
        top:80
    },
    UnitModalConatainer:{
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        flex:1
    },
    UnitModalBackground:{
        backgroundColor:'white',
        margin: 2,
        padding: 20,
        borderRadius: 10,
        height: 500,
        marginTop:310
    },
    AddUnitModalTitle:{
        fontSize:20,
        fontFamily:'Poppins',
        
        
        
    }


})
