import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Select } from "antd";

function App() {
  const [data, setData] = useState({
    name: "",
    category: "",
  });
  const [category, setCategory] = useState([]);
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3248/api/categories");
    
      if (response.status === 200) {
        setCategory(response.data);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3248/api/products");
        if (response.status === 200) {
          const productsData = response.data.map((product) => {
            const categoryId = product.category;
            const foundCategory = category.find((item) => item._id === categoryId);
  
            return {
              ...product,
              categoryName: foundCategory ? foundCategory.name : "", // categoryName alanını ekleyin
            };
          });
  
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Veri hatası:", error.message);
      }
    };
  
    fetchData();
  }, [category]);
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const response = await axios.post("http://localhost:3248/api/products", data);

    if (response.status === 200) {
      console.log(response);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setData({ ...data, category: value });
  };

  return (
    <>
<div>
    {product.map((product) => (
      <div key={product._id}>
        <p>Product Name: {product.name}</p>
        <p>Category Name: {product.categoryName}</p>
      </div>
    ))}
  </div>
      <form onSubmit={handleSubmit}>
        <label>Ürün adı:</label>
        <input type="text" name="name" onChange={handleChange} />
        <label>Kategoriler:</label>
        <Select  onChange={handleSelectChange}>
          {category.map((category) => (
            <Select.Option value={category._id} key={category._id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
        <button type="submit">Yolla</button>
      </form>
    </>
  );
}

export default App;
