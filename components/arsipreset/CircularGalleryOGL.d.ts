export declare const DEFAULT_FONT: string;
export declare const DEFAULT_FONT_URL: string;

export declare function resolveFont(font: string, fontUrl?: string): Promise<string>;

export interface AppOptions {
  items?: Array<{ image: string; text: string }>;
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
}

export declare class App {
  constructor(container: HTMLElement, options?: AppOptions);
  destroy(): void;
}
