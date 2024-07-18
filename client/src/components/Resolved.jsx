import { customFetch } from "../utils";
import ItemsGrid from "./ItemsGrid"
import SectionTitle from "./SectionTitle";

export const loader = async()=>{
  const response =await customFetch.get('/users/current');
  const {items} = response.data.user;
  const resolvedItems = items.filter((item)=>item.status=='Resolved');
  return {items:resolvedItems};
}

const Resolved = () => {
  return (
    <div className="align-element mt-2">
      <SectionTitle text="Resolved Issues"/>
      <ItemsGrid/>
    </div>

  )
}
export default Resolved