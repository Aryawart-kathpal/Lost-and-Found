const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'about', text: 'about' },
  { id: 3, url: 'items', text: 'items' },
  { id: 4, url: 'contact', text: 'contact' },
  {id:5,url:'profile',text:'profile'}
];

import { useSelector } from "react-redux";
import { NavLink,Link } from "react-router-dom"

const NavLinks = () => {
  const user = useSelector((state)=>state.userState.user);
  return (
    <>
      {links.map((link)=>{
        const {id,url,text} = link;
        if(id===5 && !user){
          return(
            <li key={id}>
              <Link to='/login' className="capitalize">Log In</Link>
            </li>
          )
        }
        return(
          <li key={id}>
            <Link to={url} className="capitalize">{text}</Link>
          </li>
        )
      })}
    </>
  )
}
export default NavLinks