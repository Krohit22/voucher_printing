import React, { useEffect } from "react";
import { View,Text,TextInput, TouchableOpacity,StyleSheet } from "react-native";
import PurchaseOrderTopHeader from '../components/PurchaseOrderTopHearder';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
export default function PurchaseOrderResult(){
    const [loaded] = useFonts({
        Poppins: require("../assets/fonts/Poppins-Medium.ttf"),
        josefinSans: require("../assets/fonts/JosefinSans-Bold.ttf"),
        inter: require("../assets/fonts/Inter_18pt-Medium.ttf"),
        opensens: require("../assets/fonts/JosefinSans-Bold.ttf"),
      });
    
      // Effect Hook
      useEffect(() => {
        if (loaded) {
          SplashScreen.hideAsync();
        }
      }, [loaded]);
    
      if (!loaded) {
        return null;
      }
    return(
        <View style={{backgroundColor:"white",height:"100%"}}>
            {/* header content */}
            <View style={styles.headerContent}>
                <View style={styles.orderNumContent}>
                    <Text style={styles.HeaderTitle}>Order no.</Text>
                    <Text style={styles.orderNum}>1</Text>
                </View> 
                <View style={styles.verticalLine}></View>
                <View style={styles.DateContent}>
                    <Text style={styles.HeaderTitle}>Date</Text>
                    <Text style={styles.Date}>12/08/2024</Text>
                </View> 

            </View>

            {/* supplier name */}
            <View style={styles.supplierNameConatainer}>
                <Text style={styles.supplierItemName}>Supplier name*</Text>
            </View>
            {/* supplier name */}
            <View style={styles.DeliveryDateConatainer}>
                <View style={styles.DDT_AndIcon}>
                    <Text style={styles.DeliveryDateText}>Delivery date*</Text>
                    <FontAwesome name="calendar-minus-o" size={24} color="black" />
                </View>
                <Text style={styles.DeliveryDate}>12/08/2024</Text>
            </View>

            <View><TouchableOpacity style={styles.AddedItems}><MaterialCommunityIcons name="cart" size={28} color="#800020" /><Text style={styles.AddedItemsText}>Added Items</Text></TouchableOpacity></View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContent:{
        width:'100%',
        flexDirection: "row",
        justifyContent: "space-between",
        
        marginRight: 10,
        marginTop: 10,
        marginBottom:10,
        borderBottomColor:"#909090",
        borderBottomWidth:1
    },
    orderNumContent:{
    flexDirection: "column",
    marginTop: 10,
    marginLeft:10

    },
    orderNum:{
        fontSize:15,
        fontFamily:'Poppins'
        
    },
    HeaderTitle:{
        fontSize:15,
        fontFamily:'Poppins',
        color:"#D0D0D0",
        fontWeight:'700'
    },
    DateContent:{
        flexDirection: "column",
        marginTop: 10,
        position:'relative',
        right:120
    },

    Date:{
        fontSize:15,
        fontFamily:'Poppins'
    },
    verticalLine:{
        height: 40,
        width: 1,
        backgroundColor: "#909090",
        marginTop:10
    },
    supplierNameConatainer:{
        marginTop:40,
        marginLeft:10,
        width:"96%",
        borderBottomColor:"black",
        borderBottomWidth:1,
        marginRight:10
    },
    supplierItemName:{
        fontFamily:"Poppins",
        fontWeight:"500",
        fontSize:18,
    },
    DeliveryDateConatainer:{
        marginTop:20,
        marginLeft:10,
    },
    DDT_AndIcon:{
        flexDirection:'row'
    },
    DeliveryDateText:{
        fontFamily:"Poppins",
        fontSize:18,
        fontWeight:"500",
        marginRight:5

    },
    DeliveryDate:{
        fontFamily:"Poppins",
        fontWeight:"500",
        fontSize:15,
        marginLeft:5,
        borderBottomWidth:1,
        borderColor:"black",
        width:120,
        paddingLeft:10,
    },
    AddedItems:{
        marginTop:20,
        marginLeft:10,
        backgroundColor:"#FFF0F4",
        padding:10,
        width:200,
        alignItems:'center',
        borderRadius:100,  
        elevation:5,
        flexDirection:'row'
    },
    AddedItemsText:{
        color:"#800020",
        fontFamily:"Poppins",
        fontSize:18,
        fontWeight:"500",
        marginLeft:7
    }
}

)