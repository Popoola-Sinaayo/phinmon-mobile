import { DimensionValue, TextStyle } from "react-native";

export interface ButtonProps {
  text: string;
  textSize?: number;
  textColor?: string;
    textWeight?: any;
    backgroundColor?: string;
    borderRadius?: number;
    paddingTop?: number;
  paddingBottom?: number;
  width?: DimensionValue;
  onPress?: () => void;
  isLoading?: boolean;
}

export interface TypographyProps {
  text?: string;
  size?: number;
  color?: string;
  weight?: any;
    children?: React.ReactNode | string;
    marginBottom?: number;
  marginTop?: number;
  align?: "left" | "center" | "right";
}

export interface TextInputComponentProps {
  label: string;
  placeHolder: string;
  marginVertical?: number;
  borderColor?: string;
  value: string;
  setValue: (data: string) => void;
  type?: "password" | "text" | "email" | "number" | "tel";
  backgroundColor?: string;
  allowMultipleLine?: boolean;
  numberOfLines?: number;
  style?: TextStyle;
  placeHolderColor?: string;
  labelColor?: string;
  height?: number;
}

export interface CountryInputProps {
  label: string;
  placeHolder: string;
  marginVertical?: number;
  borderColor?: string;
  value: string;
  setValue: (data: string) => void;
  backgroundColor?: string;
  style?: TextStyle;
  placeHolderColor?: string;
  labelColor?: string;
  height?: number;
}