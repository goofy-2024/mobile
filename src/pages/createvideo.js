import { useEffect, useState, useRef } from "react";
import { ActivityIndicator, Platform, Dimensions, SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, Modal, ScrollView } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { Iconify } from 'react-native-iconify';
import Pie from 'react-native-pie'
import { Audio } from 'expo-av';
import { music } from "../../assets/music"

const { width, height } = Dimensions.get('window')

export default function Createvideo({ navigation }) {
  const [permissions, setPermissions] = useState({ camera: false, audio: false })
  const [type, setType] = useState('back')
  const [flashOn, setFlashon] = useState(false)
  const [sound, setSound] = useState(null)
  const camera = useRef(null)
  const device = useCameraDevice(type);
  const [recordStatus, setRecordstatus] = useState(0)
  const [firstStart, setFirststart] = useState(false)
  const [recording, setRecording] = useState(false)
  const [selectedMusic, setSelectedmusic] = useState(null)
  const [media, setMedia] = useState({ show: false, name: '', width: 0, height: 0 })
  const timer = useRef(null)

  // hiddens
  const [musicList, setMusiclist] = useState({ show: false, list: [...music] })

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
    const photo = await camera.current.takePhoto({
      qualityPrioritization: 'speed',
      flash: 'off',
      enableShutterSound: false
    })
    let path = photo.path, width = photo.height, height = photo.width
    let cropy = 0, uri = Platform.OS == "ios" ? path : `file://${path}`
    let options = []

    console.log(photo)
  }
  const selectMusic = index => {
    setSelectedmusic(music[index])
    setMusiclist({ ...musicList, show: false })
  }
  const playMusic = async index => {
    const newList = [...musicList.list]
    
    // show loading music
    newList[index]["loading"] = true
    setMusiclist({ ...musicList, list: newList })

    const { sound } = await Audio.Sound.createAsync(musicList.list[index].mp3)

    delete newList[index]["loading"]
    newList[index]["play"] = true

    setMusiclist({ ...musicList, list: newList })
    setSound(sound)

    await sound.playAsync();
  }
  const stopMusic = async index => {
    const newList = [...musicList.list]

    delete newList[index]["play"]

    setMusiclist({ ...musicList, list: newList })

    sound.unloadAsync()

    setSound(null)
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
      photo video audio
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

            <TouchableOpacity style={styles.addMusic} onPress={() => setMusiclist({ ...musicList, show: true })}>
              <Iconify icon="tabler:music" size={30} color="white"/>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {musicList.show && (
        <Modal transparent animationType="slide">
          <View style={styles.hiddenBox}>
            {musicList.show && (
              <View style={styles.musicSelectionBox}>
                <TouchableOpacity style={styles.musicSelectionClose} onPress={() => setMusiclist({ ...musicList, show: false })}>
                  <Iconify icon="mingcute:close-fill" color="black" size={'100%'}/>
                </TouchableOpacity>

                <Text style={styles.musicSelectionHeader}>Select music for goofy video</Text>

                <ScrollView style={styles.musicSelectionList}>
                  {musicList.list.map((info, index) => (
                    <TouchableOpacity style={styles.musicSelectionItem} key={"music-" + index} onPress={() => selectMusic(index)}>
                      <View style={styles.musicSelectionItemImage}>
                        <Image style={{ height: '100%', width: '100%' }} source={info.image}/>
                      </View>
                      <Text style={styles.musicSelectionItemHeader}>{info.title}</Text>

                      {info.loading ? 
                        <View style={styles.musicSelectionMediaToggle}>
                          <ActivityIndicator size={'100%'} color="black"/>
                        </View>
                        :
                        <TouchableOpacity style={styles.musicSelectionMediaToggle} onPress={() => {
                          if (!info.play) {
                            playMusic(index)
                          } else {
                            stopMusic(index)
                          }
                        }}>
                          {info.play ? 
                            <Iconify icon="zondicons:pause" color="black" size={"100%"}/>
                            :
                            <Iconify icon="mdi:play" color="black" size={'100%'}/>
                          }
                        </TouchableOpacity>
                      }
                      
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </Modal>
      )}

      {media.show && (
        <Modal transparent>
          <View style={styles.selectedMediaBox}>

          </View>
        </Modal>
      )}
    </Camera>
  )
}

const styles = StyleSheet.create({
  box: { height: '100%', width: '100%' },
  createVideo: { alignItems: 'center', flexDirection: 'column', height: '100%', justifyContent: 'space-between', width: '100%' },

  topNavs: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', width: '100%' },
  topNavsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  topNav: { marginHorizontal: '5%' },

  bottomNavs: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: '25%', width: '50%' },
  recordingTouch: { alignItems: 'center', borderColor: 'white', borderRadius: 40, borderStyle: 'solid', borderWidth: 3, height: 80, justifyContent: 'center', width: 80 },
  recordingKnob: { backgroundColor: 'white', borderRadius: 40, height: 60, marginTop: 10, position: 'absolute', width: 60 },
  recordTouch: { alignItems: 'center', borderColor: 'white', borderRadius: 40, borderStyle: 'solid', borderWidth: 8, height: 80, justifyContent: 'center', width: 80 },
  recordKnob: { backgroundColor: 'white', borderRadius: 40, height: '95%', width: '95%' },

  // hiddens
  hiddenBox: { backgroundColor: 'rgba(0, 0, 0, 0.7)', flexDirection: 'column-reverse', height: '100%', justifyContent: 'space-between', width: '100%' },

  // music selection box
  musicSelectionBox: { backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50, height: '85%', width: '100%' },
  musicSelectionClose: { height: 30, marginLeft: width - 50, marginTop: 20, width: 30 },
  musicSelectionHeader: { fontFamily: 'DeliusSwashCaps', fontSize: 20, marginBottom: 20, textAlign: 'center' },
  musicSelectionList: { height: '100%', width: '100%' },
  musicSelectionItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingHorizontal: 10 },
  musicSelectionItemImage: { borderRadius: 25, height: 50, overflow: 'hidden', width: 50 },
  musicSelectionItemHeader: { fontSize: 15, paddingRight: 10, width: width - 105 },
  musicSelectionMediaToggle: { borderRadius: 15, borderStyle: 'solid', borderWidth: 1, height: 30, width: 30 },

  // selected media box
  selectedMediaBox: { backgroundColor: 'white', height: '100%', width: '100%' },
})
