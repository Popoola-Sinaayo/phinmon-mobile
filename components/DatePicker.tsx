import React, { useState } from 'react';
import { View, Button, Platform, Text, StyleSheet } from 'react-native';
// import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Typography from './Typography';

interface DatePickerProps {
    value?: Date;
    onChange?: (date: Date) => void;
    mode?: 'date' | 'time' | 'datetime';
    label?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
    value = new Date(),
    onChange,
    mode = 'date',
    label = 'Select Date',
}) => {
    const [date, setDate] = useState<Date>(value);
    const [show, setShow] = useState(false);

    // const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    //     setShow(Platform.OS === 'ios');
    //     if (selectedDate) {
    //         setDate(selectedDate);
    //         onChange?.(selectedDate);
    //     }
    // };

    return (
        <View style={styles.container}>
            {label ? <Typography>{label}</Typography> : null}
            {/* <Button title={date.toDateString()} onPress={() => setShow(true)} /> */}
            {/* {show && (
                <DateTimePicker
                    value={date}
                    mode={mode}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                />
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginVertical: 10 },
    label: { marginBottom: 5, fontWeight: 'bold' },
});

export default DatePicker;