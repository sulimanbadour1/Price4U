import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface props {
  product: Product;
}
const ProductCard = ({ product }: props) => {
  return (
    <Link className="product-card" href={`/products/${product._id}`}>
      <div className="product-card_img-container">
        <Image
          src={product.image}
          width={200}
          height={200}
          alt={product.title}
          className="product-card-image"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="product-title">{product.title}</h3>
        <div className="flex justify-between">
          <p className="text-black opacity-50 text-lg capitalize">
            {product.category}
          </p>
          <p className="text-black text-lg font-semibold">
            <span>{product?.currency}</span>
            <span>{product.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
