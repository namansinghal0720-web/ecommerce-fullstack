import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [updateProduct, setUpdateProduct] = useState({
    id: "",
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    productAvailable: false,
    stockQuantity: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/product/${id}`);
      setUpdateProduct(res.data);

      try {
        const img = await axios.get(`/product/${id}/image`, {
          responseType: "blob",
        });

        setPreview(URL.createObjectURL(img.data));
      } catch (err) {
        console.log("No image found");
      }
    } catch (err) {
      console.log(err);
      alert("Unable to load product");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdateProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (e) => {
    setUpdateProduct((prev) => ({
      ...prev,
      productAvailable: e.target.checked,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      const product = {
        id: updateProduct.id,
        name: updateProduct.name,
        description: updateProduct.description,
        brand: updateProduct.brand,
        price: updateProduct.price,
        category: updateProduct.category,
        releaseDate: updateProduct.releaseDate,
        productAvailable: updateProduct.productAvailable,
        stockQuantity: updateProduct.stockQuantity,
      };

      formData.append(
        "product",
        new Blob([JSON.stringify(product)], {
          type: "application/json",
        })
      );

      if (image) {
        formData.append("imageFile", image);
      }

      await axios.put(`/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Updated Successfully");

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Failed to update product");
    }
  };

  return (
    <div className="update-product-container">
      <div className="center-container" style={{ marginTop: "7rem" }}>
        <h2>Update Product</h2>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label>Name</label>
            <input
              className="form-control"
              name="name"
              value={updateProduct.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>Brand</label>
            <input
              className="form-control"
              name="brand"
              value={updateProduct.brand}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label>Description</label>
            <textarea
              className="form-control"
              rows="3"
              name="description"
              value={updateProduct.description}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={updateProduct.price}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>Category</label>
            <select
              className="form-select"
              name="category"
              value={updateProduct.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphone">Headphone</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys">Toys</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          <div className="col-md-4">
            <label>Stock</label>
            <input
              type="number"
              className="form-control"
              name="stockQuantity"
              value={updateProduct.stockQuantity}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>Release Date</label>
            <input
              type="date"
              className="form-control"
              name="releaseDate"
              value={
                updateProduct.releaseDate
                  ? updateProduct.releaseDate.substring(0, 10)
                  : ""
              }
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 d-flex align-items-center">
            <div className="form-check mt-4">
              <input
                className="form-check-input"
                type="checkbox"
                checked={updateProduct.productAvailable}
                onChange={handleCheckbox}
              />
              <label className="form-check-label">
                Product Available
              </label>
            </div>
          </div>

          <div className="col-12">
            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{
                  width: "250px",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "15px",
                }}
              />
            )}

            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>

          <div className="col-12">
            <button className="btn btn-primary">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;