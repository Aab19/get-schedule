import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {gstyles} from '../../utils/styles'
import TextView from '../TextView'

const CardBox = ({value, number, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-white justify-between p-4 w-[49%] rounded-[8px] mt-3 ${
        number % 2 == 0 ? '' : 'ml-2'
      }`}
      style={gstyles.boxShadow}
      onPress={onPress}>
      <TextView content={value.label} customStyle={gstyles.typefaceBold} />
      <TextView
        customClass={`${
          value.courseCount == 0 ? 'text-[14px]' : 'relative top-[4px]'
        }`}
        content={
          value.courseCount !== 0
            ? `${value.courseCount} Mata Kuliah`
            : 'Belum ada mata kuliah'
        }
        customStyle={[
          value.courseCount !== 0 ? gstyles.secondaryText : gstyles.greyText,
        ]}
        ellipsis={'tail'}
        lines={1}
      />
    </TouchableOpacity>
  )
}

export default CardBox
