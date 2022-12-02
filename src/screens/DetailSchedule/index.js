import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Keyboard, SafeAreaView, View} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import {useDispatch, useSelector} from 'react-redux'
import {IllustrationTodoEmptyState} from '../../assets/img/illustration'
import {
  CardList,
  CustomButton,
  CustomModal,
  CustomModalDelete,
  Navbar,
} from '../../components'
import {logoutUser} from '../../store/auth/action'
import {
  addNewSchedule,
  deleteSchedule,
  editSchedule,
  getDetailSchedule,
} from '../../store/schedule/action'
import {gstyles, theme} from '../../utils/styles'

const DetailSchedule = ({navigation: {goBack}, route}) => {
  const dispatch = useDispatch()
  const {
    dataSchedule,
    successAddSchedule,
    successEditSchedule,
    successDeleteSchedule,
    loadingSchedule,
    errorSchedule,
  } = useSelector(state => state.Schedule)
  const [listCourse, setListCourse] = useState(dataSchedule)
  const [data, setData] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [editCourse, setEditCourse] = useState(false)
  const [selectedEditModal, setSeletedEditModal] = useState({
    title: '',
    id: '',
  })
  const [selectedDeleteModal, setSeletedDeleteModal] = useState({
    title: '',
    id: '',
  })
  const [inputs, setInputs] = useState({
    courseStudy: '',
    courseStudyValid: false,
  })
  const [errors, setErrors] = useState({})
  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    if (route.params && route.params.detail) {
      let {detail} = route.params
      setData(detail)
    }
  }, [route.params])

  useEffect(() => {
    if (data) {
      getDetailScheduleFromStore()
    }
  }, [data])

  useEffect(() => {
    setPageLoading(false)

    if (dataSchedule) {
      setListCourse(dataSchedule)
    }

    if (successAddSchedule) {
      setListCourse(dataSchedule)
    }
    if (successEditSchedule) {
      setListCourse(dataSchedule)
    }

    if (successDeleteSchedule) {
      setListCourse(dataSchedule)
    }
  }, [
    dataSchedule,
    successAddSchedule,
    successEditSchedule,
    successDeleteSchedule,
    errorSchedule,
  ])

  const getDetailScheduleFromStore = () => {
    let form = {
      email: data.email,
      day: data.detailValue,
    }
    dispatch(getDetailSchedule(form))
  }

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

    if (editCourse && text.length > 0) {
      setSeletedEditModal(prevState => ({
        ...prevState,
        ['courseStudy']: text,
      }))
    } else if (editCourse && text.length == 0) {
      setSeletedEditModal(prevState => ({
        ...prevState,
        ['courseStudy']: text,
      }))
    }
  }

  const submitCourse = () => {
    Keyboard.dismiss()
    if (inputs.courseStudyValid) {
      setPageLoading(true)
      setInputs(prevState => ({
        ...prevState,
        ['courseStudyValid']: false,
      }))

      if (editCourse) {
        setSeletedEditModal(prevState => ({
          ...prevState,
          ['courseStudy']: '',
        }))
        let course = {
          email: data.email,
          id: selectedEditModal.id,
          title: inputs.courseStudy,
        }
        setEditCourse(false)
        dispatch(editSchedule(course))
      } else {
        let course = {
          title: inputs.courseStudy,
          day: data.detailValue,
        }
        dispatch(addNewSchedule(data.email, course, true))
      }

      setShowModal(false)
    } else {
      if (!inputs.courseStudyValid) {
        setErrors(prevState => ({
          ...prevState,
          ['courseStudy']: 'Field Mata Kuliah kosong!',
        }))
      }
    }
  }

  const deleteCourse = () => {
    setPageLoading(true)
    setShowModalDelete(false)
    dispatch(
      deleteSchedule(data.email, selectedDeleteModal.id, data.detailValue),
    )
  }

  const renderListDetailCourse = ({item, index}) => {
    return (
      <CardList
        key={index}
        value={item}
        onEditCourse={() => {
          setShowModal(true)
          setEditCourse(true)
          setInputs(prevState => ({
            ...prevState,
            ['courseStudy']: item.title,
            ['courseStudyValid']: true,
          }))
          setSeletedEditModal(() => ({
            ['courseStudy']: item.title,
            ['id']: item.id,
          }))
        }}
        onDeleteCourse={() => {
          setShowModalDelete(true)
          setSeletedDeleteModal(() => ({
            ['title']: item.title,
            ['id']: item.id,
          }))
        }}
      />
    )
  }

  return (
    <View className="flex-1">
      <CustomModal
        visible={showModal}
        labelTitle={`${editCourse ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah'}`}
        onChangeText={text => handleOnChange(text, 'courseStudy')}
        onValueChange={value => handleOnChange(value, 'courseDay')}
        onCloseModal={() => {
          setShowModal(false)
          if (editCourse) {
            setEditCourse(false)
            setInputs(prevState => ({
              ...prevState,
              ['courseStudy']: '',
              ['courseStudyValid']: false,
            }))
            setSeletedEditModal(() => ({
              ['courseStudy']: '',
              ['id']: '',
            }))
          }
        }}
        value={editCourse && inputs.courseStudy}
        onSubmit={submitCourse}
        onError={errors}
        onLoading={pageLoading}
        dayHidden
      />

      <CustomModalDelete
        visible={showModalDelete}
        labelTitle="Hapus Mata Kuliah"
        labelDesc={`Apakah anda yakin menghapus mata kuliah ${selectedDeleteModal.title}?`}
        onCloseModal={() => setShowModalDelete(false)}
        onSubmit={deleteCourse}
        onLoading={pageLoading}
      />

      <SafeAreaView className="flex-1">
        <View>
          <Navbar
            title={data.headLabel}
            buttonText={`Checkout | ${data && data.email}`}
            logout={() => dispatch(logoutUser())}
            backPress
            onBackPress={() => goBack()}
          />
        </View>

        <View className="flex flex-row justify-end p-4 w-full">
          <CustomButton
            text="Tambah Mata Kuliah"
            containerClass="w-[65%] p-2"
            customStyle={gstyles.typefaceBold}
            addIcon
            onPress={() => setShowModal(true)}
          />
        </View>
        <View className="h-[2px] bg-[#E5E5E5] w-full"></View>

        {loadingSchedule && (
          <ActivityIndicator
            size="large"
            color={theme.textColorSecondary}
            className="mt-4"
          />
        )}

        {listCourse && listCourse.length > 0 && !loadingSchedule && (
          <View className="flex-1">
            <FlatList
              className="px-4 h-full"
              data={listCourse}
              contentContainerStyle={{paddingBottom: 20}}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderListDetailCourse}
            />
          </View>
        )}
        {listCourse && listCourse.length == 0 && !loadingSchedule && (
          <View className="justify-center items-center h-full relative top-[-100px]">
            <IllustrationTodoEmptyState width={'100%'} height={250} />
          </View>
        )}
      </SafeAreaView>
    </View>
  )
}

export default DetailSchedule
