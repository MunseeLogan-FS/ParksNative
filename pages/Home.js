import React from "react";
import { Text, SafeAreaView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../components/Appstyles";
import AppWrapper from "../components/AppWrapper"; // Assuming you have an AppWrapper component

function Home() {
  const navigation = useNavigation();

  return (
    <AppWrapper>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Park List Homepage</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </Pressable>
      </SafeAreaView>
    </AppWrapper>
  );
}

export default Home;
