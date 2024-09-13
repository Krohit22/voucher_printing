import React, { useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { router } from "expo-router";

interface SaveButtonProps {
  link: any;
  DataList: any;
  onButtonPress?: () => Promise<void> | void; // Handle both async and sync cases
}

export default function SaveButton({
  link,
  DataList,
  onButtonPress,
}: SaveButtonProps) {
  const [loaded] = useFonts({
    poppins: require("../assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Define the handler as an async function to ensure sequential execution
  const handlePress = async () => {
    try {
      // If onButtonPress exists, wait for it to complete
      if (onButtonPress) {
        await onButtonPress(); // Await the completion of onButtonPress
      }

      // After onButtonPress is done, navigate to the next route
      router.push({
        pathname: link,
        params: { DataList: JSON.stringify(DataList) }, // Serialize DataList
      });
    } catch (error) {
      console.error("Error occurred in handlePress:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>Save</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "96%",
    height: 39.6,
    backgroundColor: "#800020",
    borderRadius: 5,
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 8,
  },
  text: {
    fontFamily: "poppins",
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
  },
});
