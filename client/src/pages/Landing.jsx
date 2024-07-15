import { toast } from "react-toastify";
import { FaMagnifyingGlass } from "react-icons/fa6";


export const loader = async() =>{
  // toast.success('Welcome to the Home page');
  return null
}

const Landing = () => {
  return (
    <div className="w-full ">
      {/* Info */}
      <div>
        {/* <h1 className="tracking-widest font-bold text-3xl mb-8 text-accent">
          Find what You Lost, Reunite with what You Found
        </h1>
        <h3 className="text-2xl font-medium">
          Connecting lost Items with their owners on campus... <FaMagnifyingGlass />
        </h3> */}
      </div>
      <div className="relative">
        <img src="/hero.jpg" className="object-cover rounded opacity-10"/>
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <h1 className="tracking-widest font-bold sm:text-2xl md:text-3xl mb-8 text">
            Find what You Lost, Reunite with what You Found
          </h1>
        </div>
      </div>
    </div>
  )
}
export default Landing