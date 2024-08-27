import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import TopHeader from "../components/PurchaseOrderTopHearder";
import { useFonts } from "expo-font";
import Constant from "expo-constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as SplashScreen from "expo-splash-screen";
import { Divider } from "@rneui/themed";
import { Calendar } from "react-native-calendars";
import Entypo from "@expo/vector-icons/Entypo";
import { Link,useRouter } from "expo-router";
import SaveButton from "../components/saveButtton";

export default function PurchaseOrderForm() {
  // State Hooks
  const [IsOrderModal, SetOrderNoModal] = useState(false);
  const [IsDateModal, SetDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(" ");
  const [isClicked, SetisClicked] = useState(false);
  const [isDeliveryDateModal, SetDeliveryDateModal] = useState(false);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(" ");

  // Font Hook
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

  // Handler Functions
  const handleCurrentDayPress = (day: {
    dateString: React.SetStateAction<string>;
  }) => {
    setSelectedDate(day.dateString);
  };

  const handleDeliveryDayPress = (day: {
    dateString: React.SetStateAction<string>;
  }) => {
    setSelectedDeliveryDate(day.dateString);
  };

  // Date Calculations
  let date = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();

  let currentdate = `${year}-${month < 10 ? `0${month}` : month}-${
    date < 10 ? `0${date}` : date
  }`;

  return (
    <View>
      

      {/* Order Number and Date Input */}
      <View style={styles.headerContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Order no.</Text>
          <TouchableOpacity
            style={styles.inputButton}
            onPress={() => SetOrderNoModal(true)}
          >
            <Text style={styles.inputButtonText}>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="black"
              />
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.verticleLine}></View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.inputButton}
            onPress={() => SetDateModal(true)}
          >
            <Text style={styles.inputButtonText}>
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

      {/* Order Number Modal */}
      <Modal
        transparent={true}
        visible={IsOrderModal}
        animationType="slide"
        onRequestClose={() => SetOrderNoModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Order No</Text>
            <TextInput style={styles.modalInput} />
          </View>
        </View>
      </Modal>

      {/* Date Modal */}
      <Modal visible={IsDateModal} transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.dateModalContainer}>
            <Calendar
              onDayPress={handleCurrentDayPress}
              style={styles.calendar}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: "#800020",
                  selectedTextColor: "#ffff",
                },
              }}
            />

            <View style={styles.modalFooter}>
              <TouchableOpacity onPress={() => SetDateModal(false)}>
                <Text style={styles.modalFooterText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => SetDateModal(false)}>
                <Text style={styles.modalFooterText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Supplier Name Input */}
      <View style={{ flexDirection: "column", width: "100%" }}>
        <Text style={styles.supplierLabel}>Supplier name*</Text>
        <View style={styles.supplierInputContainer}>
          <TextInput style={styles.supplierInput} />
          <TouchableOpacity
            style={styles.supplierButton}
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
                <Link href={"./Suppliers_details"} style={styles.addNewPartyLink}>
                  <Text style={styles.addNewPartyText}>Add New Party</Text>
                </Link>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>

      {/* Delivery Date Input */}
      <View>
        <Text style={styles.deliveryDateLabel}>Delivery date*</Text>
        <TouchableOpacity
          style={styles.deliveryDateInput}
          onPress={() => SetDeliveryDateModal(true)}
        >
          <Text style={styles.deliveryDateText}>DD/MM/YYYY</Text>
        </TouchableOpacity>
      </View>

      {/* Delivery Date Modal */}
      <Modal visible={isDeliveryDateModal} transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.dateModalContainer}>
            <Calendar
              onDayPress={handleDeliveryDayPress}
              style={styles.calendar}
              markedDates={{
                [selectedDeliveryDate]: {
                  selected: true,
                  selectedColor: "#800020",
                  selectedTextColor: "#ffff",
                },
              }}
            />

            <View style={styles.modalFooter}>
              <TouchableOpacity onPress={() => SetDeliveryDateModal(false)}>
                <Text style={styles.modalFooterText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => SetDeliveryDateModal(false)}>
                <Text style={styles.modalFooterText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Item Button */}
      <View style={styles.addItemButtonContainer}>
        <Link href="/AddItem" asChild>
          <TouchableOpacity style={styles.addItemButton}>
            <View style={styles.addItemButtonIcon}>
              <Entypo name="circle-with-plus" size={25} color="#800020" />
            </View>
            <Text style={styles.addItemText}>Add Item</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Note Section */}
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>Note</Text>
        <TextInput style={styles.notesInput} placeholder="Enter"></TextInput>
      </View>
      <View style={styles.SaveButtonContainer}>
        <SaveButton/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "column",
    marginTop: 10,
  },
  label: {
    fontSize: 13,
    color: "#938F8F",
    fontWeight: "600",
    fontFamily: "Poppins",
  },
  inputButton: {
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 1,
    borderColor: "black",
    width: 60,
  },
  inputButtonText: {
    color: "white",
  },
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
  },
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    flex:1
  },
  modalContainer: {
    backgroundColor: "white",
    margin: 30,
    padding: 40,
    borderRadius: 10,
    height: 300,
  },
  modalTitle: {
    marginTop: Constant.statusBarHeight,
    fontFamily: "Poppins",
    fontSize: 24,
  },
  modalInput: {
    width: "95%",
    borderWidth: 1,
    borderColor: "#323CF9",
    borderRadius: 8,
    padding: 10,
  },
  dateModalContainer: {
    backgroundColor: "white",
    width: "80%",
    position: "relative",
    top: 100,
    left: 40,
    borderRadius: 20,
  },
  calendar: {
    width: "100%",
    borderRadius: 10,
    height: 500,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 20,
  },
  modalFooterText: {
    color: "#323CF9",
    fontSize: 16,
    fontFamily: "Poppins",
  },
  supplierLabel: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  supplierInputContainer: {
    flexDirection: "row",
    width: "100%",
  },
  supplierInput: {
    width: "90%",
    marginLeft: 10,
  },
  supplierButton: {
    width: 30,
    marginRight: 5,
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
  addNewPartyLink: {
    position: "relative",
    left: 240,
  },
  addNewPartyText: {
    color: "#323CF9",
    fontSize: 16,
    fontFamily: "josefinSans",
  },
  deliveryDateLabel: {
    fontFamily: "Poppins",
    fontSize: 16,
    marginLeft: 10,
  },
  deliveryDateInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#646161",
    width: 100,
    marginLeft: 10,
  },
  deliveryDateText: {
    fontSize: 14,
    fontFamily: "inter",
    color: "#646161",
  },
  addItemButtonContainer: {
    width: "100%",
    marginTop: 10,
  },
  addItemButton: {
    height: 55,
    width: "100%",
    elevation: 4,
    backgroundColor: "#FFF0F4",
  },
  addItemText: {
    width: "100%",
    height: "100%",
    color: "#800020",
    fontSize: 16,
    fontFamily: "Poppins",
    position: "absolute",
    left: "43%",
    top: 15,
  },
  addItemButtonIcon: {
    position: "absolute",
    left: "36%",
    top: 15,
  },
  noteContainer: {
    width: "100%",
    flexDirection: "column",
    position: "relative",
    bottom: -410,
  },
  noteText: {
    fontFamily: "opensens",
    fontSize: 16,
    marginLeft: 8,
  },
  notesInput: {
    width: "96%",
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 8,
    padding: 5,
  },
  SaveButtonContainer:{
    position:'relative',
    bottom:-420
  },
});
