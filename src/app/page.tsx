"use client";

import { useState } from "react";
import localFont from "next/font/local";

const myFont = localFont({ src: "./my-font.woff2" });

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [newProduct, setNewProduct] = useState<Product>({ id: 0, name: "", price: 0 });

  const addProduct = () => {
    // Check if product already exists
    const isDuplicate = products.some(
      (product) => product.id === newProduct.id
    );

    if (isDuplicate) {
      setError("This product is already listed.");
    } else {
      setProducts([...products, newProduct]);
      setError(""); // Clear the error if any
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <div className="container">
      <h1>Product List</h1>
      <div>
        <input
          type="number"
          name="id"
          placeholder="Product ID"
          value={newProduct.id}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
