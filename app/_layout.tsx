import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
// Remove or update this if needed
// import header from "@/components/PurchaseOrderTopHearder";

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        'Poppins': require('../assets/fonts/Poppins-Medium.ttf'), 
        'love': require('../assets/fonts/PlaywriteSK-ExtraLight.ttf')
    });
    
    useEffect(() => {
        const hideSplashScreen = async () => {
            if (fontsLoaded) {
                await SplashScreen.hideAsync(); // Await the hideAsync function
            }
        };
        hideSplashScreen();
    }, [fontsLoaded]);
    
    if (!fontsLoaded) {
        return null; // You can replace this with a loading indicator if needed
    }
    
    return (
        <Stack>
            <Stack.Screen 
                name="index"  
                options={{
                    headerTitle: "Purchase order",
                    headerTitleAlign: 'center',
                    headerTintColor: "#800020",
                    headerStyle: {
                        backgroundColor: '#ffff'
                    },
                    headerTitleStyle: {
                        fontWeight: '600', // Font weight should be a string
                        fontFamily: 'Poppins',
                        fontSize: 24 
                    }
                }}
            />
            
            <Stack.Screen 
                name="purchase_order_form" 
                options={({ navigation }) => ({
                    headerTitle: "Purchase order",
                    headerTitleAlign: 'center',
                    headerTintColor: "#800020",
                    headerStyle: {
                        backgroundColor: '#ffff'
                    },
                    headerTitleStyle: {
                        fontWeight: '600',
                        fontFamily: 'Poppins',
                        fontSize: 24 
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" size={30} color="#800020" />
                        </TouchableOpacity>
                    )
                })}
            />
            
            <Stack.Screen name="Suppliers_details"                 
                                options={({ navigation }) => ({
                                    headerTitle: "Supliers Details",
                                    headerTitleAlign: 'center',
                                    headerTintColor: "#800020",
                                    headerStyle: {
                                        backgroundColor: '#ffff'
                                    },
                                    headerTitleStyle: {
                                        fontWeight: '600',
                                        fontFamily: 'Poppins',
                                        fontSize: 24 
                                    },
                                    headerLeft: () => (
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                            <AntDesign name="arrowleft" size={30} color="#800020" />
                                        </TouchableOpacity>
                                    )
                                })}/>
            <Stack.Screen name="AddItem"                 
                                options={({ navigation }) => ({
                                    headerTitle: "Add Items",
                                    headerTitleAlign: 'center',
                                    headerTintColor: "#800020",
                                    headerStyle: {
                                        backgroundColor: '#ffff'
                                    },
                                    headerTitleStyle: {
                                        fontWeight: '600',
                                        fontFamily: 'Poppins',
                                        fontSize: 24 
                                    },
                                    headerLeft: () => (
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                            <AntDesign name="arrowleft" size={30} color="#800020" />
                                        </TouchableOpacity>
                                    )
                                })}/>
            <Stack.Screen name="AddLineItem"                 
                                options={({ navigation }) => ({
                                    headerTitle: "Add Line Items",
                                    headerTitleAlign: 'center',
                                    headerTintColor: "#800020",
                                    headerStyle: {
                                        backgroundColor: '#ffff'
                                    },
                                    headerTitleStyle: {
                                        fontWeight: '600',
                                        fontFamily: 'Poppins',
                                        fontSize: 24 
                                    },
                                    headerLeft: () => (
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                            <AntDesign name="arrowleft" size={30} color="#800020" />
                                        </TouchableOpacity>
                                    )
                                })}/>
                        <Stack.Screen name="PurchaseOrderResult"                 
                                options={({ navigation }) => ({
                                    headerTitle: "Purchase Order Result",
                                    headerTitleAlign: 'center',
                                    headerTintColor: "#800020",
                                    headerStyle: {
                                        backgroundColor: '#ffff'
                                    },
                                    headerTitleStyle: {
                                        fontWeight: '600',
                                        fontFamily: 'Poppins',
                                        fontSize: 24 
                                    },
                                    headerLeft: () => (
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                            <AntDesign name="arrowleft" size={30} color="#800020" />
                                        </TouchableOpacity>
                                    )
                                })}/>
        </Stack>
    );
}
