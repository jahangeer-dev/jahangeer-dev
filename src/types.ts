import { ComponentType } from 'react';

export interface NavigationProps {
  currentSection: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface Scene3DProps {
  currentSection?: string;
}

export interface LoadingProps {
  // Add any props if needed in the future
}

export interface FloatingGeometryProps {
  position: [number, number, number];
  geometry: ComponentType<any>;
  color: string;
  rotationSpeed?: number;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Rotation {
  x: number;
  y: number;
  z: number;
}

export interface Color {
  r: number;
  g: number;
  b: number;
}

export interface MeshRef {
  rotation: Rotation;
  position: Position;
}
