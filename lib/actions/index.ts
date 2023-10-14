'use server'


import { scrapeAmazaonProduct } from "../scraper";

// This file will be executed in the server side only
export async function scrapeAndStoreProduct(productURL: string) {
    // Your code here
    if (!productURL) return;

    try {
        const scrapedProduct = await scrapeAmazaonProduct(productURL);

    } catch (error: any) {
        throw new Error(`Error scraping product: ${error.message}`)

    }

}