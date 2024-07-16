import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { FeaturedItems,UserTestimonials,Footer } from "../components";

export const loader = async({request}) =>{
  const featured = true;
  try {
    const response = await customFetch.get(`/items?featured=${featured}`)  
    // console.log(response.data.items);
    return {items: response.data.items}
  } catch (error) {
    const errorMessage = error?.response?.data?.msg;
    toast.error(errorMessage);
    return null;
  }
}

const Landing = () => {
  return (
    <div className="align-element">
      <FeaturedItems/>
      <UserTestimonials/>
    </div>
  )
}
export default Landing