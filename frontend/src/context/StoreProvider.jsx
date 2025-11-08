import { useEffect, useState } from "react";
import Storecontext from "./Storecontext";
import axios from "axios";
import { toast } from "react-toastify";

const StorecontextProvider = ({ children }) => {

  const [cartitems, setcartitems] = useState({});
 const [food_list,setfood_list] =useState([])

 const fetchFoddlist=async()=>{
  const response =await axios.get(`${import.meta.env.VITE_API_URL}/api/food/list`);
  if(response.data.success){
    setfood_list(response.data.data)
  }
 }
  useEffect(()=>{
async function loadData() {
  await fetchFoddlist()
  await cartItemsFetch()
}
loadData()
  },[])

  const cartItemsFetch=async()=>{
 try {
    const token = localStorage.getItem("token");

      if(!token){
      toast.error("Login please");
      return
    }
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/cart/getcart`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
      }
    );

    if (response.data.success) {
      // Convert array of IDs into object {id: quantity}
      const itemsArray = response.data.cartItems;
      const itemsObj = itemsArray.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      }, {});

      setcartitems(itemsObj);
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Failed to add item to cart");
  }
  }

const addtoCart = async (id) => {
  try {
      const token = localStorage.getItem("token");

    if(!token){
      toast.error("Login please");
      return
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/cart/add`,
      { itemId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      toast.success("Item added to cart successfully");
       setcartitems(prev => ({
    ...prev,
    [id]: (prev[id] || 0) + 1
  }));
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Failed to add item to cart");
  }
};


  const removefromCart = async(id) => {
     try {
        const token = localStorage.getItem("token");

          if(!token){
      toast.error("Login please");
      return
    }
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/cart/remove`,
      { itemId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      toast.success("Item deleted from cart successfully");
       setcartitems(prev => ({
    ...prev,
    [id]: (prev[id] || 0) - 1
  }));
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Failed to add item to cart");
  }
  };

const cartTotal = () => {
  let totalAmount = 0;

  // Loop through each itemId in cartitems
  for (const itemId in cartitems) {
    const quantity = cartitems[itemId];
    const itemInfo = food_list.find((product) => product._id === itemId);

    if (itemInfo) {
      totalAmount += itemInfo.price * quantity;
    }
  }

  return totalAmount;
};



  const storemenu = {
    food_list,
    cartitems,
    addtoCart,
    removefromCart,
    cartTotal,
    cartItemsFetch
  };

  useEffect(() => {
    console.log(cartitems);
  }, [cartitems]);

  return (
    <Storecontext.Provider value={storemenu}>{children}</Storecontext.Provider>
  );
};
export default StorecontextProvider;
