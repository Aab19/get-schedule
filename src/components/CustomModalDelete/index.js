import React from 'react'
import {Modal, View} from 'react-native'
import {IconTrashCircle} from '../../assets/img/icons'
import {gstyles} from '../../utils/styles'
import CustomButton from '../CustomButton'
import TextView from '../TextView'

const CustomModalDelete = ({
  labelTitle,
  labelDesc,
  visible,
  onSubmit,
  onLoading,
  onError,
  onRequestClose = () => {},
  onCloseModal,
}) => {
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
          <View className="bg-white w-full p-6 justify-center items-center rounded-[8px]">
            <IconTrashCircle />
            <TextView
              content={labelTitle}
              customClass="text-[20px] mt-8"
              customStyle={gstyles.typefaceBold}
            />
            <TextView
              content={labelDesc}
              customClass="text-center"
              customStyle={gstyles.darkGreyText}
            />
            <View className="flex-row mt-6">
              <CustomButton
                text="Batal"
                containerClass="px-10 bg-[#F4F4F4]"
                customStyle={[gstyles.typefaceBold, gstyles.darkGreyText]}
                onPress={onCloseModal}
              />
              <CustomButton
                text={onLoading ? 'Deleting...' : 'Hapus'}
                containerClass="px-10 ml-4 bg-[#ED4C5C]"
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

export default CustomModalDelete
