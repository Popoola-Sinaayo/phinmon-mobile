export type RootStackParamList = {
  WelcomeAnimation: undefined;
  GetStarted: undefined;
  Onboarding: undefined;
  WelcomeStarted: undefined;
  EnterMail: undefined;
  EmailOtp: undefined;
  OnboardingDetails: undefined;
  OnboardingBank: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}