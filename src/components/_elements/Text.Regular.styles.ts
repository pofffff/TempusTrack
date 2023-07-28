import { colors, font, fontSize } from '../../settings'

import { StyleSheet } from 'react-native'

export const RegularTextStyle = StyleSheet.create({
  base: {
    color: colors.$black,
    fontSize: fontSize.$s,
    fontFamily: font.$text__light
  }

  // $xl: {
  // },
  // $l: {
  //     fontSize: fontSize.$l,
  //     fontFamily: font.$heading__light
  // },
  // $m: {
  //     fontSize: fontSize.$m,
  //     fontFamily: font.$heading__light
  // },
  // $s: {
  //     fontSize: fontSize.$s,
  //     fontFamily: font.$text__light
  // },
  // $xs: {
  //     fontSize: fontSize.$xs,
  //     fontFamily: font.$text__light
  // }
})
