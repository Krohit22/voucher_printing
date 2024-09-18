import React, { useEffect, useState } from "react";
import { View,StyleSheet,Text,TextInput, TouchableOpacity, Modal, FlatList, Pressable} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as SplashScreen from "expo-splash-screen";
import Feather from '@expo/vector-icons/Feather';
import { useFonts } from "expo-font";
import AntDesign from '@expo/vector-icons/AntDesign';
import SaveButton from "../components/saveButton";
import { router } from "expo-router";
const data =[
    {Unit:"Kilogram",code:'23'},
    {Unit:"Gram",code:'344'},
    {Unit:"Metre",code:'666'},
    {Unit:"Centimetre",code:'767'},
    {Unit:"Litre",code:'343'},
    {Unit:"Mililitre",code:'221'},
    {Unit:"Millimetre",code:'765'},
    {Unit:"Milligram",code:'386'},
    {Unit:"Foot",code:'385'},
    {Unit:"Inch",code:'384'},
    {Unit:"Quart",code:'383'},
]
export default function AddItem(){
    
    const [IsUnitButton,SetUnitButton] = useState(false);
    const [selectedUnit,SetSeletedUnit] = useState('');

    const [newItem, setNewItem] = useState<string>('');
    const [isdata,setdata] = useState(data);
    const [newItemData, setNewItemData] = useState<Array<{ id: string; name: string; unit: string; qty:string; amt:string }>>([]);
    const [itemunit,setitemsunit] = useState('');
    const [itemqty,setitemsqty] = useState('');
    const [itemamount,setitemsamount] = useState('');

    const onsearch = (txt: any) => {
      let tempData = data.filter((item) => {
        return item.Unit.toLowerCase().indexOf(txt.toLowerCase()) > -1;
      });
      setdata(tempData);
    };
    const [fontloaded] = useFonts({
        Poppins:require('../assets/fonts/Poppins-Medium.ttf'),
        love: require('../assets/fonts/PlaywriteSK-ExtraLight.ttf')
    });
    
    useEffect(() => {
        const prepare = async() =>{
            if (fontloaded) {
                await SplashScreen.hideAsync();
            }
        }
        prepare();
    }, [fontloaded]);

    if(!fontloaded){
        return null;
    }

    const addNewitems=()=>{
        if(newItem){
            const newItemObject={
                id : (newItemData.length+1).toString(),
                name : newItem,
                unit : itemunit,
                qty : itemqty,
                amt: itemamount
            }
            setNewItemData([...newItemData,newItemObject]);
            setNewItem('');
            setitemsamount('')
            setitemsqty('')
            setitemsunit('')
        }
    }
    return(
        <View style={styles.AddItemsContainer}>

            {/* add item name */}
            <View style={styles.itemsnameConatainer}><TextInput style={styles.itemsname} placeholder="Item Name*"  onChangeText={(text) => setNewItem(text)}></TextInput><TouchableOpacity style={styles.addNewItem} onPress={()=>router.push("/CreateNewItems")}><AntDesign name="plus" size={24} color="black" /></TouchableOpacity></View>

            {/* add item qty and unit */}
            <View style={styles.itemsQtyAndUnitContainer}><TextInput style={styles.QuentyInput} placeholder="Quantity*" onChangeText={(text)=>setitemsqty(text)}></TextInput>
                <TouchableOpacity style={styles.AddUnitButton} onPress={()=>SetUnitButton(true)}><Text style={styles.AddUnitButtonText}>Unit*</Text><View style={styles.AddUnitButtonIcon}><MaterialIcons name="keyboard-arrow-up" size={35} color="black" /></View></TouchableOpacity>
            </View>   
            

            {/* add item Rate */}
            <View style={styles.RateInputConatainer}><TextInput style={styles.RateInput} placeholder="Rate*" onChangeText={(text)=>setitemsamount(text)}></TextInput></View>


            {/*view item list*/}
            <View style={styles.ViewItemLIstContainer}>
                <View style={styles.ListOfItemContainerHeader}>
                    <Text style={styles.ItemTxt}>Items</Text>
                    <Text style={styles.AmtTxt}>Amount</Text>
                </View>
                <FlatList data={newItemData} keyExtractor={(newItemData)=>newItemData.id} renderItem={({item})=>{
                    return(
                        <View style={styles.itemRow}>
                            <Text style={styles.itemNameText}>{item.id}  {item.name}</Text>
                            <Text style={styles.itemqty}>{item.qty}</Text>
                            <Text style={styles.itemunit}>{item.unit}</Text>
                            <Text style={styles.itemamt}>{item.amt}</Text>
                        
                        </View>
                    )
                }}></FlatList>
            </View>
            

            {/* Add unit modal */}
            <Modal visible={IsUnitButton} transparent={true} >
                <View style={styles.UnitModalConatainer}>
                    <View style={styles.UnitModalBackground}>
                        <View style={styles.UnitModalConatainerHeader}><Text style={styles.AddUnitModalTitle}>Change Item Unit</Text><TouchableOpacity style={styles.UnitModalConatainerCloseButton} onPress={()=>SetUnitButton(false)}><Feather name="x" size={24} color="black" /></TouchableOpacity></View>
                        <View>
                            <TextInput placeholder="Search" style={styles.UniteSearch} onChangeText={(txt)=>onsearch(txt)}></TextInput>
                            
                                <FlatList data={isdata} renderItem={({item,index})=>{
                                    return(
                                       
                                            <TouchableOpacity style={styles.UnitList} onPress={()=>{
                                                SetSeletedUnit(item.Unit)
                                                SetUnitButton(false)
                                                setitemsunit(item.Unit)
                                            }}>
                                                <Text>{item.Unit}</Text>
                                            </TouchableOpacity>
                                       
                                    );
                                }} style={styles.UnitListContainer}/>
                            

                            </View>
                    </View>
                </View>
            </Modal>


            <TouchableOpacity style={{width:'96%',height:39.6,backgroundColor:'#800020',borderRadius:5,justifyContent:'center',alignContent:'center',marginLeft:8,position:'relative',top:40}} onPress={addNewitems}><Text style={{fontFamily:'poppins',color:'white',fontWeight:500,fontSize:16,textAlign:'center'}}>add</Text></TouchableOpacity>
            <View style={styles.saveButton}><SaveButton link="/purchase_order_form" DataList={undefined} onButtonPress={undefined} /></View> 
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
        marginTop:20,
        paddingLeft:10
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
        marginTop:10,
        paddingLeft:10
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
        marginTop:10,
        paddingLeft:10
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
        marginTop:10,
        paddingLeft:10
    },
    AddUnitButton:{
        width:192,
        height:45,
        borderColor:'#938F8F',
        borderWidth:1,
        borderRadius:8,
        marginLeft:10,
        marginTop:10,
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:10,
        
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
        height: 550,
        marginTop:310,
        overflow:'hidden'
    },
    AddUnitModalTitle:{
        fontSize:20,
        fontFamily:'Poppins',  
    },
    AddUnitButtonIcon:{
        marginLeft:100
    },
    AddUnitButtonText:{
        fontSize:14,
        fontFamily:'Poppins'
    },
    UnitModalConatainerCloseButton:{
        marginLeft:170
    },
    UnitModalConatainerHeader:{
        flexDirection:'row'
    },
    UniteSearch:{
        padding:10,
        paddingLeft:12,
        borderWidth:0.5,
        borderColor:'black',
        width:300,
        marginLeft:35,
        marginTop:20,
        borderRadius:8

    },
    UnitList:{
        paddingBottom:15,
        paddingTop:10,
        borderBottomColor:'black',
        borderBottomWidth:1,
        width:300,
        height:45,

        marginLeft:40
    },
    UnitListContainer:{
        marginTop:20,
    
    },
    addNewItem:{
        position:'absolute',
        right:15,
        top:30
    },
    saveButton:{
        position:'relative',
        top:50
    },
    ViewItemLIstContainer:{
        width: 357,
        height: 420,
        backgroundColor: 'white',
        marginLeft: 30,
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
        
    },
    ListOfItemContainerHeader: {
        width: '100%',
        height: 45,
        borderBottomWidth: 0.5,
        borderColor: '#A49A9A',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:"white"
    },
    ListOfItem: {
        flexGrow: 1,
    },
    AmtTxt: {
        textAlign: 'right',
        fontSize: 16,
        fontWeight: 'bold',
    },
    ItemTxt: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#A49A9A',
        height:80,
    },
    itemNameText: {
        fontSize: 14,
        width:'100%',
        position:'absolute',
        top:20,
        left:10

    },
    itemamt: {
        position:'absolute',
        top:20,
        right:10
    },
    itemqty:{
        position:'absolute',
        top:40,
        left:23,
        color:'#646161'
    },
    itemunit:{
        position:'absolute',
        top:40,
        left:45,
        color:'#646161'
    }
})
