import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { message } from "antd";
import "./Products.css";

const WalletProducts = () => {
  const [products, setProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products`);
        if (response.ok) {
          const data = await response.json();
          console.log("API'den gelen ürünler:", data); // Veriyi kontrol etmek için
          const filteredProducts = data.filter(
            (product) => product.category === "66c5cda87a0470cce5f0704b"
          );
          setProducts(filteredProducts);
          console.log("Filtrelenen ürünler:", filteredProducts); // Filtrelenen veriyi kontrol etmek için
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchProducts();
  }, [apiUrl]);

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Sırt Çantası</h2>
          <p>Summer Collection New Modern Design</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductItem productItem={product} key={product._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WalletProducts;
