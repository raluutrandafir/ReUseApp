export enum Routes {
    Welcome = 'welcome',
    Login = 'login',
    Register = 'register',
    Choose = 'choose',
    ChooseScreen = 'chooseScreen'
}

type DynamicStackParams = Record<string, undefined>;
type StaticStackParams = {
    [Routes.Welcome]: undefined;
    [Routes.Login]: undefined;
    [Routes.Register]: undefined;
    [Routes.Choose]: undefined;
    [Routes.ChooseScreen]: undefined;
};

export type RootStackParams = DynamicStackParams & StaticStackParams;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParams {}
    }
}
