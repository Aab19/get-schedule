import React from 'react'
import {Text} from 'react-native'
import {theme} from '../../utils/styles'

const TextView = ({
  customClass,
  customStyle,
  lines,
  ellipsis,
  content,
  enablePress,
  onPress = () => {},
}) => {
  return (
    <Text
      disabled={enablePress ? false : true}
      className={`font-['Poppins-Regular'] text-[16px] text-[#100720] ${customClass}`}
      style={customStyle}
      numberOfLines={lines}
      ellipsizeMode={ellipsis}
      onPress={onPress}>
      {content}
    </Text>
  )
}

export default TextView
