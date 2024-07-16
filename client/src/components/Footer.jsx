// title left, navigation links,social media icons,copyright info
import { FaGithub,FaLinkedin,FaRegCopyright  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
    const date = new Date(Date.now()).getFullYear();
  return (
    <div className="bg-base-300 pt-4 w-full">
        <div className="align-element flex justify-center gap-16 md:gap-32 lg:gap-48">
            <div>
                <span className="text-[1.75rem] bg-neutral p-2 rounded-lg text-neutral-content">TrackBack</span>
                <div className="flex justify-between">
                    <Link to='https://github.com/Aryawart-kathpal/Lost-and-Found'><FaGithub className="mt-3 text-2xl"/></Link>
                    <Link to='https://twitter.com/'><FaXTwitter  className="mt-3 text-2xl"/></Link>
                    <Link to='https://www.linkedin.com/in/aryawart-kathpal-617067288/'><FaLinkedin className="mt-3 text-2xl"/></Link>
                </div>
            </div>

            <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8">
                <li>
                    <Link to='/' className="hover:underline text-xl">Home</Link>
                </li>
                <li>
                    <Link to='/about' className="hover:underline text-xl">About</Link>
                </li>
                <li>
                    <Link to='/contact' className="hover:underline text-xl">Contact</Link>
                </li>
                <li>
                    <Link to='/items' className="hover:underline text-xl">Listings</Link>
                </li>
            </ul>
            {/* Social icons */}
            </div>
            <div className="bg-base-300 tracking-widest text-center mt-2">
                Copyrights <span><FaRegCopyright className="inline"/> Lost and Found {date}.</span>
                <p className="font-medium">Designed and Developed by Aryawart Kathpal</p>
            </div>
    </div>
  )
}

export default Footer