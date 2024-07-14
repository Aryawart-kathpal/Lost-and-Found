import { toast } from "react-toastify"
import { customFetch } from "../utils"
import { redirect } from "react-router-dom";
// import {}

export const loader = async({request})=>{
    const queryParams = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
    console.log(queryParams);
    try {
        const response = await customFetch.get(`/auth/verify-email?token=${queryParams.token}&email=${queryParams.email}`);
        toast.success(response?.data?.msg);
        return redirect('/login');
    } catch (error) {   
        console.log(error);
        const errorMessage = error?.response?.data?.msg || 'An error occurred';
        toast.error(errorMessage);
        return redirect('/');
    }
}

const VerifyEmail = () => {
  return (
    <div>VerifyEmail</div>
  )
}
export default VerifyEmail