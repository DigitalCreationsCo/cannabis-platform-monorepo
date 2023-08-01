const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin')

// //   plugins: {
// //     // ...
// //   },
// //   // Define a new layer for the default styles
// //   // This will override any conflicting styles from other layers
// //   // Only elements within the ".my-wrapper" element will be affected
// //   layers: {
// //     myWrapper: {
// //       // Use the "*" selector to apply all default styles
// //       "*": ["*"],
// //     },
// //   },

// //     plugins: {
// //       customStyles: ({ addComponents }) => {
// //         addComponents({ 
// //           ".my-wrapper": {
// //             // Define styles for the wrapper element
// //             // For example:
// //             display: "flex",
// //             justifyContent: "center",
// //             alignItems: "center",
// //             backgroundColor: "gray.200",
// //             padding: "2rem",
// //           },
// //         });
// //       },
// //     },
// //     // Define a new layer for the custom styles
// //     // This will override any conflicting styles from other layers
// //     // Only elements within the ".my-wrapper" element will be affected
// //     layers: {
// //       customStyles: {
// //         ".my-wrapper": ["*"],
// //       },
// //     },
// //   };

// module.exports = {
//     // corePlugins: {
//     //     preflight: false,
//     // },
//     // plugins: [
//     //     require('daisyui'),
//     //     // plugin(({ addComponents }) => {
//     //     //     addComponents({ 
//     //     //         ".gras-widget-wrapper": '*'
//     //     //     });
//     //     // })
//     // ],
//     // content: ["../../app/delivery-widget/**/*.{js,ts,jsx,tsx}"],
//     prefix: ".gras-widget-wrapper ",
//     // important: '.gras-widget-wrapper',
//     // base: {
//     //     grasWidgetWrapper: { 
//     //     "*": ["*"]
//     //     }
//     // },
//     // layers: { "*": ["*"]},
//     // theme: {
//     //     extend: {
//     //         colors: {
//     //             inherit: colors.inherit,
//     //             current: colors.current,
//     //             transparent: colors.transparent,

//     //             primary: 'var(--primary)',
//     //             'primary-light': 'var(--primary-light)',
//     //             secondary: 'var(--secondary)',
//     //             inverse: 'var(--inverse)',
//     //             'inverse-soft': 'var(--inverse-soft)',
//     //             accent: 'var(--accent)',
//     //             'accent-soft': 'var(--accent-soft)',

//     //             dark: 'var(--dark)',
//     //             'dark-soft': 'var(--dark-soft)',
//     //             light: 'var(--light)',
//     //             'light-soft': 'var(--light-soft)',
//     //             error: 'var(--error)'
//     //         },
//     //         borderWidth: {
//     //             DEFAULT: '1.5px'
//     //         },
//     //         borderColor: {
//     //             DEFAULT: '#14a33d'
//     //         },
//     //         borderRadius: {
//     //             none: '0',
//     //             btn: 'var(--rounded-btn)',
//     //             full: '9999px'
//     //         },
//     //         fontWeight: {
//     //             normal: 'var(--font-weight-normal)',
//     //             semibold: 'var(--font-weight-semibold)',
//     //             bold: 'var(--font-weight-bold)',
//     //             display: 'var(--font-weight-display)',
//     //             btn: 'var(--font-weight-btn)'
//     //         }
//     //     }
//     // },
//     // daisyui: {
//     //     styled: true,
//     //     base: true,
//     //     utils: true,
//     //     themes: [
//     //         {
//     //             cannabis: {
//     //                 '--primary': '#14a33d',
//     //                 '--primary-light': '#17c649',
//     //                 '--secondary': '#13622a',
//     //                 '--inverse': '#fff2da',
//     //                 '--inverse-soft': '#f9f7f2',
//     //                 '--accent': '#a49b8a',
//     //                 '--accent-soft': '#bbb5a9',

//     //                 '--dark': '#3e3a3a',
//     //                 '--dark-soft': '#a8a8a8',

//     //                 '--light': '#ffffff',
//     //                 '--light-soft': '#c6c0b5',

//     //                 '--error': '#dd1616'
//     //             }
//     //         }
//     //     ]
//     // },
// };

// // module.exports = {
// //     plugins: [require('daisyui')],
// //     content: [
// //         // './src/**/*.{js,ts,jsx,tsx}',
// //         '../../app/shop/**/*.{jsx,tsx}',
// //         '../../app/app/**/*.{jsx,tsx}',
// //         '../../app/delivery-widget/src/**/*.{jsx,tsx}',
// //         '../../packages/ui-lib/src/**/*.{jsx,tsx}',
// //     ],
// //     theme: {
// //         extend: {
// //             colors: {
// //                 inherit: colors.inherit,
// //                 current: colors.current,
// //                 transparent: colors.transparent,

