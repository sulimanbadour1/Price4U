import { getProductByID } from "@/lib/actions";
import { redirect } from "next/navigation";

import { type } from "os";
import React from "react";
type props = {
  params: { id: string };
};
const ProductDetails = async ({ params: { id } }: props) => {
  const product = await getProductByID(id);
  if (!product) redirect("/");
  return <div>{product.title}</div>;
};

export default ProductDetails;
