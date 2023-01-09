declare module '*.svg' {
    import React from 'react';
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
}

declare module '*.gif' {
    const src: number;
    export default src;
}

declare module '*.png' {
    const src: number;
    export default src;
}
