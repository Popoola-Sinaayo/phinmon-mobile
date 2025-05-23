export interface ButtonProps {
  text: string;
  textSize?: number;
  textColor?: string;
    textWeight?: any;
    backgroundColor?: string;
    borderRadius?: number;
    paddingTop?: number;
    paddingBottom?: number;
}

export interface TypographyProps {
  text: string;
  size?: number;
  color?: string;
  weight?: any;
    children?: React.ReactNode | string;
    marginBottom?: number;
    marginTop?: number;
}