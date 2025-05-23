export type RootStackParamList = {
    WelcomeAnimation: undefined;
    GetStarted: undefined;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}