import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Typography from "@/components/Typography";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { verifyOtpDetails } from "@/requests/authentication";
import { showMessage } from "react-native-flash-message";
import { setLocalName, setToken } from "@/utils/storage";

const EnterOtp = () => {
  const navigation = useNavigation();
  const [otps, setOtps] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });
  const ref1 = useRef<any>(null);
  const ref2 = useRef<any>(null);
  const ref3 = useRef<any>(null);
  const ref4 = useRef<any>(null);
  const ref5 = useRef<any>(null);
  const ref6 = useRef<any>(null);
  const route = useRoute()
  const {email} = route.params as {email: string}
  const [otpError, setOtpError] = useState(false)
  const [otpSuccess, setOtpSuccess] = useState(false)

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtpDetails,
    onSuccess: (data) => {
      console.log("OTP verified:", data);
      showMessage({
        message: "OTP Verified Successfully",
        type: "success",
      });
      setOtpSuccess(true)
      setToken(data.token)
      setLocalName(data.user.fullName)

      setTimeout(() => {
        if (data.user.isOnboarded) {
          navigation.navigate("NavigatorTab");
        } else {
          navigation.navigate("OnboardingDetails");
        }
      }, 2000);
    },
    onError: (error) => {
      console.error("OTP verification error:", error);
      setOtpError(true)
      showMessage({
        message: "OTP Verification Failed",
        type: "danger",
      });
    },
  });

  useEffect(() => {
    setOtpError(false)
  }, [otps])

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Typography weight={600} size={20} color="#6B6B6B">
          Check your inbox, bestie
        </Typography>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              otpError && styles.errorInput,
              otpSuccess && styles.successInput,
            ]}
            textAlign="center"
            value={otps.otp1}
            onChangeText={(data) => {
              setOtps({ ...otps, otp1: data });
              if (data.length === 1) {
                ref2.current.focus();
              }
            }}
            ref={ref1}
            keyboardType="number-pad"
          />
          <TextInput
            style={[
              styles.input,
              otpError && styles.errorInput,
              otpSuccess && styles.successInput,
            ]}
            textAlign="center"
            value={otps.otp2}
            onChangeText={(data) => {
              setOtps({ ...otps, otp2: data });
              if (data.length === 1) {
                ref3.current.focus();
              } else {
                ref1.current.focus();
              }
            }}
            keyboardType="number-pad"
            ref={ref2}
          />
          <TextInput
            style={[
              styles.input,
              otpError && styles.errorInput,
              otpSuccess && styles.successInput,
            ]}
            textAlign="center"
            ref={ref3}
            value={otps.otp3}
            onChangeText={(data) => {
              setOtps({ ...otps, otp3: data });
              if (data.length === 1) {
                ref4.current.focus();
              } else {
                ref2.current.focus();
              }
            }}
            keyboardType="number-pad"
          />
          <TextInput
            style={[
              styles.input,
              otpError && styles.errorInput,
              otpSuccess && styles.successInput,
            ]}
            textAlign="center"
            ref={ref4}
            value={otps.otp4}
            onChangeText={(data) => {
              setOtps({ ...otps, otp4: data });
              if (data.length === 1) {
                ref5.current.focus();
              } else {
                ref3.current.focus();
              }
            }}
            keyboardType="number-pad"
          />
          <TextInput
            style={[
              styles.input,
              otpError && styles.errorInput,
              otpSuccess && styles.successInput,
            ]}
            textAlign="center"
            ref={ref5}
            value={otps.otp5}
            onChangeText={(data) => {
              setOtps({ ...otps, otp5: data });
              if (data.length === 1) {
                ref6.current.focus();
              } else {
                ref4.current.focus();
              }
            }}
            keyboardType="number-pad"
          />
          <TextInput
            style={[
              styles.input,
              otpError && styles.errorInput,
              otpSuccess && styles.successInput,
            ]}
            textAlign="center"
            ref={ref6}
            value={otps.otp6}
            onChangeText={(data) => {
              setOtps({ ...otps, otp6: data });
              if (data.length === 1) {
                ref6.current.blur();
              } else {
                ref5.current.focus();
              }
            }}
            keyboardType="number-pad"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Typography text="We sent a 6-digit code to your email" size={16} />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Button
            text="Verify & flex 💪"
            textWeight={600}
            textSize={18}
            width={"100%"}
            backgroundColor="#8C78F2"
            borderRadius={10}
            isLoading={verifyOtpMutation.isPending}
            onPress={() => {
              // navigation.navigate("OnboardingDetails");
              verifyOtpMutation.mutate({email, otp: Object.values(otps).join("")});
            }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Typography weight={700}>
            <Text>Didn't receive the code? </Text>
            <Text
              style={{
                color: "#8C78F2",
                textDecorationStyle: "dashed",
                textDecorationLine: "underline",
              }}
            >
              Send Again
            </Text>
          </Typography>
        </View>
      </View>
    </View>
  );
};

export default EnterOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8C78F2",
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    //   marginVertical: 8,
    width: "90%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    // borderBlockColor: Colors.default.gray1,
    borderColor: "#737373",
    padding: 10,
    borderRadius: 10,
    width: 42,
    height: 54,
    backgroundColor: "#EBEBEB",
  },
  errorInput: {
    borderColor: "#ff4d4d",
    backgroundColor: "#ffe6e6",
    color: "#ff1a1a"
  },
  successInput: {
    borderColor: "#0f0",
    backgroundColor: "#e6ffe6",
    color: "#0a0"
  },
});
