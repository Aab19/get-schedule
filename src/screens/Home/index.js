import {FlashList} from '@shopify/flash-list'
import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Keyboard, SafeAreaView, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {CardBox, CustomModal, Navbar} from '../../components'
import CustomButton from '../../components/CustomButton'
import {logoutUser} from '../../store/auth/action'
import {addNewSchedule, getAllSchedule} from '../../store/schedule/action'
import {gstyles, theme} from '../../utils/styles'

const Home = ({navigation: {replace, navigate}}) => {
  const dispatch = useDispatch()
  const {dataLogin} = useSelector(state => state.Auth)
  const {scheduleCounter, loadingSchedule, errorSchedule} = useSelector(
    state => state.Schedule,
  )
  const [userData, setUserData] = useState(dataLogin)
  const [listSchedule, setListSchedule] = useState(scheduleCounter)
  const [showModal, setShowModal] = useState(false)
  const [inputs, setInputs] = useState({
    courseStudy: '',
    courseDay: '',
    courseStudyValid: false,
    courseDayValid: false,
  })
  const [errors, setErrors] = useState({})
  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllSchedule(dataLogin.email))
  }, [])

  useEffect(() => {
    if (!dataLogin) {
      replace('Login')
    } else {
      setUserData(dataLogin)
    }
  }, [dataLogin])

  useEffect(() => {
    setPageLoading(false)
    if (scheduleCounter) {
      setListSchedule(scheduleCounter)
    }
  }, [scheduleCounter, errorSchedule])

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}))

    if (input == 'courseStudy' && text.length == 0) {
      setErrors(prevState => ({
        ...prevState,
        [input]: 'Field Mata Kuliah kosong!',
      }))
      setInputs(prevState => ({...prevState, ['courseStudyValid']: false}))
    } else if (input == 'courseStudy' && text.length !== 0) {
      setErrors(prevState => ({
        ...prevState,
        [input]: null,
      }))
      setInputs(prevState => ({...prevState, ['courseStudyValid']: true}))
    }

    if (
      (input == 'courseDay' && text && text.length == 0) ||
      (input == 'courseDay' && text == null)
    ) {
      setErrors(prevState => ({
        ...prevState,
        [input]: 'Field Pilih Hari kosong!',
      }))
      setInputs(prevState => ({...prevState, ['courseDayValid']: false}))
    } else if (input == 'courseDay' && text && text.length !== 0) {
      setErrors(prevState => ({
        ...prevState,
        [input]: null,
      }))
      setInputs(prevState => ({...prevState, ['courseDayValid']: true}))
    }
  }

  const submitCourse = () => {
    Keyboard.dismiss()
    if (inputs.courseStudyValid && inputs.courseDayValid) {
      setPageLoading(true)
      setInputs(prevState => ({
        ...prevState,
        ['courseStudyValid']: false,
        ['courseDayValid']: false,
      }))
      let course = {
        title: inputs.courseStudy,
        day: inputs.courseDay,
      }
      dispatch(addNewSchedule(dataLogin.email, course))
      setShowModal(false)
    } else {
      if (!inputs.courseStudyValid) {
        setErrors(prevState => ({
          ...prevState,
          ['courseStudy']: 'Field Mata Kuliah kosong!',
        }))
      }
      if (!inputs.courseDayValid) {
        setErrors(prevState => ({
          ...prevState,
          ['courseDay']: 'Field Pilih Hari kosong!',
        }))
      }
    }
  }

  const renderListSchedule = ({item, index}) => {
    let cardData = {}
    switch (item) {
      case 'monday':
        cardData = {label: 'Senin', courseCount: scheduleCounter.monday}
        break
      case 'tuesday':
        cardData = {label: 'Selasa', courseCount: scheduleCounter.tuesday}
        break
      case 'wednesday':
        cardData = {label: 'Rabu', courseCount: scheduleCounter.wednesday}
        break
      case 'thursday':
        cardData = {label: 'Kamis', courseCount: scheduleCounter.thursday}
        break
      case 'friday':
        cardData = {label: 'Jumat', courseCount: scheduleCounter.friday}
        break
    }
    let detail = {
      email: userData.email,
      headLabel: cardData.label,
      detailValue: item,
    }

    return (
      <CardBox
        key={index}
        number={index}
        value={cardData}
        onPress={() =>
          navigate({
            name: 'Detail Schedule',
            params: {
              detail: detail,
            },
          })
        }
      />
    )
  }

  return (
    <View className="flex-1">
      <CustomModal
        visible={showModal}
        labelTitle="Buat Jadwal Kuliah"
        onChangeText={text => handleOnChange(text, 'courseStudy')}
        onValueChange={value => handleOnChange(value, 'courseDay')}
        onCloseModal={() => setShowModal(false)}
        onSubmit={submitCourse}
        onError={errors}
        onLoading={pageLoading}
      />
      <SafeAreaView className="flex-1">
        <View>
          <Navbar
            title="Get Schedule"
            buttonText={`Checkout | ${userData.email}`}
            logout={() => dispatch(logoutUser())}
          />
        </View>

        <View className="flex flex-row justify-end p-4 w-full">
          <CustomButton
            text="Buat Jadwal Kuliah"
            containerClass="w-[60%] p-2"
            customStyle={gstyles.typefaceBold}
            addIcon
            onPress={() => setShowModal(true)}
          />
        </View>
        <View className="h-[2px] bg-[#E5E5E5] w-full"></View>

        {loadingSchedule ? (
          <ActivityIndicator
            size="large"
            color={theme.textColorSecondary}
            className="mt-4"
          />
        ) : (
          <View className="flex-1 px-4 mt-2 h-full">
            <FlashList
              data={Object.keys(listSchedule)}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderListSchedule}
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  )
}

export default Home
