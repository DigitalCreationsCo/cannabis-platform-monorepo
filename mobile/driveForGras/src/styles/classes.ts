const RNstyles = Object.freeze({
    header: {
        container: ['flex flex-row',
        'lg:ml-[188px]',
        'py-6 sm:px-5 lg:px-16 xl:pl-0 xl:pr-16',
        'lg:justify-end lg:right-0'],
        header: [
            'flex flex-row grow',
            'w-full md:w-fit xl:w-fit',
            'lg:justify-end lg:h-fit',
            'shadow-md lg:shadow-none'
        ],
        drawerButton: ['btn btn-ghost rounded-none bg-light lg:hidden'],

    },

    searchField: {
        container: [
            'flex flex-row grow items-center lg:self-center space-x-3',
            'xl:max-w-[408px] xl:relative',
            'h-[51px]',
            'bg-light lg:shadow-md',
            'py-2 pl-4',
        ],
        isFocused_f: (isFocused: boolean) => isFocused && 'border border-primary',
    },

    textfield: {
        inputContainer: ['bg-light shadow', 'w-full p-2 flex flex-col space-y-4 justify-between', 'rounded'],
        input: "text-lg h-10 px-2",
        message: 'py-2',
    },
    
    modal: {
        isModalOpen_f: (visible: boolean) => visible && 'modal-open',
        modalClass: 'modal',
        responsive: 'min-w-full min-h-screen sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12 py-8',
        modalBox: 'modal-box rounded-btn bg-inverse-soft'
    },

    card: {
        container: 'h-max w-full md:!w-5/6 lg:!w-2/3 bg-light flex flex-col shadow drop-shadow max-w-screen p-2 !pb-12 md:p-5 md:px-12 !rounded-none md:!rounded-btn'
    },

    footer: "space-y-2 flex-col min-h-[188px] p-12 pb-24 lg:px-[248px] bg-secondary min-w-full bottom-0"
});

export default RNstyles;