import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {IconBackButton} from '../../assets/img/icons'
import {gstyles} from '../../utils/styles'
import CustomButton from '../CustomButton'
import TextView from '../TextView'

const Navbar = ({title, buttonText, backPress, onBackPress, logout}) => {
  return (
    <View className="flex flex-row bg-[#3A0B48] p-3 justify-between items-center">
      {backPress && (
        <TouchableOpacity onPress={onBackPress}>
          <IconBackButton
            style={{marginLeft: 16, marginTop: -4, flexGrow: 0}}
          />
        </TouchableOpacity>
      )}

      <TextView
        content={title}
        customStyle={[gstyles.whiteText, gstyles.typefaceBold]}
        customClass="flex-none ml-2 text-[20px] w-[20%]"
        ellipsis="tail"
        lines={1}
      />
      <CustomButton
        text={buttonText}
        containerClass="flex-initial w-[75%] rounded-[14px] py-2 px-1 ml-2"
        customClass="text-[14px]"
        customStyle={gstyles.typefaceBold}
        onPress={logout}
      />
    </View>
  )
}

export default Navbar
