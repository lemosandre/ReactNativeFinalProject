import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import axios from "axios";

export default function DetailsScreen({ route, navigation }) {
  const { itemId } = route.params;
  const [name, onChangeName] = useState();
  const [code, onChangeCode] = useState();
  const [type, onChangeType] = useState();
  const [number, onChangeNumber] = useState();
  const [url, onChangeUrl] = useState();

  useEffect(() => {
    if (itemId != 0) {
      axios
        .get("http://127.0.0.1:3000/products/" + JSON.stringify(itemId))
        .then((req) => {
          let data = req.data;
          onChangeName(data.description);
          onChangeType(data.category);
          onChangeNumber(data.price);
          onChangeUrl(data.imgUrl);
          onChangeCode(data.code);
        })
        .catch((error) => console.log("error" + error));
    }
  }, []);

  const createProduct = () => {
    if (!name == "") {
      axios
        .get("http://127.0.0.1:3000/products")
        .then((req) => {
          axios
            .post("http://127.0.0.1:3000/products", {
              id: req.data.length + 1,
              code: "111" + req.data.length + 1,
              description: name,
              price: number,
              category: type,
              imgUrl: url,
            })
            .then(() => {
              alert("Criado");
              navigation.navigate("Home");
            })
            .catch(() => alert("Error"));
        })
        .catch((error) => console.log("error" + error));
    }
  };

  const updateProduct = () => {
    if (!name == "") {
      axios
        .patch("http://127.0.0.1:3000/products/" + +JSON.stringify(itemId), {
          code: code,
          description: name,
          price: number,
          category: type,
          imgUrl: url,
        })
        .then(() => {
          alert("Editado");
          navigation.navigate("Home");
        })
        .catch(() => alert("Error"));
    }
  };

  const deleteProduct = () => {
    axios
      .delete("http://127.0.0.1:3000/products/" + JSON.stringify(itemId))
      .then(() => {
        alert("Deletado");
        navigation.navigate("Home");
      })
      .catch(() => alert("Error"));
  };

  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: 50 }}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeType}
        value={type}
        placeholder="Tipo"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Valor"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeUrl}
        value={url}
        placeholder="Image URL"
      />
      {itemId != 0 ? (
        <View style={{ width: "100%", alignItems: "center" }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#0000FF" }]}
            onPress={updateProduct}
          >
            <Text style={{ color: "#fff" }}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FF0000" }]}
            onPress={deleteProduct}
          >
            <Text style={{ color: "#fff" }}>Deletar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#61B329" }]}
          onPress={createProduct}
        >
          <Text style={{ color: "#fff" }}>Criar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "90%",
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
