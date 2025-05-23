import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TypographyProps } from '../types/component'

const Typography: React.FC<TypographyProps> = ({text, color, size, weight, children, marginBottom, marginTop}) => {
  return (
    <View>
          <Text style={{ fontSize: size ?? 14, fontWeight: weight ?? "400", color, marginTop, marginBottom }}>{ text ?? children}</Text>
    </View>
  )
}

export default Typography

const styles = StyleSheet.create({})