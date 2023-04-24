function useCheckHrefIncludes(href:string) {
    const location = window.location.href
    if (location.includes(href)) {
        return true
    } else {
        return false
    }
}

export {
    useCheckHrefIncludes
};

