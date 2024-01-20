import { useEffect, useState } from "react";
import { 
  Dimensions, SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, 
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Iconify } from 'react-native-iconify';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window')

export default function Videos({ navigation }) {
  const [viewType, setViewtype] = useState('')

  const logout = async() => {
    setViewtype('')

    try {
      await AsyncStorage.clear()

      navigation.reset({
        index: 0,
        routes: [{ name: 'auth' }]
      })
    } catch(e) {

    }
  }

  return (
    <LinearGradient 
      colors={['transparent', 'black']}
      start={{ x: 0, y: 0 }}
    >
      <View style={styles.box}>
        <View style={styles.videosBox}>

        </View>
        <SafeAreaView style={styles.navsContainer}>
          <View style={styles.navs}>
            <View style={styles.navsRow}>
              <TouchableOpacity style={styles.nav} onPress={() => setViewtype('home')}>
                {viewType == 'home' ? 
                  <Iconify color="#0A71DF" icon="majesticons:home" size={35}/>
                  :
                  <Iconify color="#0A71DF" icon="majesticons:home-line" size={35}/>
                }
              </TouchableOpacity>
              <TouchableOpacity style={styles.nav} onPress={() => setViewtype('search')}>
                {viewType == 'search' ? 
                  <Iconify color="#0A71DF" icon="bxs:search" size={35}/>
                  :
                  <Iconify color="#0A71DF" icon="bx:search" size={35}/>
                }
              </TouchableOpacity>
              <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate("createvideo")}>
                <Text style={styles.createButtonHeader}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nav} onPress={() => setViewtype('profile')}>
                {viewType == 'profile' ? 
                  <Iconify color="#0A71DF" icon="iconamoon:profile-circle-fill" size={35}/>
                  :
                  <Iconify color="#0A71DF" icon="iconamoon:profile-circle-light" size={35}/>
                }
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>

      {viewType == "profile" && (
        <Modal transparent>
          <TouchableWithoutFeedback onPress={() => setViewtype('')}>
            <View style={styles.modal}>
              <SafeAreaView>
                <View style={styles.profileBox}>
                  <View style={styles.profileHolder}>
                    <Image source={require("../../assets/profile.png")} style={{ height: '100%', width: '100%' }}/>
                  </View>

                  <View style={styles.profileOptions}>
                    <TouchableOpacity style={styles.profileOption} onPress={() => {
                      setViewtype('')

                      navigation.navigate("profile")
                    }}>
                      <View style={styles.column}>
                        <Iconify icon="solar:pen-outline" size={20}/>
                      </View>
                      <Text style={styles.profileOptionHeader}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileOption} onPress={() => logout()}>
                      <View style={styles.column}>
                        <Iconify icon="ic:twotone-logout" size={20}/>
                      </View>
                      <Text style={styles.profileOptionHeader}>Log-Out</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  box: { height: '100%', width: '100%' },
  videosBox: { backgroundColor: 'lightblue', height: '100%', width: '100%' },

  navsContainer: { backgroundColor: 'rgba(255, 255, 255, 0.3)', bottom: 0, borderTopLeftRadius: 100, borderTopRightRadius: 100, height: 80, position: 'absolute', width },
  navs: { flexDirection: 'row', height: '100%', justifyContent: 'space-around', width: '100%' },
  navsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  nav: { marginHorizontal: '5%', marginVertical: 5 },
  createButton: { alignItems: 'center', backgroundColor: 'white', borderRadius: 25, height: 47, marginTop: -10, padding: 3, width: 48 },
  createButtonHeader: { color: '#0A71DF', fontSize: 30, textAlign: 'center' },

  // hidden
  modal: { backgroundColor: 'rgba(0, 0, 0, 0.7)', height: '100%', width: '100%' },
  profileBox: { alignItems: 'center', backgroundColor: 'white', height: '80%', marginLeft: width - 150, marginVertical: '10%', width: 150 },
  profileHolder: { borderRadius: 40, height: 80, marginTop: 10, overflow: 'hidden', width: 80 },
  profileOptions: { },
  profileOption: { flexDirection: 'row' },
  profileOptionHeader: { fontWeight: 'bold', paddingVertical: 10 },

  column: { flexDirection: 'column', justifyContent: 'space-around' },
})
