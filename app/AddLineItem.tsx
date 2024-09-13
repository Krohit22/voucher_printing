import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";

// Define the type for the items data
interface Item {
    id: string;
    name: string;
    unit: string;
    qty:string;
    amt:string;
}

export default function AddLineItem() {
    // Fetch the parameters from the router
    const { DataList } = useLocalSearchParams<{ DataList: string }>();
    
    // Parse DataList if it's a string, otherwise use it directly if it's already an array
    const parsedItems: Item[] = DataList
        ? Array.isArray(DataList)
            ? DataList
            : JSON.parse(DataList) : [];

    return (
        <View style={styles.ListOfItemContainer}>
            <View style={styles.ListOfItemContainerHeader}>
                <Text style={styles.ItemTxt}>Items</Text>
                <Text style={styles.AmtTxt}>Amount</Text>
            </View>
            <FlatList
                data={parsedItems}
                keyExtractor={(item) => item.id} // Ensure each item has a unique 'id'
                renderItem={({ item }) => (
                    <View style={styles.itemRow}>
                        <Text style={styles.itemNameText}>{item.id}  {item.name}</Text>
                        <Text style={styles.itemqty}>{item.qty}</Text>
                        <Text style={styles.itemunit}>{item.unit}</Text>
                        <Text style={styles.itemamt}>{item.amt}</Text>
                        
                    </View>
                )}
                style={styles.ListOfItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    ListOfItemContainer: {
        width: 357,
        height: 474,
        backgroundColor: 'white',
        marginLeft: 30,
        marginTop: 60,
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
});
