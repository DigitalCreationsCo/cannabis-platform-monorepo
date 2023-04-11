// Fixes TS2669
declare global {
    namespace React {
        /** Fixes React 18 compatibility issues with formik: https://github.com/jaredpalmer/formik/issues/3546#issuecomment-1127014775 */
        type StatelessComponent<P> = React.FunctionComponent<P>;
    }
}
export { };

