import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  Text,
  StyleSheet,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Typography from "./Typography";
import { useTheme } from "@/contexts/ThemeContext";

interface DatePickerProps {
    value?: Date;
    onChange?: (date: Date) => void;
    mode?: 'date' | 'time' | 'datetime';
    label?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value = new Date(),
  onChange,
  mode = "date",
  label = "Select Date",
}) => {
  const [date, setDate] = useState<Date>(value);
  const [show, setShow] = useState(false);
  const { theme } = useTheme();

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
      onChange?.(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      {label ? (
        <Typography variant="subheading" marginBottom={8}>
          {label}
        </Typography>
      ) : null}
      <TouchableOpacity
        style={[
          styles.dateButton,
          {
            backgroundColor: theme.inputBackground,
            borderColor: theme.inputBorder,
          },
        ]}
        onPress={() => setShow(true)}
      >
        <Typography color={theme.text}>{date.toDateString()}</Typography>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  dateButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
});

export default DatePicker;