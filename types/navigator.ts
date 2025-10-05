export type RootStackParamList = {
  WelcomeAnimation: undefined;
  GetStarted: undefined;
  Onboarding: undefined;
  WelcomeStarted: undefined;
  EnterMail: undefined;
  EmailOtp: {
    email: string;
  };
  OnboardingDetails: undefined;
  OnboardingBank: undefined;
  OnboardingBankSuccess: undefined;
  NavigatorTab: undefined;
};

export type RootTabParamList = {
  // Home: undefined;
  Dashboard: undefined;
  ChatWithAI: undefined;
  TransactionHistory: undefined;
  Analysis: undefined;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}