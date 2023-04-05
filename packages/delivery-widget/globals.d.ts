declare module '*.ejs' {
    export function renderFile(
      path: string,
      data?: any,
      options?: any,
      callback?: (err: Error | null, str?: string) => void
    ): Promise<string>;

    const value: string;
    export default value;
  }

  interface Window {
    grasWidget: any;
    attachEvent(event: string, callback: () => void): void;
  }
