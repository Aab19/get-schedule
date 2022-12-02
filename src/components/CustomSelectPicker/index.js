import React from 'react'
import {Platform, StyleSheet} from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import {IconChevronDown} from '../../assets/img/icons'
import {fonts, gstyles, theme} from '../../utils/styles'

const CustomSelectPicker = ({label, listValues, onValueChange}) => {
  return (
    <RNPickerSelect
      placeholder={{label: label, value: null}}
      onValueChange={onValueChange}
      items={listValues}
      style={customPickerStyles}
      useNativeAndroidPickerStyle={false}
      Icon={() => {
        return (
          <IconChevronDown
            style={{top: Platform.OS == 'android' ? 20 : 41, right: 8}}
          />
        )
      }}
    />
  )
}

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    marginTop: 8,
    fontSize: 14,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: theme.textColorPrimary,
    borderColor: '#E5E5E5',
    borderWidth: 2,
    paddingRight: 30,
  },
  inputAndroid: {
    marginTop: 8,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F4F4F4',
    borderRadius: 6,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: theme.textColorPrimary,
    borderColor: '#E5E5E5',
    borderWidth: 2,
    paddingRight: 30,
  },

  img: {
    width: '100%',
  },
})

export default CustomSelectPicker
