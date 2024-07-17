import { Link, useRouteError } from "react-router-dom"

const Error = () => {
  const error = useRouteError();
  console.log(error);
  if(error.status===404){
    return (
      <div className="h-screen">
        <h1 className="text-center text-3xl mt-20">Error 404</h1>
        <p className="text-center text-xl mt-5">Page not found</p>
        <Link to='/' className="text-center block mt-5">Go back to home</Link>
      </div>
    )
  }
  return (
    <div className="h-screen">
      <h1 className="text-center text-3xl mt-20">Error 404</h1>
      <p className="text-center text-2xl mt-2">Page not found</p>
      <Link to='/' className="text-center block mt-5 hover:underline">Go back to home</Link>
    </div>
  )
}
export default Error