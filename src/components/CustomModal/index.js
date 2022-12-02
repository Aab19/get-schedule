import React from 'react'
import {Modal, TouchableOpacity, View} from 'react-native'
import {IconAlert, IconCloseButton} from '../../assets/img/icons'
import {gstyles} from '../../utils/styles'
import CustomButton from '../CustomButton'
import CustomInput from '../CustomInput'
import CustomSelectPicker from '../CustomSelectPicker'
import TextView from '../TextView'

const CustomModal = ({
  labelTitle,
  visible,
  value,
  dayHidden,
  onChangeText,
  onValueChange,
  onSubmit,
  onLoading,
  onError,
  onRequestClose = () => {},
  onCloseModal,
}) => {
  const listDays = [
    {label: 'Senin', value: 'monday'},
    {label: 'Selasa', value: 'tuesday'},
    {label: 'Rabu', value: 'wednesday'},
    {label: 'Kamis', value: 'thursday'},
    {label: 'Jumat', value: 'friday'},
  ]

  return (
    <View
      className={`${
        visible ? 'z-10' : 'z-[-1]'
      } absolute top-0 bottom-0 left-0 right-0 `}
      style={{
        backgroundColor: visible ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
      }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View className="relative h-full justify-center items-center p-6">
          <View className="bg-white w-full rounded-[8px]">
            <View className="flex-row justify-between items-center p-4 relative">
              <TextView
                content={labelTitle}
                customClass="text-[20px]"
                customStyle={gstyles.typefaceMedium}
              />
              <TouchableOpacity onPress={onCloseModal}>
                <IconCloseButton style={{marginTop: -4}} />
              </TouchableOpacity>
              <View className="h-px bg-[#E5E5E5] absolute bottom-0 left-0 right-0"></View>
            </View>
            <View className="p-4">
              <TextView
                content="Mata Kuliah"
                customClass=""
                customStyle={gstyles.typefaceBold}
              />
              <CustomInput
                value={value}
                placeholder="Masukkan Mata Kuliah"
                customClass="mt-2"
                onChangeText={onChangeText}
                error={onError && onError.courseStudy}
              />

              {!dayHidden && (
                <View className="relative">
                  <TextView
                    content="Pilih Hari"
                    customClass="mt-6"
                    customStyle={gstyles.typefaceBold}
                  />

                  <CustomSelectPicker
                    label="Pilih Hari"
                    listValues={listDays}
                    onValueChange={onValueChange}
                  />
                  {onError && onError.courseDay && (
                    <View className="flex-row mt-[2px]">
                      <IconAlert style={{position: 'absolute', bottom: -20}} />
                      <TextView
                        content={onError.courseDay}
                        customClass="absolute bottom-[-26px] left-6"
                        customStyle={gstyles.errorText}
                      />
                    </View>
                  )}
                </View>
              )}
            </View>

            <View className="flex flex-row justify-end p-4 w-full relative">
              <View className="h-px bg-[#E5E5E5] absolute top-3 left-0 right-0"></View>
              <CustomButton
                text={onLoading ? 'Creating...' : 'Simpan'}
                containerClass={`p-2 px-6 mt-3 ${onLoading && 'opacity-20'}`}
                customStyle={gstyles.typefaceBold}
                onPress={onSubmit}
              />
            </View>
          </View>
        </View>
      </Modal>
      <TextView />
    </View>
  )
}

export default CustomModal
