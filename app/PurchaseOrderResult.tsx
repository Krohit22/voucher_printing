import React, { useEffect, useState } from "react";
import { View,Text,TextInput, TouchableOpacity,StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { router, SplashScreen, useLocalSearchParams } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SaveButton from "../components/saveButton";
import { Route } from "expo-router/build/Route";

interface PurchaseOrder{
    OrderNo:string,
    CurrentDate:string,
    SupplierName:string,
    DeliveryDate:string,
    Total:string
}
export default function PurchaseOrderResult(){
    const [orderNO,setOrderNo] = useState("");
    const [CurrentDate,SetCurrentDate] = useState("");
    const [SupplierName,SetSupplierName] = useState("");
    const [DeliveryDate,SetDeliveryDate] = useState("");
    const [SubTotal,SetSubTotal] = useState("");
    const { DataList } = useLocalSearchParams<{ DataList: string }>();
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

      let parsedItems:  PurchaseOrder[] = DataList
      ? Array.isArray(DataList) ?DataList : JSON.parse(DataList) : [];
      console.log(parsedItems)
      console.log(DataList)
      useEffect(() => {
        // Parse the DataList and set the state based on the first item (assuming you're showing the first order).
        if (DataList) {
          // Set state for the first item if available
          if (parsedItems.length > 0) {
            const firstOrder = parsedItems[0];
            setOrderNo(firstOrder.OrderNo);
            SetCurrentDate(firstOrder.CurrentDate);
            SetSupplierName(firstOrder.SupplierName);
            SetDeliveryDate(firstOrder.DeliveryDate);
            SetSubTotal(firstOrder.Total);

          }
        }
      }, [DataList]);

    return(
        <View style={{backgroundColor:"white",height:"100%"}}>
            {/* header content */}
            <View style={styles.headerContent}>
                <View style={styles.orderNumContent}>
                    <Text style={styles.HeaderTitle}>Order no.</Text>
                    <Text style={styles.orderNum}>{orderNO}</Text>
                </View> 
                <View style={styles.verticalLine}></View>
                <View style={styles.DateContent}>
                    <Text style={styles.HeaderTitle}>Date</Text>
                    <Text style={styles.Date}>{CurrentDate}</Text>
                </View> 

            </View>
            
            {/* supplier name */}
            <View style={styles.supplierNameConatainer}>
                <Text style={styles.supplierItemName}>{SupplierName}</Text>
            </View>

            {/* delivery date name */}
            <View style={styles.DeliveryDateConatainer}>
                <View style={styles.DDT_AndIcon}>
                    <Text style={styles.DeliveryDateText}>DeliveryDate*</Text>
                    <FontAwesome name="calendar-minus-o" size={24} color="black" />
                </View>
                <Text style={styles.DeliveryDate}>{DeliveryDate}</Text>
            </View>

            <View><TouchableOpacity style={styles.AddedItems} onPress={()=>router.push("/AddItem")}><MaterialCommunityIcons name="cart" size={28} color="#800020" /><Text style={styles.AddedItemsText}>Added Items</Text></TouchableOpacity></View>
            <View style={styles.SubTotalContainer}>
                <Text style={styles.SubTotalTitle}>Sub Total</Text><Text style={styles.STamt}>{SubTotal}</Text>
            </View>
            <View style={styles.DiscountContainer}>
                <Text style={styles.DiscountTitle}>Discount</Text><Text style={styles.DiscountAmt}></Text>
            </View>
            <View style={styles.TotalContainer}>
                <Text style={styles.TotalTitle}>Total</Text><Text style={styles.Tamt}></Text>
            </View>
            <View style={styles.noteContainer}>
                <Text style={styles.noteText}>Note</Text>
                <TextInput style={styles.notesInput} placeholder="Enter"></TextInput>
            </View>
            <View style={styles.SaveButtonContainer}>
                <SaveButton link={""} DataList={[]} onButtonPress={undefined}/>
            </View>
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
        right:110
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
    },
    SubTotalContainer:{
        position:'absolute',
        top:450,
        left:20,
        flexDirection:'row'
        
    },
    SubTotalTitle:{
        fontFamily:'Poppins',
        fontSize:21,
        width:140,
        marginRight:42
    },
    STamt:{
        borderBottomColor:"black",
        borderBottomWidth:1,
        width:190,
        position:'relative',
        bottom:5
        
    },
    DiscountContainer:{
        position:'absolute',
        top:500,
        left:20,
        flexDirection:'row'
        
    },
    DiscountTitle:{
        fontFamily:'Poppins',
        fontSize:21,
        width:140,
        marginRight:42
    },
    DiscountAmt:{
        borderBottomColor:"black",
        borderBottomWidth:1,
        width:190,
        position:'relative',
        bottom:5
        
    },
    TotalContainer:{
        position:'absolute',
        top:550,
        left:20,
        flexDirection:'row'
        
    },
    TotalTitle:{
        fontFamily:'Poppins',
        fontSize:21,
        width:140,
        marginRight:42
    },
    Tamt:{
        borderBottomColor:"black",
        borderBottomWidth:1,
        width:190,
        position:'relative',
        bottom:5
        
    },
    noteContainer: {
        width: "100%",
        flexDirection: "column",
        position: "relative",
        bottom: -320,
      },
      noteText: {
        fontFamily: "opensens",
        fontSize: 17,
        marginLeft: 8,
      },
      notesInput: {
        width: "96%",
        height: 45,
        borderColor: "black",
        borderWidth: 1,
        marginLeft: 8,
        padding: 5,
        marginTop:5
      },
      SaveButtonContainer: {
        position: "relative",
        bottom: -340,
      },


}

)