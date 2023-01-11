import React, { useRef, useState, useEffect } from 'react';
import { Pressable, TextInput, View, StyleProp, ViewStyle, Text } from 'react-native';

import { InputProps, InputState } from './Input.types';

import styles, { getContainerStateStyles, getContainerSizeStyles } from './Input.style';

function getInputState(disabled = false, error = false, focus = false) {
    let state = InputState.Default;

    if (focus) {
        state = InputState.Focus;
    }

    if (disabled) {
        state = InputState.Disabled;
    }

    if (error) {
        state = InputState.Error;
    }

    return state;
}

export const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<TextInput>> =
    React.forwardRef<TextInput, InputProps>(
        (
            {
                style,
                disabled,
                description,
                error,
                onBlur,
                onChangeText,
                onFocus,
                onPress,
                onSubmit,
                returnKeyType,
                multiline,
                label,
                focused = false
            },
            forwardedRef
        ) => {
            const inputRef = useRef<TextInput>(null);
            const ref = (forwardedRef || inputRef) as React.RefObject<TextInput>;

            const [isFocused, setIsFocused] = useState(false);

            useEffect(() => {
                setIsFocused(focused);
            }, [focused]);

            function getContainerStyles() {
                const state = getInputState(disabled, error, isFocused);
                const containerStyles: StyleProp<ViewStyle> = [
                    getContainerStateStyles(state),
                    getContainerSizeStyles(),
                    style
                ];

                return containerStyles;
            }

            function handlePress() {
                if (!isFocused) {
                    ref.current?.focus();
                }

                onPress?.();
            }

            function handleFocus() {
                setIsFocused(true);

                if (onFocus) {
                    onFocus();
                }
            }

            function handleBlur() {
                setIsFocused(false);

                if (onBlur) {
                    onBlur();
                }
            }

            return (
                <View style={{ marginBottom: 12 }}>
                    <Pressable onPress={handlePress} style={getContainerStyles()}>
                        <View>
                            <TextInput
                                ref={ref}
                                autoCapitalize="none"
                                autoCorrect={false}
                                inputAccessoryViewID="editor-bar"
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                onSubmitEditing={onSubmit}
                                onPressIn={onPress}
                                style={styles.input}
                                onChangeText={onChangeText}
                                placeholder={label}
                                returnKeyType={returnKeyType}
                                multiline={multiline}
                            />
                        </View>
                    </Pressable>
                    {!!description && <Text style={styles.description}>{description}</Text>}
                </View>
            );
        }
    );
