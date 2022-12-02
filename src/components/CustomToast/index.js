import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import Toast from 'react-native-toast-message'
import {gstyles, theme} from '../../utils/styles'
import TextView from '../TextView'

const toastConfig = {
  mcvToast: ({props}) => (
    <View
      style={[
        Platform.OS == 'ios' ? styles.cardContainerIOS : styles.cardContainer,
      ]}
      className="bg-white w-11/12 rounded-[4px] z-[99] flex-row">
      <View
        className={`h-full w-[6px]  ${
          props.error ? 'bg-[#F00073]' : 'bg-[#66bb6a]'
        } rounded-tl-[4px] rounded-bl-[4px]`}></View>
      <View className="py-3 px-5 ">
        <TextView
          content={props.title}
          customClass={`${props.error ? 'text-[#F00073]' : 'text-[#66bb6a]'}`}
          customStyle={gstyles.typefaceBold}
        />
        <TextView
          content={props.desc}
          customClass={`mt-[2px] ${
            props.error ? 'text-[#F00073]' : 'text-[#66bb6a]'
          }`}
          customStyle={gstyles.typefaceMedium}
        />
      </View>
    </View>
  ),
}

const CustomToast = () => {
  const [showHide, setShowHide] = useState(false)

  return (
    <View
      className={`absolute z-[999] bottom-[-30] w-full ${
        showHide ? 'flex' : 'hidden'
      }`}>
      <Toast
        config={toastConfig}
        onShow={() => setShowHide(true)}
        onHide={() => setShowHide(false)}
      />
    </View>
  )
}

export const toast = Toast
export default CustomToast

const styles = StyleSheet.create({
  cardContainerIOS: {
    elevation: 8,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {width: -2, height: 4},
    shadowRadius: 3,
  },
  cardContainer: {
    elevation: 8,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {width: -2, height: 4},
    shadowRadius: 3,
  },
})
