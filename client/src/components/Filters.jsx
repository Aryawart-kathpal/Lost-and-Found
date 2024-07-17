import { FaSearch } from "react-icons/fa";
import { Form, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Filters = () => {
    const {categories,locations,queryParams} = useLoaderData();
    const {search,order,category,location} = queryParams;

    const [checkValue,setCheckValue] = useState(order ?? 'latest');
    const navigation = useNavigate();

    // console.log(checkValue);
    const {search:searchVal,pathname} = useLocation();
    const handleOptionChange = (val)=>{
        
        const value = val === 'latest' ? 'latest' : 'oldest';
        setCheckValue(value);
        const searchParams = new URLSearchParams(searchVal);
        searchParams.set('order',value);
        navigation(`${pathname}?${searchParams.toString()}`);
    }

    

  return (
    
    <Form className="align-element bg-base-200 mb-4 p-4 rounded-md">
        <label className="input input-bordered flex items-center gap-2 ">
            <input type="text" name="search" className="grow" placeholder="Search" defaultValue={search ?? ''}/>
            <FaSearch/>
        </label>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-2 w-full lg:place-items-center">
            <label className="form-control">
                {/* <option value="">Select Category</option> */}
                <div className="label">
                    <span className="font-medium">Category</span>
                </div>
                <select name="category" defaultValue={category ?? 'all'} className="select select-sm select-secondary capitalize max-w-[12rem] md:max-w-[14rem] lg:max-w-[16rem]">
                    {categories.map((category)=>(
                        <option value={category} key={category}>{category}</option>
                    ))}
                </select>
            </label>

            <label className="form-control">
                {/* <option value="">Select Category</option> */}
                <div className="label">
                    <span className="font-medium">Location</span>
                </div>
                <select name="location" defaultValue={location ?? 'all'} className="select select-sm select-secondary capitalize max-w-[12rem] md:max-w-[14rem] lg:max-w-[16rem]">
                    {locations.map((location)=>(
                        <option value={location} key={location}>{location}</option>
                    ))}
                </select>
            </label>

            <div>
                <div className="grid items-center mt-2 grid-cols-2 lg:grid-cols-1 max-w-[10rem]">
                    <label className="font-medium">Order By</label>
                    <div className="flex">
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-2">
                                <div className="label-text">Latest</div>
                                <input type="radio" name="order" className="radio radio-sm checked:bg-red-500" checked={checkValue==='latest'} onChange={()=>handleOptionChange('latest')}/>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-2">
                                <span className="label-text">Oldest</span>
                                <input type="radio" name="order" className="radio radio-sm checked:bg-red-500" checked={checkValue==='oldest'} onChange={()=>handleOptionChange('oldest')}/>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-sm btn-secondary w-[10rem] mt-2">Search</button>
        </div>
        
    </Form>
  )
}
export default Filters