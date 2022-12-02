import React, {useState} from 'react'
import {Platform, TextInput, View} from 'react-native'
import {IconAlert} from '../../assets/img/icons'
import {gstyles, theme} from '../../utils/styles'
import TextView from '../TextView'

const CustomInput = ({
  text,
  changeText,
  placeholder,
  containerClass,
  customClass,
  customStyle,
  type,
  error,
  password,
  maxLength,
  onFocus = () => {},
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(password)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View className={`relative ${containerClass}`}>
      <TextInput
        autoCorrect={false}
        onFocus={() => {
          onFocus()
          setIsFocused(true)
        }}
        onBlur={() => {
          setIsFocused(false)
        }}
        className={`font-['Poppins-Regular'] text-[16px] text-[#100720] bg-[#F4F4F4] px-4 ${
          Platform.OS == 'ios' ? 'py-3' : 'py-2'
        } pr-12 rounded-[8px] ${
          isFocused ? 'border-2 border-[#D9019C]' : 'border-2 border-[#E5E5E5]'
        } ${customClass}`}
        customStyle={customStyle}
        onChangeText={changeText}
        value={text}
        placeholder={placeholder}
        placeholderTextColor={theme.textColorHint}
        maxLength={maxLength ? maxLength : 255}
        secureTextEntry={showPassword}
        {...props}
      />
      {error && (
        <View className="flex-row mt-[2px]">
          <IconAlert style={{position: 'absolute', bottom: -20}} />
          <TextView
            content={error}
            customClass="absolute bottom-[-26px] left-6"
            customStyle={gstyles.errorText}
          />
        </View>
      )}
    </View>
  )
}

export default CustomInput
