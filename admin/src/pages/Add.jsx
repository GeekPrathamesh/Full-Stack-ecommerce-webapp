import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const Add = () => {
  const [image, setimage] = useState(null);
  const [data, setdata] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });
  const onchange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("image", image);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/add`,
        formData
      );
      if (response.data.success) {
        setdata({ name: "", description: "", category: "Salad", price: "" });
        setimage(null);
        toast.success(response.data.message);
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
     toast.error(error.message);
    }
  };
  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);
  //   useEffect(() => {
  //     console.log(image);
  //   }, [image]);
  return (
    <div className="w-full p-6">
      <form
        onSubmit={onsubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto"
      >
        {/* Upload Image */}
        <div className="flex flex-col">
          <p className="mb-2 font-medium text-gray-700">Upload Image</p>
          <label
            htmlFor="uploadhere"
            className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg h-40 cursor-pointer hover:border-gray-400 transition"
          >
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload here"
              className="h-30"
            />
          </label>
          <input
            onChange={(e) => {
              setimage(e.target.files[0]);
            }}
            type="file"
            id="uploadhere"
            hidden
          />
        </div>

        {/* Product Name */}
        <div className="flex flex-col">
          <p className="mb-2 font-medium text-gray-700">Product Name</p>
          <input
            value={data.name}
            type="text"
            name="name"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-tomato hover:ring-tomato transition"
            placeholder="Type Text"
            onChange={onchange}
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col">
          <p className="mb-2 font-medium text-gray-700">Product Description</p>
          <textarea
            value={data.description}
            name="description"
            placeholder="Write content here"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-tomato hover:ring-tomato resize-none transition"
            rows={5}
            onChange={onchange}
          ></textarea>
        </div>

        {/* Product Category & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <p className="mb-2 font-medium text-gray-700">Product Category</p>
            <select
              name="category"
              onChange={onchange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-tomato hover:ring-tomato transition"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="flex flex-col">
            <p className="mb-2 font-medium text-gray-700">Product Price</p>
            <input
              name="price"
              value={data.price}
              onChange={onchange}
              placeholder="$20"
              type="number"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-tomato hover:ring-tomato transition"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-15 rounded-md transition"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
