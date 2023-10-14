'use server'

import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractPrice } from '../ultils';

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
        const title = $('#productTitle').text().trim();
        const currentPrice = extractPrice();

    } catch (error: any) {
        throw new Error(`Failed to scrape the product: ${error.message}`)

    }
}