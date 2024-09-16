import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import Constant from "expo-constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as SplashScreen from "expo-splash-screen";
import { Calendar } from "react-native-calendars";
import Entypo from "@expo/vector-icons/Entypo";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import SaveButton from "../components/saveButton";
import { FlatList } from "react-native";

interface supplierdetail {
  id: string;
  name: string;
  alias: string;
  add: string;
  contactPh: string;
  email: string;
  GSTINno: string;
  OutstandingAmt: string;
}

interface itemDetail{
  Total:string
}
export default function PurchaseOrderForm() {
  // State Hooks

  const [IsOrderModal, SetOrderNoModal] = useState(false);
  const [IsDateModal, SetDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("DD/MM/YYYY");
  const [isClicked, SetisClicked] = useState(false);
  const [isDeliveryDateModal, SetDeliveryDateModal] = useState(false);
  const [selectedDeliveryDate, setSelectedDeliveryDate] =
    useState("DD/MM/YYYY");
  const [isOrderNo, setOrderNo] = useState("1");
  const [isShowselectedDeliveryDate, setShowselectedDeliveryDate] =
    useState("");
  const [isShowselectedCurrentDate, setShowselectedCurrentDate] = useState("");
  const { DataList } = useLocalSearchParams<{ DataList: string }>();
  const [supplierName,SetsupplierName] = useState("");
  const [PODataList, SetPODataList] = useState<Array<{OrderNo:string,CurrentDate:string,SupplierName:string,DeliveryDate:string,Total:string}>>([]);
  const {Total} = useLocalSearchParams<{Total:string}>()
  console.log(Total)
  let parsedItems: supplierdetail[] = DataList
    ? Array.isArray(DataList)
      ? DataList
      : JSON.parse(DataList)
    : [];

    const[supplierNameList,SetsupplierNameList] = useState(parsedItems);

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


  //function to store information of purchaser in list
  const AddPOList = () => {
    if(isOrderNo){
      const newPODataListObject={
        OrderNo:isOrderNo,
        CurrentDate:selectedDate,
        SupplierName:supplierName,
        DeliveryDate:selectedDeliveryDate,
        Total:Total     
      }
      PODataList.push(newPODataListObject);
    }
  }

  //function to search supplier name
  const onSearch = (txt :any) =>{
    let tempdata = parsedItems.filter((item)=>{
        return item.name.toLowerCase().indexOf(txt.toLowerCase())> - 1;
    });
    SetsupplierNameList(tempdata)
  }
  // Function to format date
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-"); // Split by "-"
    return `${day}/${month}/${year}`; // Return formatted as dd/mm/yyyy
  };

  // Handler Functions
  const handleCurrentDayPress = (day: { dateString: string }) => {
    setShowselectedCurrentDate(day.dateString);
    const formattedDate = formatDate(day.dateString);
    setSelectedDate(formattedDate);
  };

  const handleDeliveryDayPress = (day: { dateString: string }) => {
    setShowselectedDeliveryDate(day.dateString);
    const formattedDate = formatDate(day.dateString);
    setSelectedDeliveryDate(formattedDate);
  };

  return (
    <View>
      {/* Order Number and Date Input */}
      <View style={styles.headerContainer}>
        <View style={styles.inputOrderByContainer}>
          <Text style={styles.label}>Order no.</Text>
          <View style={styles.orderNoTxtAndButtonContent}>
            <Text>{isOrderNo}</Text>
            <TouchableOpacity
              style={styles.inputOrderNoButton}
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
        </View>

        <View style={styles.verticleLine}></View>

        <View style={styles.inputDateContainer}>
          <Text style={styles.label}>Date</Text>
          <View style={styles.DateTxtAndButtonContent}>
            <Text>{selectedDate}</Text>
            <TouchableOpacity
              style={styles.inputDateButton}
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
      </View>

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
            <TextInput
              style={styles.modalInput}
              onChangeText={(text) => setOrderNo(text)}
            />
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
                [isShowselectedCurrentDate]: {
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
        <View style={styles.supplierInputContainer}>
          <TextInput
            style={styles.supplierInput}
            placeholder="Supplier name*"
          onChangeText={(txt)=>{onSearch(txt); SetisClicked(true); SetsupplierName(txt)}} value={supplierName}/>
          <TouchableOpacity
            style={styles.supplierButton}
            onPress={() => SetisClicked(!isClicked)}
          >
            <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {isClicked ? (
          <View style={styles.dropDownArea}>
            <View style={{ width: "100%" }}>
              <TouchableOpacity>
                <Link
                  href={"./Suppliers_details"}
                  style={styles.addNewPartyLink}
                >
                  <Text style={styles.addNewPartyText}>Add New Party</Text>
                </Link>
              </TouchableOpacity>

              <View>
                <FlatList
                  data={supplierNameList}
                  keyExtractor={(supplierdetail) => supplierdetail.id}
                  renderItem={({ item }) => (
                    <View>
                          <TouchableOpacity
                            style={styles.SupplierNameList}
                            onPress={() => {
                            SetisClicked(false);
                            SetsupplierName(item.name)
                            }}>
                              <Text style={styles.SupplierNameListIdText}>{item.id}</Text>
                              <Text style={styles.SupplierNameListNameText}>{item.name}</Text>
                            </TouchableOpacity>
                            
                    </View>
                    
                  )}
                />
              </View>
            </View>
          </View>
        ) : null}
      </View>

      {/* Delivery Date Input */}
      <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryDateLabel}>Delivery date*</Text>
        <TouchableOpacity
          style={styles.deliveryDateInput}
          onPress={() => SetDeliveryDateModal(true)}
        >
          <Text style={styles.deliveryDateText}>{selectedDeliveryDate}</Text>
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
                [isShowselectedDeliveryDate]: {
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
        <SaveButton
          link={"./PurchaseOrderResult"}
          DataList={PODataList}
          onButtonPress={AddPOList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginRight: 20,
    marginBottom: 10,
    marginTop: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
  },
  label: {
    fontSize: 13,
    color: "#938F8F",
    fontWeight: "600",
    fontFamily: "Poppins",
  },
  inputOrderNoButton: {
    width: 30,
    marginLeft: 45,
  },
  inputButtonText: {
    color: "white",
  },
  verticleLine: {
    height: 40,
    width: 1,
    backgroundColor: "#909090",
    marginTop: 10,
    position: "relative",
    left: 20,
  },
  modalBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    flex: 1,
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

  supplierInputContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 30,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  supplierInput: {
    width: "90%",
    marginLeft: 10,
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "500",
  },
  supplierButton: {
    width: 30,
    marginRight: 5,
  },
  dropDownArea: {
    width: "90%",
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#fff",
    elevation: 5,
    alignSelf: "center",
   
  },
  addNewPartyLink: {
    position: "relative",
    left: 240,
    marginBottom: 50,
    maxHeight:300
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
    bottom: -360,
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
  SaveButtonContainer: {
    position: "relative",
    bottom: -370,
  },
  orderNoTxtAndButtonContent: {
    flexDirection: "row",
  },
  DateTxtAndButtonContent: {
    flexDirection: "row",
  },
  inputDateButton: {
    width: 30,
    marginLeft: 10,
  },
  inputDateContainer: {
    flexDirection: "column",
    marginTop: 10,
    position: "relative",
    right: 60,
  },
  inputOrderByContainer: {
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 10,
  },
  deliveryContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  SupplierNameList: {
    padding: 10,
    borderTopColor:"black",
    borderBlockColor:"black",
    borderTopWidth:1,
    borderBottomWidth:1,
    justifyContent: "center",
    flexDirection: "row",
  },
  SupplierNameListIdText: {
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: "600",
    marginLeft: 10,
  },
  SupplierNameListNameText: {
    fontSize: 14,
    width: "100%",
    fontFamily: "Poppins",
    fontWeight: "600",
    marginLeft: 10,
  },
});
