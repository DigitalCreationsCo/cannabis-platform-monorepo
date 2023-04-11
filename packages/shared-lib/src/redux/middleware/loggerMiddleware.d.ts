declare const loggerMiddleware: (store: any) => (next: any) => (action: any) => any;
export default loggerMiddleware;
