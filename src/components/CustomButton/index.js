import React from 'react'
import {TouchableOpacity} from 'react-native'
import {IconPlus} from '../../assets/img/icons'
import TextView from '../TextView'

const CustomButton = ({
  text,
  containerClass,
  customClass,
  customStyle,
  outline,
  disabled,
  addIcon,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled ? true : false}
      className={` ${
        outline ? 'border-[1px] border-[#F63E7C]' : 'bg-[#D9019C]'
      }  rounded-full justify-center items-center py-3 ${
        disabled && 'bg-[#D9019C] opacity-20'
      } ${addIcon && 'flex-row'} ${containerClass}`}>
      {addIcon && <IconPlus style={{marginRight: 12, marginTop: -4}} />}
      <TextView
        customClass={`${
          outline ? 'text-[#F63E7C]' : 'text-white'
        }  text-[16px] ${customClass}`}
        customStyle={customStyle}
        content={text}
      />
    </TouchableOpacity>
  )
}

export default CustomButton
