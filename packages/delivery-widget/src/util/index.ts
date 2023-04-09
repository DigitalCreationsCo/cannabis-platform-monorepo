function checkHrefCheckout() {
    const href = window.location.href
    if (href.includes("checkout")) {
        return true
    } else {
        return false
    }
}

export { checkHrefCheckout }
