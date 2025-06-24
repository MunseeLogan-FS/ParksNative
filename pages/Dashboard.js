import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../components/Appstyles";
import AppWrapper from "../components/AppWrapper";

function Dashboard() {
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    name: "",
    location: "",
    area: "",
    established: "",
  });

  const navigation = useNavigation();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:3001/api/v1`
      : process.env.EXPO_PUBLIC_API_BASE;

  useEffect(() => {
    getParks();
  }, []);

  const getParks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/nationalParks`);
      const data = await res.json();
      setParks(data.data);
    } catch (err) {
      setError(err.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const createPark = async () => {
    try {
      await fetch(`${API_BASE}/nationalParks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ park: values }),
      });
      getParks();
    } catch (err) {
      setError(err.message || "Unexpected Error");
    }
  };

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <AppWrapper>
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <Text style={styles.header}>National Parks</Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Go to Home</Text>
          </Pressable>

          {loading ? (
            <ActivityIndicator size="large" color="#4a7c59" />
          ) : parks.length > 0 ? (
            parks.map((park) => (
              <TouchableOpacity
                key={park._id}
                style={styles.parkItem}
                onPress={() => navigation.navigate("Park", { id: park._id })}
              >
                <Text style={styles.parkName}>{park.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.parkName}>{error || "No parks found"}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={values.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={values.location}
            onChangeText={(text) => handleChange("location", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Area"
            keyboardType="numeric"
            value={values.area.toString()}
            onChangeText={(text) => handleChange("area", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Established eg 2000-01-01"
            value={values.established}
            onChangeText={(text) => handleChange("established", text)}
          />
          <Pressable style={styles.button} onPress={createPark}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </AppWrapper>
  );
}
export default Dashboard;
