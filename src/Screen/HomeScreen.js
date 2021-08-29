import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import axios from "axios";

export default function HomeScreen({ navigation }) {
  const [data, setDate] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/products")
      .then((req) => setDate(req.data))
      .catch((error) => console.log("error" + error));
  }, [isFocused]);

  return (
    <ScrollView
      style={{ paddingTop: 10, backgroundColor: "#fff", paddingBottom: 20 }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#61B329" }]}
          onPress={() =>
            navigation.navigate("Details", {
              itemId: 0,
            })
          }
        >
          <Text style={{ color: "#fff" }}>Criar um Novo Item</Text>
        </TouchableOpacity>
        {data.map((item) => {
          return (
            <View
              key={item.id}
              style={{
                borderRadius: 10,
                backgroundColor: "#eee",
                width: "90%",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <View>
                <Image
                  source={{
                    uri: item.imgUrl ? item.imgUrl : null,
                  }}
                  style={{
                    height: 200,
                    width: 200,
                  }}
                  resizeMode={"contain"}
                />
              </View>
              <View style={{ padding: 10, width: 155 }}>
                <Text style={{ color: "#777", paddingTop: 5 }}>
                  {item.description}
                </Text>
                <Text>Tipo: {item.category}</Text>
                <Text>Valor: {item.price}</Text>
              </View>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#0000FF" }]}
                onPress={() =>
                  navigation.navigate("Details", {
                    itemId: item.id,
                  })
                }
              >
                <Text style={{ color: "#fff" }}>Editar</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "90%",
    height: 40,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
