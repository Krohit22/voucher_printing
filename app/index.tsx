import { Text, View, TouchableOpacity, Animated } from "react-native";
import TopHeader from "../components/PurchaseOrderTopHearder";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { ExpoRouter, Link } from "expo-router";

export default function Index() {
  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <TopHeader />
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderWidth: 0,
          borderColor: "black",
          position: "absolute",
          bottom: 20,
          right: 20,
          borderRadius: 8,
          backgroundColor: "#800020",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link href={"/purchase_order_form"}>
          <FontAwesome6 name="plus" size={24} color="white" />
        </Link>
      </TouchableOpacity>
    </View>
  );
}
