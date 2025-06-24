import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "../components/Appstyles";
import AppWrapper from "../components/AppWrapper";

function Park() {
  const [values, setValues] = useState({
    name: "",
    location: "",
    area: "",
    established: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:3001/api/v1`
      : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    getPark();
  }, []);

  const getPark = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/nationalParks/${id}`);
      const json = await res.json();
      setValues({
        name: json.data.name,
        location: json.data.location,
        area: json.data.area.toString(),
        established: json.data.established,
      });
    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const deletePark = async () => {
    try {
      await fetch(`${API_BASE}/nationalParks/${id}`, {
        method: "DELETE",
      });
      navigation.navigate("Dashboard");
    } catch (err) {
      setError(err.message || "Unexpected error");
    }
  };

  const updatePark = async () => {
    try {
      await fetch(`${API_BASE}/nationalParks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          location: values.location,
          area: Number(values.area),
          established: values.established,
        }),
      });
      Alert.alert("Park updated");
    } catch (err) {
      setError(err.message || "Unexpected error");
    }
  };

  const handleInputChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AppWrapper>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Park Profile</Text>

          {loading && <ActivityIndicator size="large" color="#2e8b57" />}
          {error && <Text style={styles.error}>{error}</Text>}

          {!loading && !error && (
            <>
              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={styles.input}
                value={values.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />

              <Text style={styles.label}>Location:</Text>
              <TextInput
                style={styles.input}
                value={values.location}
                onChangeText={(text) => handleInputChange("location", text)}
              />

              <Text style={styles.label}>Area:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={values.area}
                onChangeText={(text) => handleInputChange("area", text)}
              />

              <Text style={styles.label}>Established:</Text>
              <TextInput
                style={styles.input}
                value={values.established}
                onChangeText={(text) => handleInputChange("established", text)}
              />

              <View style={styles.button}>
                <Pressable onPress={updatePark}>
                  <Text style={styles.buttonText}>Update Park</Text>
                </Pressable>
              </View>

              <View style={styles.button}>
                <Pressable onPress={deletePark}>
                  <Text style={styles.buttonText}>Delete Park</Text>
                </Pressable>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </AppWrapper>
  );
}

export default Park;
