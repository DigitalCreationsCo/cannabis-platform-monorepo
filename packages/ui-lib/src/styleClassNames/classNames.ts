const styles = Object.freeze({
    TOPBAR: {
        topbar: ['flex flex-row h-18 pr-8 lg:pr-16 bg-inverse items-center shadow z-10 md:h-[150px]'],
        tagline: ['pt-2 pl-2',
            'text-lg',
            'hidden',
            'md:block',
            'place-self-center',
            'text-primary font-semibold',
            'cursor-default',
            'md:cursor-default',
        ],
        badge: ['indicator absolute inline-flex items-center justify-center w-6 h-6 text-sm text-light bg-primary -top-2 -right-2 rounded-full']
    },
    BUTTON: {
        'round-image-btn': ['btn focus:!border-primary focus:!ring-primary focus:!outline-primary h-32 w-32 col-span-1 !rounded-full p-0 m-0 overflow-hidden']
    }
});

export default styles;