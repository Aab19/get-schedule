import {StyleSheet} from 'react-native'

export const theme = {
  white: '#FFFFFF',
  backgroundScreen: '#F4F4F4',
  statusBarColor: '#3A0B48',
  textColorPrimary: '#100720',
  textColorSecondary: '#D9019C',
  textColorGrey: '#BBBBBB',
  textColorDarkGrey: '#888888',
  textColorHint: '#A4A4A4',
  textError: '#ED4C5C',
  buttonColorPrimary: '#D9019C',
}

export const fonts = {
  light: 'Poppins-Light',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
  black: 'Poppins-Black',
}

export const gstyles = StyleSheet.create({
  typeface: {
    fontFamily: fonts.regular,
  },
  typefaceLight: {
    fontFamily: fonts.light,
  },
  typefaceMedium: {
    fontFamily: fonts.medium,
  },
  typefaceBold: {
    fontFamily: fonts.bold,
  },
  typefaceBlack: {
    fontFamily: fonts.black,
  },
  whiteText: {
    color: theme.white,
  },
  primaryText: {
    color: theme.textColorPrimary,
  },
  secondaryText: {
    color: theme.textColorSecondary,
  },
  greyText: {
    color: theme.textColorGrey,
  },
  darkGreyText: {
    color: theme.textColorDarkGrey,
  },
  errorText: {
    color: theme.textError,
  },
  buttonColorPrimary: {
    color: theme.buttonColorPrimary,
  },
  boxShadow: {
    elevation: 8,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {width: -2, height: 4},
    shadowRadius: 3,
  },
})
