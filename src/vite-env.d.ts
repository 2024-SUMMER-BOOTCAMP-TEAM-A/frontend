/// <reference types="vite/client" />

// SVG 파일을 ReactComponent로 사용하기 위한 타입 선언
declare module '*.svg' {
    import { FC, SVGProps } from 'react';
    export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}