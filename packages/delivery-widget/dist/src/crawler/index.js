import * as cheerio from 'cheerio';
const crawler = async () => {
    const _cartItemSelector = {
        'localhost': '[data-item=cart-item]',
        'sunnyside': '[data-cy=CartItem]'
    };
    const _cartTotalSelector = {
        'localhost': '[data-item=cart-total]',
        'sunnyside': '[data-cy=CartTotal]'
    };
    try {
        if (typeof window !== 'undefined') {
            const _url = window.location.href;
            const response = await fetch(_url);
            const html = await response.text();
            const $ = cheerio.load(html);
            const data = parseData('cart');
            return data;
            function parseData(dataKey) {
                switch (dataKey) {
                    case 'cart':
                        return parseCartHtml();
                    default:
                        return parseCartHtml();
                }
            }
            function parseCartHtml() {
                const _domain = getDomain();
                const cartItemSelector = getCartItemSelector();
                const _cartItemHtml = $(cartItemSelector).get();
                const cartTotalSelector = getCartTotalSelector();
                const _cartTotal = $(cartTotalSelector).text();
                const _cartData = createCartData(_cartItemHtml, _cartTotal);
                return _cartData;
                function getCartItemSelector() {
                    return _cartItemSelector[_domain] || _cartItemSelector['localhost'];
                }
                function getCartTotalSelector() {
                    return _cartTotalSelector[_domain] || _cartTotalSelector['localhost'];
                }
                function createCartData(html, total) {
                    console.log('create cart data input: ', html);
                    const cartItems = [];
                    html.forEach((item) => {
                        const $item = $(item);
                        const _item = {
                            name: $item.find('[data-item=cart-item-name]').text(),
                            price: $item.find('[data-item=cart-item-price]').text(),
                            quantity: $item.find('[data-item=cart-item-quantity]').text(),
                            weight: $item.find('[data-item=cart-item-weight]').text(),
                            image: $item.find('[data-item=cart-item-image]').attr('src'),
                        };
                        cartItems.push(_item);
                    });
                    const cartData = {
                        cartItems: cartItems,
                        total: total
                    };
                    console.log('cartData', cartData);
                    return cartData;
                }
            }
            function getDomain() {
                switch (true) {
                    case window.location.href.includes('localhost'):
                        return 'localhost';
                    case window.location.href.includes('sunnyside'):
                        return 'sunnyside';
                    default:
                        return 'localhost';
                }
            }
        }
        else
            throw new Error('window is not available');
    }
    catch (error) {
        console.log(error);
    }
};
export { crawler };
