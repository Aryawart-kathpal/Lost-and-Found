import { NavLink,Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { IoReorderThree,IoMoonSharp  } from "react-icons/io5";
import { IoIosNotificationsOutline} from "react-icons/io";
import { MdOutlineWbSunny } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/userSlice";

const Navbar = () => {

  const dispatch = useDispatch();

  const handleThemeChange = ()=>{
    dispatch(toggleTheme());
  }

  return (
    <div className="bg-base-200">
      <div className="navbar align-element">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <IoReorderThree className="text-2xl"/>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <NavLinks/>
        </ul>
        </div>
        
        <Link to="/" className="p-4 text-xl md:text-2xl font-medium hover:bg-primary hover:text-primary-content btn btn-ghost duration-300 grid place-content-center">
          <span>TrackBack</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-[1.1rem] font-medium">
          <NavLinks/>
        </ul>
      </div>

      <div className="navbar-end">
        <Link to='/profile' className="btn btn-ghost capitalize text-[1.1rem] ">Profile</Link>

        <label className="swap swap-rotate ml-3">
          <input type="checkbox" onChange={handleThemeChange}/>
          <MdOutlineWbSunny className="swap-off h-5 w-5 fill-current"/>
          <IoMoonSharp className="swap-on h-5 w-5 fill-current"/>
        </label>
          
        <div className="btn btn-ghost btn-circle ml-3">
          <div className="indicator">
            <IoIosNotificationsOutline className="text-2xl"/>
            <span className="badge badge-xs badge-primary indicator-item">5</span>
          </div>
        </div>
      </div>

    </div>
    </div>
  )
}
export default Navbar;