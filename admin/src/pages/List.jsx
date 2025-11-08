import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const List = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/food/list`);
      if (response.data.success) {
        setData(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch data");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = async (id) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/food/deleteitem`, { id });
      if (response.data.success) {
        toast.success("Item deleted successfully!");
        setData(data.filter((item) => item._id !== id));
      } else {
        toast.error(response.data.message || "Failed to delete item");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full p-4 sm:p-6">

        {!data.length>0 && <p className="text-center text-4xl">add items first to see food list..</p>}
      {/* Header row */}
      {data.length>0 && <div className="flex bg-gray-100 font-bold py-2 px-1 sm:py-3 sm:px-2 border-b border-gray-300 text-xs sm:text-base">
        <div className="w-1/5 text-center">Image</div>
        <div className="w-1/5 text-center">Name</div>
        <div className="w-1/5 text-center">Price</div>
        <div className="w-1/5 text-center">Category</div>
        <div className="w-1/5 text-center">Delete</div>
      </div>}

      {/* Data rows */}
      {data.map((item) => (
        <div
          key={item._id}
          className="flex items-center py-2 px-1 sm:py-3 sm:px-2 border-b border-gray-300 hover:bg-gray-50 transition text-xs sm:text-base"
        >
          <div className="w-1/5 flex justify-center">
            <img
              src={`${import.meta.env.VITE_API_URL}/images/${item.imageUrl}`}
              alt={item.name}
              className="h-8 sm:h-20"
            />
          </div>
          <div className="w-1/5 text-center">{item.name}</div>
          <div className="w-1/5 text-center">${item.price}</div>
          <div className="w-1/5 text-center">{item.category}</div>
          <div className="w-1/5 text-center">
            <button
              onClick={() => deleteItem(item._id)}
              className="bg-red-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
