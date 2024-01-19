import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Touchable } from "react-native";

export default function Setpassword(props) {
  const { cancel, done } = props

  return (
    <SafeAreaView style={styles.box}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.setPasswordBox}>
          <Text style={styles.setPasswordHeader}>Set your password</Text>

          <View style={styles.inputs}>
            <TextInput style={styles.input} placeholder="Enter a password"/>
            <TextInput style={styles.input} placeholder="Confirm your password"/>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={() => cancel()}>
              <Text style={styles.buttonHeader}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => done()}>
              <Text style={styles.buttonHeader}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  box: { height: '100%', width: '100%' },
  setPasswordBox: { marginHorizontal: '10%', width: '80%' },
  setPasswordHeader: { fontSize: 30, fontWeight: 'bold', marginTop: '20%' },

  inputs: { },
  input: { borderRadius: 5, borderStyle: 'solid', borderWidth: 4, fontSize: 20, marginTop: 20, padding: 10 },

  buttons: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  button: { alignItems: 'center', backgroundColor: 'black', borderRadius: 10, marginVertical: '5%', padding: 10, width: 100 },
  buttonHeader: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
})
