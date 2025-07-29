import React from "react";
import { Text, TouchableOpacity } from "react-native";

const FloatingAddButton = ({ setModalVisible }) => {
  return (
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={{
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: "#007AFF",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
      }}
    >
      <Text style={{ color: "white", fontSize: 30 }}>＋</Text>
    </TouchableOpacity>
  );
};

export default FloatingAddButton;
