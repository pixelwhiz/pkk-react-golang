declare module "*.png" {
    const value: any;
    export default value;
}
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        REACT_APP_LOCAL_SERVER: string;
        REACT_APP_NETWORK_SERVER: string;
        PUBLIC_URL: string;
    }
}