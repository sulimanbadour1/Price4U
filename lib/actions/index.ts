'use server'

import { revalidatePath } from 'next/cache'

import { scrapeAmazonProduct } from "../scraper";
import { connectToDB } from "../mongoose";
import Product from "../models/product.model";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from '@/types';

// This file will be executed in the server side only
export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) return;

    try {
        connectToDB();

        const scrapedProduct = await scrapeAmazonProduct(productUrl);

        if (!scrapedProduct) return;

        let product = scrapedProduct;

        const existingProduct = await Product.findOne({ url: scrapedProduct.url });

        if (existingProduct) {
            const updatedPriceHistory: any = [
                ...existingProduct.priceHistory,
                { price: scrapedProduct.currentPrice }
            ]

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
            { upsert: true, new: true }
        );

        revalidatePath(`/products/${newProduct._id}`);
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`)
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


// get similar products
export async function getSimilarProducts(productId: string) {
    try {
        connectToDB();
        const currentPrice = await Product.findById({ _id: productId });
        if (!currentPrice) return;
        const similarProducts = await Product.find({
            _id: { $ne: productId },
        }).limit(4);
        return similarProducts;
    } catch (error: any) {
        console.log("Error getting similar products", error.message)
    }
};


export async function addUserEmailToProduct(productId: string, userEmail: string) {
    try {
        const product = await Product.findById(productId);

        if (!product) return;

        const userExists = product.users.some((user: User) => user.email === userEmail);

        if (!userExists) {
            product.users.push({ email: userEmail });

            await product.save();

            const emailContent = await generateEmailBody(product, "WELCOME");

            await sendEmail(emailContent, [userEmail]);
        }
    } catch (error) {
        console.log(error);
    }
}