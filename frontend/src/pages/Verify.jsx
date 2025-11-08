import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Verify = () => {
  const [searchparams] = useSearchParams();
  const success = searchparams.get("success");
  const orderId = searchparams.get("orderId");
  const navigate=useNavigate()
  console.log(success, orderId);

  const verify=async()=>{
    const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/order/verify`,{success,orderId});
    if(res.data.success){
navigate("/myorders")
    }
    else{
        navigate("/")
    }
  }

  useEffect(()=>{
    verify();
  },[])

  return (
    <div className="flex justify-center items-center h-[50vh]">
      {/* Spinner */}
      <div className="h-[100px] w-[100px] border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
    </div>
  )
}

export default Verify
