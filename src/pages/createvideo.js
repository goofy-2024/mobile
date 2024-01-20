import { useEffect, useState, useRef } from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { Iconify } from 'react-native-iconify';

export default function Createvideo({ navigation }) {
  const [permissions, setPermissions] = useState({ camera: false, audio: false })
  const [type, setType] = useState('back')
  const camera = useRef(null)
  const device = useCameraDevice(type)

  useEffect(() => {
    const initialize = async() => {
      const cameraPermission = Camera.getCameraPermissionStatus()
      const microphonePermission = Camera.getMicrophonePermissionStatus()
      let camera = false, audio = false

      if (cameraPermission != "granted") {
        try {
          const newCamerapermission = await Camera.requestCameraPermission()

          camera = newCamerapermission == "granted"
        } catch(e) {
          alert(e.message)
          camera = false
        }
      } else {
        camera = true
      }

      if (microphonePermission != "granted") {
        const newMicrophonepermission = await Camera.requestMicrophonePermission()

        audio = newMicrophonepermission == "granted"
      } else {
        audio = true
      }

      setPermissions({ ...permissions, camera, audio })
    }

    initialize()
  }, [])

  return (
    <Camera
      style={{ height: '100%', width: '100%' }}
      ref={camera}
      device={device}
      isActive
    >
      <SafeAreaView style={styles.box}>
        <View style={styles.createVideo}>
          <View style={styles.topNavs}>
            <TouchableOpacity style={styles.topNav} onPress={() => navigation.goBack()}>
              <Iconify icon="octicon:x-12" size={30}/>
            </TouchableOpacity>

            <View style={styles.topNavsRow}>
              <TouchableOpacity style={styles.topNav} onPress={() => {}}>
                <Iconify icon="mdi:flash" size={30}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.topNav} onPress={() => setType(type == 'front' ? 'back' : 'front')}>
                <Iconify icon="eva:flip-2-outline" size={30}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomNavs}>
            <TouchableOpacity style={styles.bottomNav}>
              <View style={styles.knob}/>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Camera>
  )
}

const styles = StyleSheet.create({
  box: { height: '100%', width: '100%' },
  createVideo: { alignItems: 'center', flexDirection: 'column', height: '100%', justifyContent: 'space-between', width: '100%' },

  topNavs: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', width: '100%' },
  topNavsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  topNav: { marginHorizontal: '5%' },

  bottomNavs: { alignItems: 'center', width: '100%' },
  bottomNav: { alignItems: 'center', borderColor: 'white', borderRadius: 40, borderStyle: 'solid', borderWidth: 3, height: 80, justifyContent: 'center', width: 80 },
  knob: { backgroundColor: 'white', borderRadius: 40, height: '95%', width: '95%' },
})
