import { toast } from "react-toastify";
import { ItemsGrid,Filters } from "../components"
import { customFetch } from "../utils";
import { Link, useLoaderData, useLocation, useNavigate, useNavigation } from "react-router-dom";
import {Loading,PaginationContainer} from "../components";

export const loader = async({request})=>{

  const queryParams = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  // console.log(queryParams);

  try {
    const response = await customFetch('/items',{params:queryParams});
    // console.log(response.data);
    return {items : response.data.items,pagination:response.data.pagination,categories :response.data.categories,queryParams,locations : response.data.locations};

  } catch (error) {

    const errorMessage = error?.response?.data?.msg;
    toast.error(errorMessage);
    return null;
  }
}

const Items = () => {

  const navigate = useNavigate();
  const {search,pathname} = useLocation();
  // console.log(search);
  // console.log(pathname);
  const handleLostAndFound = (val)=>{
    // console.log(val);
    const searchParams = new URLSearchParams(search);
    searchParams.set('type',val);
    // console.log(`${pathname}?${searchParams.toString()}`);
    navigate(`${pathname}?${searchParams.toString()}`);
  }  

  const {queryParams} = useLoaderData();

  const  navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="align-element">
      <Filters/>
      <div className={`w-full flex justify-end`}>
        <button onClick={()=>handleLostAndFound('Lost')} className={`btn btn-ghost rounded-3xl ${queryParams.type === 'Lost'?'btn-active':''}`}>LOST</button>
        <button onClick={()=>handleLostAndFound('Found')} className={`btn btn-ghost rounded-3xl ${queryParams.type === 'Found'?'btn-active':''}`}>FOUND</button>
      </div>
      {isLoading?<Loading/>:<>
        <ItemsGrid/>
        <PaginationContainer/>
      </>}
      
    </div>
  )
}
export default Items