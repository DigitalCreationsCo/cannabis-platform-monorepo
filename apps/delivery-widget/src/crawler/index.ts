import { SimpleCart } from '@cd/core-lib/reduxDir/features'
import { convertDollarsToWholeNumber } from '@cd/core-lib/src/utils/transaction'
import { ProductVariantWithDetails } from '@cd/data-access'
import * as cheerio from 'cheerio'


type DOMDataKey = 'cart'

const crawler = async () => {
    const _cartItemSelector = {
        'localhost': '[data-item=cart-item]',
        'sunnyside': '[data-cy=CartItem]',
        'mana-supply-company': '[data-testid=cart-item-container]'
    }
    const _cartTotalSelector = {
        'localhost': '[data-item=cart-total]',
        'sunnyside': '[data-cy=CartTotal]',
        'mana-supply-company': '[data-testid=cart-dropdown-subtotal]'
    }
    
    type DomData = {
        'cart-item': string;
        'total':     string;
        'name': string;
        'label': string;
        'basePrice': string;
        'quantity': string;
        'size': string;
        'unit': string;
        'images': {
            location: string;
        };
    }
    const _domDataSelector:Record<string, DomData> = {
        'localhost': {
            'cart-item': '[data-item=cart-item]',
            'total':     '[data-item=cart-total]',
            'name': '.item__Name',
            'label': '.item__Brand',
            'basePrice': '.item__Price',
            'quantity': '.item__Quantity',
            'size': '.item__Name',
            'unit': '.item__Name',
            'images': {
                location: '.product-image',
            },
        },
        'sunnyside': {
            'cart-item': '[data-cy=CartItem]',
            'total':     '[data-cy=CartTotal]',
            'name': '.item__Name',
            'label': '.item__Brand',
            'basePrice': '.item__Price',
            'quantity': '.item__Quantity',
            'size': '.item__Name',
            'unit': '.item__Name',
            'images': {
                location: '.product-image',
            },
        },
        'mana-supply-company':{
            'cart-item': '[data-testid=cart-item-container]',
            'total':     '[data-testid=cart-dropdown-subtotal]',
            'name': '.item__Name',
            'label': '.item__Brand',
            'basePrice': '.item__Price',
            'quantity': '.item__Quantity',
            'size': '.item__Name',
            'unit': '.item__Name',
            'images': {
                location: '.product-image',
            },
        }
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
            const _domain = getDispensaryDomain()
            // const cartItemSelector = getCartItemSelector()
            // const _cartItemHtml = $(cartItemSelector).get()

            // const cartTotalSelector = getCartTotalSelector()
            // const _cartTotal = $(cartTotalSelector).text() as unknown as number

            const _cartItemHtml = $(getDomData(_domain)['cart-item']).get()
            const _cartTotal = $(getDomData(_domain)['total']).text() as unknown as number
            
            console.info('cart items: ', _cartItemHtml)
            console.info('cart total: ', _cartTotal)
            
            const _cartData = createCartData(_cartItemHtml, _cartTotal)
            return _cartData;

            function getDomData(domain:string) {
                return _domDataSelector[domain] || _domDataSelector['localhost']
            }
            function getCartItemSelector() {
                return _cartItemSelector[_domain] || _cartItemSelector['localhost']
            }

            function getCartTotalSelector() {
                return _cartTotalSelector[_domain] || _cartTotalSelector['localhost']
            }

            function createCartData(html: cheerio.AnyNode[], total: number):SimpleCart {
                console.log('create cart data input: ', html)
                const cartItems:ProductVariantWithDetails[] = []
                
                const cartData: SimpleCart = {
                    cartItems: cartItems,
                    total: convertDollarsToWholeNumber(total)
                }
                html.forEach((item, index) => {
                    const $item = $(item)
                    const _item = {
                        name: $item.find(getDomData(_domain).name).text(),
                        basePrice: convertDollarsToWholeNumber($item.find(getDomData(_domain).basePrice).text()),
                        quantity: $item.find(getDomData(_domain).quantity).text() as unknown as number,
                        size: $item.find(getDomData(_domain).size).text() as unknown as number,
                        unit: $item.find(getDomData(_domain).unit).text(),
                        images: [{
                            id: index,
                            location: ($item.find(getDomData(_domain).images.location).attr('src') || '').match(/[^(.)].*/g)?.[0] as unknown as string
                        }],
                    }


                    console.log('item created from parseHtml: ', _item)
                    cartData.cartItems.push(_item as unknown as ProductVariantWithDetails)
                })
                console.log('cartData', cartData)
                return cartData
            }
        }
    }
    catch (error) {
        console.log(error)
        const cart: SimpleCart = {
            cartItems: [],
            total: 0
        }
        return cart
    }
}

export { crawler }

function getDispensaryDomain() {
    switch(true) {
        case window.location.href.includes('localhost'):
            return 'localhost'
        case window.location.href.includes('sunnyside'):
            return 'sunnyside'
        case window.location.href.includes('manasupply'):
            return 'mana-supply-company'
        default:
            return 'localhost'
    }
}