// //                 primary: 'var(--primary)',
// //                 'primary-light': 'var(--primary-light)',
// //                 secondary: 'var(--secondary)',
// //                 inverse: 'var(--inverse)',
// //                 'inverse-soft': 'var(--inverse-soft)',
// //                 accent: 'var(--accent)',
// //                 'accent-soft': 'var(--accent-soft)',

// //                 dark: 'var(--dark)',
// //                 'dark-soft': 'var(--dark-soft)',
// //                 light: 'var(--light)',
// //                 'light-soft': 'var(--light-soft)',
// //                 error: 'var(--error)'
// //             },
// //             borderWidth: {
// //                 DEFAULT: '1.5px'
// //             },
// //             borderColor: {
// //                 DEFAULT: '#14a33d'
// //             },
// //             borderRadius: {
// //                 none: '0',
// //                 btn: 'var(--rounded-btn)',
// //                 full: '9999px'
// //             },
// //             fontWeight: {
// //                 normal: 'var(--font-weight-normal)',
// //                 semibold: 'var(--font-weight-semibold)',
// //                 bold: 'var(--font-weight-bold)',
// //                 display: 'var(--font-weight-display)',
// //                 btn: 'var(--font-weight-btn)'
// //             }
// //         }
// //     },
// //     daisyui: {
// //         styled: true,
// //         base: true,
// //         utils: true,
// //         themes: [
// //             {
// //                 cannabis: {
// //                     '--primary': '#14a33d',
// //                     '--primary-light': '#17c649',
// //                     '--secondary': '#13622a',
// //                     '--inverse': '#fff2da',
// //                     '--inverse-soft': '#f9f7f2',
// //                     '--accent': '#a49b8a',
// //                     '--accent-soft': '#bbb5a9',

// //                     '--dark': '#3e3a3a',
// //                     '--dark-soft': '#a8a8a8',

// //                     '--light': '#ffffff',
// //                     '--light-soft': '#c6c0b5',

// //                     '--error': '#dd1616'
// //                 }
// //             }
// //         ]
// //     }
// // };

module.exports = {
    // corePlugins: {
    //     preflight: false,
    // },
    important: '#gras-widget-root',
    // prefix: '#gras-widget-root',
    plugins: [require('daisyui')],
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        // '../../app/shop/**/*.{jsx,tsx}',
        // '../../app/app/**/*.{jsx,tsx}',
        // '../../app/delivery-widget/src/**/*.{jsx,tsx}',
        '../../packages/ui-lib/src/**/*.{jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                inherit: colors.inherit,
                current: colors.current,
                transparent: colors.transparent,

                primary: 'var(--primary)',
                'primary-light': 'var(--primary-light)',
                secondary: 'var(--secondary)',
                inverse: 'var(--inverse)',
                'inverse-soft': 'var(--inverse-soft)',
                accent: 'var(--accent)',
                'accent-soft': 'var(--accent-soft)',

                dark: 'var(--dark)',
                'dark-soft': 'var(--dark-soft)',
                light: 'var(--light)',
                'light-soft': 'var(--light-soft)',
                error: 'var(--error)'
            },
            borderWidth: {
                DEFAULT: '1.5px'
            },
            borderColor: {
                DEFAULT: '#14a33d'
            },
            borderRadius: {
                none: '0',
                btn: 'var(--rounded-btn)',
                full: '9999px'
            },
            fontWeight: {
                normal: 'var(--font-weight-normal)',
                semibold: 'var(--font-weight-semibold)',
                bold: 'var(--font-weight-bold)',
                display: 'var(--font-weight-display)',
                btn: 'var(--font-weight-btn)'
            }
        }
    },
    daisyui: {
        styled: true,
        base: true,
        utils: true,
        themes: [
            {
                cannabis: {
                    '--primary': '#14a33d',
                    '--primary-light': '#17c649',
                    '--secondary': '#13622a',
                    '--inverse': '#fff2da',
                    '--inverse-soft': '#f9f7f2',
                    '--accent': '#a49b8a',
                    '--accent-soft': '#bbb5a9',

                    '--dark': '#3e3a3a',
                    '--dark-soft': '#a8a8a8',

                    '--light': '#ffffff',
                    '--light-soft': '#c6c0b5',

                    '--error': '#dd1616'
                }
            }
        ]
    },
};