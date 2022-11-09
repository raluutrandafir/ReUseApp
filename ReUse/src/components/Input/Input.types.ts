import type { StyleProp, ViewStyle, TextStyle } from 'react-native';

export enum InputState {
    Default,
    Disabled,
    Error,
    Focus
}

export enum ReturnKey {
    Done = 'done',
    Next = 'next',
    Search = 'search',
    Send = 'send',
    Go = 'go',
    Default = 'default'
}

export interface InputProps {
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
    blurOnSubmit?: boolean;
    description?: string;
    disabled?: boolean;
    error?: boolean;
    focused?: boolean;
    label?: string;
    maxLength?: number;
    multiline?: boolean;
    password?: boolean;
    style?: StyleProp<ViewStyle>;
    value: string;
    returnKeyType?: ReturnKey;
    onChangeText?: (text: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    onPress?: () => void;
    onSubmit?: () => void;
}

export type StateStylesMap<State extends string | number, Style = TextStyle | ViewStyle> = Record<
    State,
    Style
>;
