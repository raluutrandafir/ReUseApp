export enum Routes {
    Welcome = 'welcome',
    Login = 'login',
    Register = 'register'
}

type DynamicStackParams = Record<string, undefined>;
type StaticStackParams = {
    [Routes.Welcome]: undefined;
    [Routes.Login]: undefined;
    [Routes.Register]: undefined;
};

export type RootStackParams = DynamicStackParams & StaticStackParams;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParams {}
    }
}
