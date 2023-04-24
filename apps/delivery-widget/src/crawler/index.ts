import { convertDollarsToWholeNumber } from '@cd/core-lib/src/utils/transaction'
import * as cheerio from 'cheerio'
import { Cart, CartItem } from '../components/CartItemList'


type DOMDataKey = 'cart'

const crawler = async () => {
    const _cartItemSelector = {
        'localhost': '[data-item=cart-item]',
        'sunnyside': '[data-cy=CartItem]'
    }
    const _cartTotalSelector = {
        'localhost': '[data-item=cart-total]',
        'sunnyside': '[data-cy=CartTotal]'
    }
    
    try {
        if (typeof window === 'undefined') throw new Error('window is not available')
        
        const _url = window.location.href
        const response = await fetch(_url)
        const html = await response.text()

        const $ = cheerio.load(html)
        const data = parseData('cart')
        return data;
        
        function parseData(dataKey: DOMDataKey) {
            switch (dataKey){
                case 'cart':
                    return parseCartHtml()
                default:
                    return parseCartHtml()
            }
        }
        
        function parseCartHtml() {
            const _domain = getDomain()
            const cartItemSelector = getCartItemSelector()
            const _cartItemHtml = $(cartItemSelector).get()

            const cartTotalSelector = getCartTotalSelector()
            const _cartTotal = $(cartTotalSelector).text() as unknown as number
            const _cartData = createCartData(_cartItemHtml, _cartTotal)
            return _cartData;

            function getCartItemSelector() {
                return _cartItemSelector[_domain] || _cartItemSelector['localhost']
            }

            function getCartTotalSelector() {
                return _cartTotalSelector[_domain] || _cartTotalSelector['localhost']
            }

            function createCartData(html: cheerio.AnyNode[], total: number):Cart {
                // console.log('create cart data input: ', html)
                const cartItems:CartItem[] = []
                
                const cartData: Cart = {
                    cartItems: cartItems,
                    total: convertDollarsToWholeNumber(total)
                }
                html.forEach((item) => {
                    const $item = $(item)
                    const _item = {
                        name: $item.find('[data-item=cart-item-name]').text(),
                        basePrice: convertDollarsToWholeNumber($item.find('[data-item=cart-item-price]').text()),
                        quantity: $item.find('[data-item=cart-item-quantity]').text() as unknown as number,
                        size: $item.find('[data-item=cart-item-weight]').text() as unknown as number,
                        unit: 'g',
                        images: [{
                            id: $item.find('[data-item=cart-item-image]').attr('id') || '',
                            location: ($item.find('[data-item=cart-item-image]').attr('src') || '').match(/[^(.)].*/g)?.[0] as unknown as string
                        }],
                    }


                    console.log('item created from parseHtml: ', _item)
                    cartData.cartItems.push(_item)
                    // cartItems.push(_item)
                })
                // console.log('cartData', cartData)
                return cartData
            }
        }
    }
    catch (error) {
        console.log(error)
        const cart: Cart = {
            cartItems: [],
            total: 0
        }
        return cart
    }
}

export { crawler }

function getDomain() {
    switch(true) {
        case window.location.href.includes('localhost'):
            return 'localhost'
        case window.location.href.includes('sunnyside'):
            return 'sunnyside'
        default:
            return 'localhost'
    }
}