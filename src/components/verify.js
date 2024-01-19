// modal auth screen

import { useEffect, useState, useRef } from "react";
import { ActivityIndicator, SafeAreaView, View, Text, TextInput, StyleSheet } from "react-native";

export default function Verify(props) {
  const { phoneNumber, register } = props
  const [codeInput, setCodeinput] = useState(['', '', '', ''])
  const [focusIndex, setFocusindex] = useState(0)
  const [confirming, setConfirming] = useState(false)

  const inputOne = useRef(null)
  const inputTwo = useRef(null)
  const inputThree = useRef(null)
  const inputFour = useRef(null)

  useEffect(() => {
    let empty = false

    codeInput.forEach(function (info) {
      if (!info) {
        empty = true
      }
    })

    if (!empty) {
      setConfirming(true)
      register()
    }
  }, [codeInput])

  return (
    <SafeAreaView style={styles.box}>
      <View style={styles.verifyBox}>
        <Text style={styles.verifyHeader}>Verification</Text>

        <Text style={styles.verifyMiniHeader}>
          Enter the code sent to{'\n'}
          <Text style={{ fontWeight: 'bold' }}>{phoneNumber}</Text>
        </Text>

        <View style={[styles.inputs, { opacity: confirming ? 0.5 : 1 }]}>
          {codeInput.map((info, index) => (
            <TextInput 
              key={"code-" + index}
              style={[styles.input, { borderColor: focusIndex == index ? 'rgba(10, 113, 223, 1)' : 'transparent' }]} 
              maxLength={1} 
              ref={r => {
                switch (index) {
                  case 0:
                    inputOne.current = r

                    break;
                  case 1:
                    inputTwo.current = r

                    break;
                  case 2:
                    inputThree.current = r

                    break;
                  default:
                    inputFour.current = r
                }
              }}
              onKeyPress={({ nativeEvent: { key: digit }}) => {
                const newCodeinput = [...codeInput]

                if (digit.charCodeAt(0) >= 48 && digit.charCodeAt(0) <= 58) {
                  newCodeinput[index] = digit

                  setCodeinput(newCodeinput)

                  switch (index) {
                    case 0:
                      inputTwo.current.focus()

                      break;
                    case 1:
                      inputThree.current.focus()

                      break;
                    case 2:
                      inputFour.current.focus()

                      break;
                  }

                  if (index < 3) {
                    setFocusindex(index + 1)
                  }
                } else if (digit == "Backspace") {
                  if (index > 0) {
                    if (info) {
                      newCodeinput[index] = ""

                      setFocusindex(index)
                    } else {
                      newCodeinput[index - 1] = ""

                      switch (index) {
                        case 0:
                        case 1:
                          inputOne.current.focus()

                          break;
                        case 2:
                          inputTwo.current.focus()
    
                          break;
                        case 3:
                          inputThree.current.focus()

                          break;
                      }

                      setFocusindex(index - 1)
                    }

                    setCodeinput(newCodeinput)
                  }
                }
              }}
              autoFocus={index == 0}
              keyboardType="numeric"
              value={info}
            />
          ))}
        </View>

        {confirming && (
          <View style={{ alignItems: 'center', marginTop: '10%', width: '100%' }}>
            <ActivityIndicator color="black" size="large"/>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  box: { height: '100%', width: '100%' },
  verifyBox: { marginHorizontal: '10%', width: '80%' },
  verifyHeader: { fontSize: 30, fontWeight: 'bold', marginTop: '20%' },
  verifyMiniHeader: { fontSize: 20, marginTop: 20 },

  inputs: { flexDirection: 'row', justifyContent: 'space-around', marginTop: '10%', width: '100%' },
  input: { backgroundColor: 'rgba(10, 113, 223, 0.3)', borderRadius: 10, borderStyle: 'solid', borderWidth: 3, fontSize: 30, padding: 10, textAlign: 'center', width: '15%' },
})
