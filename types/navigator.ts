export type RootStackParamList = {
  WelcomeAnimation: undefined;
  GetStarted: undefined;
  Onboarding: undefined;
  WelcomeStarted: undefined;
  EnterMail: undefined;
  EmailOtp: {
    email: string
  };
  OnboardingDetails: undefined;
  OnboardingBank: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}