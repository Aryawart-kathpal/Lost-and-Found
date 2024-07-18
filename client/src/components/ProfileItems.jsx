import { useLoaderData,Form, useNavigate, useNavigation } from "react-router-dom";
import ProfileGrid from "./ProfileGrid";
import SectionTitle from "./SectionTitle";
import { FaPlusSquare } from "react-icons/fa";
import { FiMessageSquare, FiPlusSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { customFetch } from "../utils";
import Loading from "./Loading";

const ProfileItems = () => {
    const {locations,categories,branches} = useLoaderData();
    // console.log(locations,categories,branches);
    // console.log(user);
    const navigation = useNavigation();
    const navigate = useNavigate();
    const [imageURL,setImageURL] = useState(null);
    const handleImageUpload = async(e)=>{
        e.preventDefault();
        const fileInput = document.querySelector('input[name="image"]');
        const formData= new FormData();
        formData.append('image',fileInput.files[0]);
    
        const toastId = toast.loading("Uploading Image...");
    
        try {
          const response = await customFetch.post('/items/upload-image',formData);
          setImageURL(response.data.image);
          // toast.success('Image uploaded successfully');
          toast.update(toastId,{render:'Image uploaded successfully',type:'success',isLoading:false,autoClose:2000});
          // loading toast
          return null;
        } catch (error) {
            const errorMessage = error?.response?.data?.msg || 'An error occurred';
            toast.update(toastId,{render:errorMessage,type:'error',isLoading:false,autoClose:2000});
            return null;
        }
    }

    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        

        if(!imageURL){
            toast.error('Please upload an image');  
        }
        formData.set('thumbnail',imageURL);
        const data = Object.fromEntries(formData);
        const toastId = toast.loading('Creating Item...');

        try {
            const response = await customFetch.post('/items',data);

            toast.update(toastId,{render:response.data.msg,type:'success',isLoading:false,autoClose:2000});

            document.getElementById('create').close();
            navigate('/profile/items');
        } catch (error) {
            const errorMessage = error?.response?.data?.msg || 'An error occurred';
            toast.update(toastId,{render:errorMessage,type:'error',isLoading:false,autoClose:2000});
            
            document.getElementById('create').close();
            return null;
        }
    }

    const isLoading = navigation.state === 'loading';
    if(isLoading){
        return <Loading/>
    }

  return (
    <div className="align-element mt-2">
        <SectionTitle text='Your Listings'/>
        <div className="flex w-full justify-between items-center">
          <Link to='#' className="btn btn-ghost btn-sm md:btn-xl">
            <FiMessageSquare className="inline-block mr-[-0.3rem]"/>Inbox
          </Link>

            <button className="btn btn-ghost btn-sm md:btn-xl" onClick={()=>document.getElementById('create').showModal()}>
                <FiPlusSquare className="inline-block mr-[-0.3rem]"/> Create Item
            </button>
            <dialog id="create" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>  
                    <h2 className="w-full text-center font-medium text-xl">Create Item</h2>
                    <Form className="mt-4" method="post" onSubmit={handleFormSubmit}>
                        <label className="form-control w-full max-w-xs">
                            <div className="label mb-[-0.3rem]">
                            <span className="label-text font-medium">Title</span>
                            </div>
                            <input type="text" name="title"  className="input input-bordered w-full max-w-xs input-sm"/>
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label mb-[-0.3rem]">
                                <span className="label-text font-medium ">
                                    Type
                                </span>
                            </div>
                            <select name="type" className="select select-bordered select-sm">
                                    <option disabled selected>Select Type</option>
                                    <option>Lost</option>
                                    <option>Found</option>
                            </select>
                        </label>

                        <label className="form-control">
                        <div className="label">
                            <span className="label-text font-medium">
                                Description
                            </span>
                        </div>
                        <textarea type="textarea" name="description" className="textarea textarea-bordered h-24"></textarea>
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label mb-[-0.3rem]">
                                <span className="label-text font-medium">Category</span>
                            </div>
                            <select name="category" className="select select-bordered select-sm">
                            <option disabled selected>Select Category</option>
                            {categories.map((category)=>{
                                return(
                                    <option key={category}>{category}</option>
                                )
                            })}
                            </select>
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label mb-[-0.3rem]">
                                <span className="label-text font-medium">Location</span>
                            </div>
                            <select name="location" className="select select-bordered select-sm">
                                <option disabled selected>Select Location</option>
                                {locations.map((location)=>{
                                    return(
                                        <option key={location}>{location}</option>
                                    )
                                })}
                            </select>
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label mb-[-0.3rem]">
                                <span className="label-text font-medium">Date</span>
                            </div>
                            <input type="date" name="date" className="input input-bordered input-sm"/>
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                            <span className="label-text mb-[-0.3rem] font-medium">Thumbnail Image</span>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                            <input type="file" name="image" className="file-input file-input-bordered w-full max-w-xs file-input-sm"/>
                            <button className="btn btn-neutral btn-xs w-12" onClick={handleImageUpload}>Add</button>
                            </div>
                        </label>

                        <div className="w-full text-center mt-2">
                        <button type="submit" className="btn btn-neutral btn-sm w-32">Submit</button>
                        </div>

                    </Form>
                </div>
            </dialog>

        </div>
        <ProfileGrid/>
    </div>
  )
}
export default ProfileItems

// <Form className="mt-4" method="post">
{/* 





</Form> */}