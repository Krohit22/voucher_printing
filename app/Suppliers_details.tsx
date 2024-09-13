import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";

import SaveButton from "../components/saveButton";
import { StretchInX } from "react-native-reanimated";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import { router } from "expo-router";

export default function SuppliersDetails() {
  const [DataList, setDataList] = useState<
    Array<{
      id: string;
      name: string;
      alias: string;
      add: string;
      contactPh: string;
      email: string;
      GSTINno: string;
      OutstandingAmt: string;
    }>
  >([]);
  const [isName, setName] = useState("");
  const [isAlias, setAlias] = useState("");
  const [isContactph, setContactph] = useState("");
  const [isEmail, setEmail] = useState("");
  const [isGSTINno, setGSTINno] = useState("");
  const [isOutstandingAmt, setOutstandingAmt] = useState("");
  const [isAdd, setAdd] = useState("");

  const addNewSupplier = () => {
    const newSupplierObject = {
      id: (DataList.length + 1).toString(),
      name: isName,
      alias: isAlias,
      add: isAdd,
      contactPh: isContactph,
      email: isEmail,
      GSTINno: isGSTINno,
      OutstandingAmt: isOutstandingAmt,
    };
    DataList.push(newSupplierObject);
    setName("");
    setAlias("");
    setContactph("");
    setEmail("");
    setGSTINno("");
    setOutstandingAmt("");
    setAdd("");

  };

  return (
    <View>
      <View style={styles.inputTextContainer}>
        <TextInput
          style={styles.InputSupplierDetails}
          placeholder="Supplier name*"
          onChangeText={(text) => setName(text)}
        ></TextInput>
      </View>
      <View style={styles.inputTextContainer}>
        <TextInput
          style={styles.InputSupplierDetails}
          placeholder="Alias*"
          onChangeText={(text) => setAlias(text)}
        ></TextInput>
      </View>
      <View style={styles.inputTextContainer}>
        <TextInput
          style={styles.InputSupplierDetails}
          placeholder="Supplier Address*"
          onChangeText={(text) => setAdd(text)}
        ></TextInput>
      </View>
      <View style={styles.inputTextContainer}>
        <TextInput
          style={styles.InputSupplierDetails}
          placeholder="Contact no*."
          onChangeText={(text) => setContactph(text)}
        ></TextInput>
      </View>
      <View style={styles.inputTextContainer}>
        <TextInput
          style={styles.InputSupplierDetails}
          placeholder="Email Id*"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
      </View>
      <View style={styles.inputTextContainer}>
        <TextInput
          style={styles.InputSupplierDetails}
          placeholder="GSTIN no.*"
          onChangeText={(text) => setGSTINno(text)}
        ></TextInput>
      </View>
      <View style={styles.inputTextContainer}>
        <TextInput
          style={styles.InputSupplierDetails}
          placeholder="Outstanding Amount*"
          onChangeText={(text) => setOutstandingAmt(text)}
        ></TextInput>
      </View>

      <View style={styles.SaveButtonContainer}>
        <SaveButton
          link={"./purchase_order_form"}
          DataList={DataList}
          onButtonPress={addNewSupplier}
        />
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
    bottom: -180,
  },
});
