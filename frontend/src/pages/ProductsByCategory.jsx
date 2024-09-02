import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { message } from "antd";
import "./Products.css";
import { Link } from "react-router-dom";

const ProductsByCategory = () => {

  const { id:categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  

    const CategoryLinks = () => {
    return (
        <div>
        <Link to="/category/cuzdan">Cüzdanlar</Link>
        <Link to="/category/kartlik">Kartlıklar</Link>
        {/* Diğer kategoriler için de aynı şekilde */}
        </div>
    );
    };


  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products?category=${categoryId}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchProductsByCategory();
  }, [categoryId, apiUrl]);

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Kategoriye Göre Ürünler</h2>
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

export default ProductsByCategory;
