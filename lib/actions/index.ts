'use server'

import { revalidatePath } from 'next/cache'

import { scrapeAmazaonProduct } from "../scraper";
import { connectToDB } from "../mongoose";
import Product from "../models/product.model";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../ultils";

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
        if (existingProduct) {
            const updatedPriceHistory: any = [...existingProduct.priceHistory, {
                price: scrapedProduct.currentPrice,
                date: Date.now()
            }];
            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),

            }
        }

        const newProduct = await Product.findOneAndUpdate(
            { url: scrapedProduct.url },
            product,
            { new: true, upsert: true },
        );
        revalidatePath(`/products/${newProduct._id}`);

    } catch (error: any) {
        throw new Error(`Error scraping product: ${error.message}`)

    }

}


// This file will be executed in the server side only
export async function getProductByID(productId: string) {
    try {
        // connect to the database
        connectToDB();
        const product = await Product.findOne({ _id: productId });
        if (!product) return;
        return product;
    } catch (error: any) {
        console.log("Error getting product by ID", error.message)

    }
}



// get all products
export async function getAllProducts() {
    try {
        connectToDB();
        const products = await Product.find();
        return products;
    } catch (error: any) {
        console.log("Error getting all products", error.message)
    }
};