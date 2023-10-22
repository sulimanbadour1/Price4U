'use server'

import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractCurrency, extractDescription, extractPrice } from '../ultils';

export async function scrapeAmazaonProduct(url: string) {
    // Logic to scrape the product
    if (!url) return;



    //BrightData Proxy configuration
    const username = String(process.env.BRGHT_DATA_USERNAME);
    const password = String(process.env.BRGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password: password,
        },
        host: 'brd.superproxy.io',
        port,
        rejecyUnauthorized: false,
    }

    try {
        // Fetch the product page
        const response = await axios.get(url, options);
        // console.log(response.data);
        const $ = cheerio.load(response.data);
        // Extract the data we need
        // scraping the title
        // Extract the product title
        const title = $('#productTitle').text().trim();
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('.a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
        );

        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
        );

        // check if the product is available
        const outOfStock = $('#availability span .a-color-state').text().trim().toLowerCase()
            === 'Currently unavailable.';

        // get the image
        const images =
            $('#imgBlkFront').attr('data-a-dynamic-image') ||
            $('#landingImage').attr('data-a-dynamic-image') ||
            '{}';

        const imageUrls = Object.keys(JSON.parse(images));

        const currency = extractCurrency($('.a-price-symbol'))

        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, '')
        const description = extractDescription($)


        // // Return the data
        // // console.log({ title, currentPrice, originalPrice, outOfStock, imageUrls, discountRate });
        // console.log({ title, currentPrice })


        // Construct the product object with the data we extracted and scraped
        const data = {
            url,
            currency: currency || '$',
            image: imageUrls[0],
            title,
            currentPrice: Number(currentPrice) || Number(originalPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory: [],
            discountRate: Number(discountRate),
            category: 'category',
            reviewsCount: 100,
            stars: 4.5,
            isOutOfStock: outOfStock,
            description,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice),
        }
        // console.log(data);
        return data;

    } catch (error: any) {
        throw new Error(`Failed to scrape the product: ${error.message}`)

    }
}