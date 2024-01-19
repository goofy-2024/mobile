import { useEffect, useState } from "react";
import { 
  SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, StyleSheet, 
  Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Iconify } from 'react-native-iconify';

const { width, height } = Dimensions.get('window')

export default function Auth() {
  return (
    <LinearGradient
      colors={['#938EFF', '#7E9FFF', '#37C9FF']}
      start={{ x: 0.1, y: 0.1 }}
      style={{ height: '100%', width: '100%' }}
    >
      <SafeAreaView style={{ flex: 1, height: '100%', width: '100%' }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.box}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
              <View style={{ flexDirection: 'column', height: '50%', justifyContent: 'space-around' }}>
                <View>
                  <Image source={require("../../assets/auth-title.png")} style={{ height: 80, marginLeft: (width - 80) / 2, width: 80 }}/>
                  <Text style={styles.header}>Goofy</Text>
                </View>
              </View>

              <View style={styles.authBox}>
                <Text style={styles.authHeader}>REGISTER/LOGIN</Text>

                <View style={styles.authInputContainer}>
                  <Text style={styles.authInputHeader}>Username:</Text>
                  <View style={styles.authInputValueHolder}>
                    <View style={styles.column}><Iconify icon="ic:outline-email" size={30}/></View>
                    <TextInput style={styles.authInputValue} maxLength={50} placeholder="Enter phone number"/>
                  </View>
                </View>

                <View style={styles.authInputContainer}>
                  <Text style={styles.authInputHeader}>Password:</Text>
                  <View style={styles.authInputValueHolder}>
                    <View style={styles.column}><Iconify icon="mdi:password-outline" size={30}/></View>
                    <TextInput style={styles.authInputValue} maxLength={50} secureTextEntry placeholder="Enter password"/>
                  </View>
                </View>

                <TouchableOpacity style={styles.authButton}>
                  <Text style={styles.authButtonHeader}>LOGIN</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  box: { flexDirection: 'column', height: '100%', justifyContent: 'space-around', width: '100%' },
  header: { fontFamily: 'DeliusSwashCaps', fontSize: 50, textAlign: 'center' },

  authBox: { alignItems: 'center', height: '50%' },
  authHeader: { fontSize: 25, fontWeight: '100', textAlign: 'center' },

  authInputContainer: { marginBottom: 20, marginHorizontal: '5%', borderBottomWidth: 1, borderStyle: 'solid', width: '90%' },
  authInputHeader: { fontSize: 20, fontWeight: '100' },
  authInputValueHolder: { flexDirection: 'row', width: '100%' },
  authInputValue: { padding: 10, width: '80%' },

  authButton: { backgroundColor: 'white', borderRadius: 35, padding: 20, width: '50%' },
  authButtonHeader: { fontSize: 15, fontWeight: 'bold', textAlign: 'center' },

  column: { flexDirection: 'column', justifyContent: 'space-around' },
})
