import { useEffect, useState } from "react";
import { Dimensions, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window')
const videoSize = width / 3

export default function Profile() {
  const [videos, setVideos] = useState([
    { key: "video-row-1", list: [
      {
        key: "video-0-1",

      }
    ] }
  ])
  
  return (
    <ScrollView>
      <View style={styles.box}>
        <View style={styles.profileHolder}>
          <Image source={require("../../assets/profile.png")} style={{ height: '100%', width: '100%' }}/>
        </View>
        <Text style={styles.username}>robogram</Text>

        <View style={styles.navs}>
          <TouchableOpacity style={styles.nav}>
            <Text style={styles.navValueHeader}>123</Text>
            <Text style={styles.navHeader}>Followings</Text>
          </TouchableOpacity>
          <View style={styles.navDiv}/>
          <TouchableOpacity style={styles.nav}>
            <Text style={styles.navValueHeader}>123</Text>
            <Text style={styles.navHeader}>Followers</Text>
          </TouchableOpacity>
          <View style={styles.navDiv}/>
          <TouchableOpacity style={styles.nav}>
            <Text style={styles.navValueHeader}>123</Text>
            <Text style={styles.navHeader}>Likes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.videos}>
          <View style={styles.videosRow}>
            <TouchableOpacity style={styles.video} onPress={() => {}}>
              <View style={styles.videoActions}>

              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.video} onPress={() => {}}>
              <View style={styles.videoActions}>

              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.video} onPress={() => {}}>
              <View style={styles.videoActions}>

              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.videosRow}>
            <TouchableOpacity style={styles.video} onPress={() => {}}>
              <View style={styles.videoActions}>

              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.video} onPress={() => {}}>
              <View style={styles.videoActions}>

              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.video} onPress={() => {}}>
              <View style={styles.videoActions}>

              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.videosRow}>
            <TouchableOpacity style={styles.video} onPress={() => {}}>
              <View style={styles.videoActions}>

              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.video} onPress={() => {}}>
              <View style={styles.videoActions}>

              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.video} onPress={() => {}}>
              <View style={styles.videoActions}>

              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.videosRow}>
            <TouchableOpacity style={styles.video} onPress={() => {}}>
              <View style={styles.videoActions}>

              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.video} onPress={() => {}}>
              <View style={styles.videoActions}>

              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  box: { alignItems: 'center', height: '100%', width: '100%' },
  profileHolder: { borderRadius: 100, height: 200, marginTop: '10%', overflow: 'hidden', width: 200 },
  username: { fontSize: 20, textAlign: 'center' },

  navs: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: '10%', width: '100%' },
  nav: { alignItems: 'center', width: '33%' },
  navValueHeader: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  navHeader: { textAlign: 'center' },
  navDiv: { backgroundColor: 'black', borderRadius: 5, height: '80%', width: 5 },

  videos: { },
  videosRow: { flexDirection: 'row', width: '100%' },
  video: { alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)', height: videoSize, opacity: 0.5, width: videoSize },
  videoActions: { backgroundColor: 'rgba(255, 255, 255, 0.2)', bottom: 0, borderRadius: 20, height: 30, position: 'absolute', width: videoSize * 0.9 },

  column: { flexDirection: 'column', justifyContent: 'space-around' },
})
