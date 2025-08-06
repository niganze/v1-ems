import { ReactElement } from 'react';

export const Sky: (props: { isRotating: boolean }) => ReactElement;
export const Bird: () => ReactElement;
export const Plane: (props: { isRotating: boolean; position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] }) => ReactElement;
export const Island: (props: { isRotating: boolean; setIsRotating: (rotating: boolean) => void; setCurrentStage: (stage: number) => void; position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] }) => ReactElement;
export const Fox: () => ReactElement; 