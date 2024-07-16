import { Navbar } from "../components"
import {Loading} from "../components"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"

const HomeLayout = () => {
  const navigate = useNavigate();
  const isLoading = navigate.state === 'loading';
  const location = useLocation();
  return (
    <>
      <Navbar/>
      {location.pathname === '/'?
        <div className="relative">
        <img src="/hero.jpg" className="object-cover rounded opacity-40 w-full h-[70vh]"/>
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
            <h1 className="tracking-widest font-bold text-xl md:text-2xl lg:text-3xl">
              Find what You Lost
            </h1>
            <h1 className="tracking-widest font-bold text-xl md:text-2xl mb-8 lg:text-3xl">Reunite with what You Found</h1>
            <div className="flex justify-center gap-3 mt-[-0.75rem]">
              <button className="btn btn-outline btn-neutral btn-sm md:text-[1rem]">
                <Link to="/items">Find Listings</Link>
              </button>
              <button className="btn btn-outline btn-sm btn-neutral md:text-[1rem]">
                <Link to="/items">Get Started</Link>
              </button>
            </div>
          </div>
      </div>:null
      }
      {isLoading?<Loading/>:
        <section className="align-element py-20">
          <Outlet/>
        </section>}
    </>
  )
}

export default HomeLayout