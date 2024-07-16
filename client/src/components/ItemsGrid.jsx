import { useLoaderData } from "react-router-dom"
import ItemCard from "./ItemCard";

const ItemsGrid = () => {
  const {items}  = useLoaderData();
  // console.log(items);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4 place-items-center h-full">
      {items?.map((item)=>{
        return <ItemCard key={item._id} item={item}/>
      })}
    </div>
  )
}
export default ItemsGrid