import { Navbar } from "../components"
import {Loading} from "../components"
import { Outlet, useNavigate } from "react-router-dom"

const HomeLayout = () => {
  const navigate = useNavigate();
  const isLoading = navigate.state === 'loading';
  return (
    <>
      <Navbar/>
      {isLoading?<Loading/>:
        <section className="">
          <Outlet/>
        </section>}
    </>
  )
}

export default HomeLayout