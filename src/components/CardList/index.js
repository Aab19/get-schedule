import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {IconDeleteButton, IconEditButton} from '../../assets/img/icons'
import {gstyles} from '../../utils/styles'
import TextView from '../TextView'

const CardList = ({value, onEditCourse, onDeleteCourse}) => {
  return (
    <View
      className={`bg-white py-4 px-6 flex-row justify-between rounded-[12px] mt-4`}
      style={gstyles.boxShadow}>
      <View className="w-[70%]">
        <TextView
          content={value.title}
          customStyle={gstyles.typefaceBold}
          ellipsis="tail"
          lines={1}
        />
      </View>
      <View className="flex-row">
        <TouchableOpacity onPress={onEditCourse}>
          <IconEditButton />
        </TouchableOpacity>
        <TouchableOpacity className="ml-5" onPress={onDeleteCourse}>
          <IconDeleteButton />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CardList
