// import * as cheerio from 'cheerio'

const crawler = async () => {
    try {
        if (typeof window !== 'undefined') {
            const _url = window.location.href
            const response = await fetch(_url)
            const html = await response.text()
            console.log(html)
            // const $ = cheerio.load(html)
            
            // const title = $('title').text()
            // const description = $('meta[name="description"]').attr('content')
            // const image = $('meta[property="og:image"]').attr('content')
            
            // return { title, description, image }
        } else throw new Error('window is not available')
    }
    catch (error) {
        console.log(error)
    }
}

export { crawler }
