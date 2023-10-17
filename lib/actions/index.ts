'use server'


import { connect } from "http2";
import { scrapeAmazaonProduct } from "../scraper";
import { connectToDB } from "../mongoose";
import Product from "../models/product.model";

// This file will be executed in the server side only
export async function scrapeAndStoreProduct(productURL: string) {
    // Your code here
    if (!productURL) return;

    try {
        // connect to the database
        connectToDB();

        const scrapedProduct = await scrapeAmazaonProduct(productURL);
        if (!scrapedProduct) return;

        // Save the product to the database
        let product = scrapedProduct;
        // check if the product already exists
        const existingProduct = await Product.findOne({ url: scrapedProduct.url });
        // Compare this snippet from lib/actions/index.ts:



    } catch (error: any) {
        throw new Error(`Error scraping product: ${error.message}`)

    }

}