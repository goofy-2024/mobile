import { useEffect, useState, useRef } from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { Iconify } from 'react-native-iconify';
import Pie from 'react-native-pie'

export default function Createvideo({ navigation }) {
  const [permissions, setPermissions] = useState({ camera: false, audio: false })
  const [type, setType] = useState('back')
  const [flashOn, setFlashon] = useState(false)
  const camera = useRef(null)
  const device = useCameraDevice(type);
  const [recordStatus, setRecordstatus] = useState(0)
  const [firstStart, setFirststart] = useState(false)
  const [recording, setRecording] = useState(false)
  const timer = useRef(null)

  const counter = () => {
    setRecordstatus(prev => {
      if (prev > 100) {
        setRecording(false)
        stopRecord()

        return 100
      } else {
        return prev + 0.055
      }
    })
  }

  const startRecord = async() => {
    setRecording(true)
    setFirststart(true)

    camera.current.startRecording({
      onRecordingFinished: (video) => {
        setRecording(false)
        clearInterval(timer.current)
      },
      onRecordingError: (error) => console.error(error)
    })
    
    timer.current = setInterval(() => counter(), 50)
  }
  const stopRecord = async() => {
    setRecordstatus(0)

    await camera.current.stopRecording()
  }
  const takePhoto = async() => {
    alert("take photo")
  }

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
      video audio
    >
      <SafeAreaView style={styles.box}>
        <View style={styles.createVideo}>
          <View style={styles.topNavs}>
            <TouchableOpacity style={styles.topNav} onPress={() => navigation.goBack()}>
              <Iconify icon="octicon:x-12" size={30}/>
            </TouchableOpacity>

            <View style={styles.topNavsRow}>
              <TouchableOpacity style={styles.topNav} onPress={() => setFlashon(!flashOn)}>
                {flashOn ? 
                  <Iconify icon="mdi:flash-outline" size={30}/>
                  :
                  <Iconify icon="mdi:flash" size={30}/>
                }
              </TouchableOpacity>
              <TouchableOpacity style={styles.topNav} onPress={() => setType(type == 'front' ? 'back' : 'front')}>
                <Iconify icon="eva:flip-2-outline" size={30}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomNavs}>
            {recording ? 
              <TouchableOpacity 
                style={styles.recordingTouch} 
                onPress={() => {
                  if (!firstStart) {
                    stopRecord()
                  }

                  setFirststart(false)
                }}
              >
                <Pie
                  radius={40}
                  sections={[
                    { percentage: recordStatus, color: '#0A71DF' },
                    { percentage: (100 - recordStatus), color: 'white' }
                  ]}
                />
                <View style={styles.recordingKnob}/>
              </TouchableOpacity>
              :
              <TouchableOpacity 
                style={styles.recordTouch} 
                onLongPress={() => startRecord()}
                onPress={() => takePhoto()}
              >
                <View style={styles.recordKnob}/>
              </TouchableOpacity>
            }
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
  recordingTouch: { alignItems: 'center', borderColor: 'white', borderRadius: 40, borderStyle: 'solid', borderWidth: 3, height: 80, justifyContent: 'center', width: 80 },
  recordingKnob: { backgroundColor: 'white', borderRadius: 40, height: 60, marginTop: 10, position: 'absolute', width: 60 },
  recordTouch: { alignItems: 'center', borderColor: 'white', borderRadius: 40, borderStyle: 'solid', borderWidth: 8, height: 80, justifyContent: 'center', width: 80 },
  recordKnob: { backgroundColor: 'white', borderRadius: 40, height: '95%', width: '95%' },
})
