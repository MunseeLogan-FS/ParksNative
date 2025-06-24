import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#2c5f2d", // fallback solid color
    // padding: 20,
  },
  header: {
    color: "#d4e09b",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#73996e",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "50%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  title: {
    color: "#d4e09b",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#b0c48c",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 5,
  },
  link: {
    color: "#aaeb55",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 5,
  },
  linkHover: {
    textDecorationLine: "underline",
  },
  form: {
    marginTop: 20,
  },
  label: {
    fontWeight: "500",
    color: "#cdd9b0",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.15)",
    color: "#f0f0e8",
    borderColor: "#768466",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },

  parkItem: {
    padding: 5,
    alignItems: "center",
  },
  parkName: {
    fontSize: 20,
    color: "#aaeb55",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
