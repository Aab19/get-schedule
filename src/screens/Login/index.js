import React, {useEffect, useState} from 'react'
import {Keyboard, SafeAreaView, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import CustomToast, {toast} from '../../components/CustomToast'
import TextView from '../../components/TextView'
import {loginUser} from '../../store/auth/action'
import {REGEX_CHECK_EMAIL} from '../../utils/constant'
import {gstyles} from '../../utils/styles'

const Login = ({navigation: {replace}}) => {
  const dispatch = useDispatch()
  const {dataLogin, errorLogin} = useSelector(state => state.Auth)

  const [inputs, setInputs] = useState({
    email: '',
    emailValid: false,
  })
  const [errors, setErrors] = useState({})
  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    if (errorLogin && errorLogin !== '') {
      toast.show({
        type: 'mcvToast',
        props: {
          title: t('error'),
          desc: errorLogin,
          error: true,
        },
        position: 'bottom',
      })
    }
    if (dataLogin) {
      setPageLoading(false)
      replace('Home')
    }
  }, [dataLogin, errorLogin])

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}))

    if (!inputs.email) {
      setInputs(prevState => ({...prevState, ['emailValid']: false}))
    } else if (input == 'email' && !text.match(REGEX_CHECK_EMAIL)) {
      handleError('Format email tidak sesuai', 'email')
      setInputs(prevState => ({...prevState, ['emailValid']: false}))
    } else {
      handleError(null, 'email')
      setInputs(prevState => ({...prevState, ['emailValid']: true}))
    }
  }

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}))
  }

  const checkAllField = () => {
    return inputs.emailValid
  }

  const validate = async () => {
    Keyboard.dismiss()

    if (checkAllField()) {
      setPageLoading(true)
      dispatch(loginUser(inputs.email.trim()))
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <CustomToast />
      <View className={`bg-[#F4F4F4] h-full justify-center items-center p-4`}>
        <View
          className="bg-white p-8 w-full rounded-[8px]"
          style={gstyles.boxShadow}>
          <TextView
            content="Check In"
            customClass="text-[24px] font-semibold text-center"
            customStyle={gstyles.typefaceBold}
          />

          <View>
            <TextView
              content="Email"
              customClass="mt-4"
              customStyle={gstyles.typefaceBold}
            />
            <CustomInput
              placeholder="Masukkan email anda"
              customClass="mt-2"
              onChangeText={text => handleOnChange(text, 'email')}
              error={errors.email}
              onFocus={() => {
                handleError(null, 'email')
              }}
            />
            <CustomButton
              text={pageLoading ? 'Checking...' : 'Mulai Sesi'}
              containerClass="mt-7"
              customStyle={gstyles.typefaceBold}
              disabled={!checkAllField() || pageLoading}
              onPress={validate}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login
