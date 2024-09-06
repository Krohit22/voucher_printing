import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import SupplierHeader from "../components/Supliers_Details_header";
import SaveButton from "../components/saveButton";
export default function SuppliersDetails() {
  return (
    <View>
      <View style={styles.inputTextContainer}>
        <TextInput
          style={styles.InputSupplierDetails}
          placeholder="Supplier name*"
        ></TextInput>
      </View>
      <View style={styles.inputTextContainer}>
        <TextInput
          style={styles.InputSupplierDetails}
          placeholder="Alias*"
        ></TextInput>
      </View>
      <View style={styles.inputTextContainer}>
        <TextInput
          style={styles.InputSupplierDetails}
          placeholder="Supplier Address*"
        ></TextInput>
      </View>
      <View style={styles.inputTextContainer}>
        <TextInput
          style={styles.InputSupplierDetails}
          placeholder="Contact no*."
        ></TextInput>
      </View>
      <View style={styles.inputTextContainer}>
        <TextInput
          style={styles.InputSupplierDetails}
          placeholder="Email Id*"
        ></TextInput>
      </View>
      <View style={styles.inputTextContainer}>
        <TextInput
          style={styles.InputSupplierDetails}
          placeholder="GSTIN no.*"
        ></TextInput>
      </View>
      <View style={styles.inputTextContainer}>
        <TextInput
          style={styles.InputSupplierDetails}
          placeholder="Outstanding Amount*"
        ></TextInput>
      </View>
      <View style={styles.SaveButtonContainer}>
        <SaveButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputTextContainer: {
    width: "100%",
  },
  InputSupplierDetails: {
    padding: 10,
    width: "96%",
    borderWidth: 1,
    borderColor: "#938F8F",
    marginLeft: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  SaveButtonContainer: {
    position: "relative",
    bottom: -250,
  },
});
