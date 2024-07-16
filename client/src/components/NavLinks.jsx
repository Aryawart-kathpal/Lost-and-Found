const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'about', text: 'about' },
  { id: 3, url: 'items', text: 'items' },
  { id: 4, url: 'contact', text: 'contact' },
  {id:5,url:'login',text:'profile'}
];

import { NavLink,Link } from "react-router-dom"

const NavLinks = () => {
  return (
    <>
      {links.map((link)=>{
        const {id,url,text} = link;
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