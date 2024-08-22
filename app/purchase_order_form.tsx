import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import TopHeader from "../components/TopHearder";
import { useFonts } from "expo-font";
import Constant from "expo-constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as SplashScreen from "expo-splash-screen";
import { Divider } from "@rneui/themed";
import { Calendar } from "react-native-calendars";

import { Link } from "expo-router";

export default function purchase_order_form() {
  const [IsOrderMadal, SetOrderNoModal] = useState(false);
  const [IsDateMadal, SetDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(" ");
  const [isClicked, SetisClicked] = useState(false);

  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Medium.ttf"),
    josefinSans: require("../assets/fonts/JosefinSans-Bold.ttf"),
    inter: require("../assets/fonts/Inter_18pt-Medium.ttf"),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  if (!loaded) {
    return null;
  }
  let date = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();

  let currentdate = `${year}-${month < 10 ? `0${month}` : month}-${
    date < 10 ? `0${date}` : date
  }`;

  const handleDayPress = (day: { dateString: React.SetStateAction<string>; }) => {
    setSelectedDate(day.dateString); 
  };

  return (
    <View>
      <TopHeader />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginLeft: 10,
          marginRight: 20,
          marginBottom: 10,
          marginTop: 5,
        }}
      >
        <View style={{ flexDirection: "column", marginTop: 10 }}>
          <Text
            style={{
              fontSize: 13,
              color: "#938F8F",
              fontWeight: 600,
              fontFamily: "Poppins",
            }}
          >
            Order no.
          </Text>
          <TouchableOpacity
            style={{
              paddingLeft: 5,
              paddingRight: 5,
              borderWidth: 1,
              borderColor: "black",
              width: 60,
            }}
            onPress={() => SetOrderNoModal(true)}
          >
            <Text style={{ color: "white" }}>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="black"
              />
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.verticleLine}></View>

        <View style={{ flexDirection: "column", marginTop: 10 }}>
          <Text
            style={{
              fontSize: 13,
              color: "#938F8F",
              fontWeight: 600,
              fontFamily: "Poppins",
            }}
          >
            Date
          </Text>
          <TouchableOpacity
            style={{
              paddingLeft: 5,
              paddingRight: 5,
              borderWidth: 1,
              borderColor: "black",
              width: 60,
            }}
            onPress={() => SetDateModal(true)}
          >
            <Text style={{ color: "white" }}>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="black"
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider width={5} color="black" />
      <Modal
        transparent={true}
        visible={IsOrderMadal}
        animationType="slide"
        onRequestClose={() => SetOrderNoModal(false)}
      >
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View
            style={{
              backgroundColor: "white",
              margin: 30,
              padding: 40,
              borderRadius: 10,
              height: 300,
            }}
          >
            <Text
              style={{
                marginTop: Constant.statusBarHeight,
                fontFamily: "Poppins",
                fontSize: 24,
              }}
            >
              Order No
            </Text>
            <TextInput
              style={{
                width: "95%",
                borderWidth: 1,
                borderColor: "#323CF9",
                borderRadius: 8,
                padding: 10,
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={IsDateMadal}>
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View
            style={{
              backgroundColor: "white",
              width: "80%",
              position: "relative",
              top: 200,
              left: 40,
              borderRadius: 20,
            }}
          >
            <Calendar
                onDayPress={handleDayPress}
              style={{ width: "100%", borderRadius: 10, height: 500 }}
        
                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: "#800020",selectedTextColor: "#ffff" }, // Mark the selected date
                  }}
              
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                marginBottom: 20,
              }}
            >
        
              <TouchableOpacity
                onPress={() => {
                  SetDateModal(false);
                }}
              >
                <Text
                  style={{
                    color: "#323CF9",
                    fontSize: 16,
                    fontFamily: "Poppins",
                  }}
                >
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  SetDateModal(false);
                }}
              >
                <Text
                  style={{
                    color: "#323CF9",
                    fontSize: 16,
                    fontFamily: "Poppins",
                    marginRight: 5,
                  }}
                >
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>



      <View style={{ flexDirection: "column", width: "100%" }}>
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 16,
            fontWeight: 500,
            marginLeft: 10,
          }}
        >
          Supplier name*
        </Text>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <TextInput style={{ width: "90%", marginLeft: 10 }}></TextInput>
          <TouchableOpacity
            style={{ width: 30, marginRight: 5 }}
            onPress={() => SetisClicked(!isClicked)}
          >
            <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Divider width={2} color="black" />
        {isClicked ? (
          <View style={styles.dropDownArea}>
            <View style={{ width: "100%" }}>
              <TouchableOpacity>
                <Link href={"/"} style={{ position: "relative", left: 240 }}>
                  <Text
                    style={{
                      color: "#323CF9",
                      fontSize: 16,
                      fontFamily: "josefinSans",
                    }}
                  >
                    Add New Party
                  </Text>
                </Link>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
      <View>
        <Text style={{ fontFamily: "Poppins", fontSize: 16 }}>
          Delivery date*
        </Text>
        <TouchableOpacity
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#646161",
            width: 100,
          }}
        >
          <Text style={{ fontSize: 14, fontFamily: "inter", color: "#646161" }}>
            DD/MM/YYYY
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
  },
  dropDownArea: {
    width: "90%",
    height: 70,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#fff",
    elevation: 5,
    alignSelf: "center",
  },
});
