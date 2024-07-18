import { useLoaderData } from "react-router-dom";
import ProfileCard from "./ProfileCard";
const ProfileGrid = () => {
    const {items}  = useLoaderData();
    // console.log(items);
    return (
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 place-items-center h-full">
        {items?.map((item)=>{
          return <ProfileCard key={item._id} item={item}/>
        })}
      </div>
    )
}
export default ProfileGrid