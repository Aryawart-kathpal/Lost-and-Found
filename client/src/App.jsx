import {RouterProvider,createBrowserRouter}  from "react-router-dom";
import { HomeLayout,Error, Landing, Login, Register,VerifyEmail,ResetPassword } from "./pages";
import { ErrorElement } from "./components";

//loaders
import { loader as verifyEmailLoader } from "./pages/VerifyEmail";
import { loader as resetPasswordLoader } from "./pages/ResetPassword";

//actions
import {action as loginAction} from "./pages/Login";
import {action as registerAction} from "./pages/Register";
import { action as resetPasswordAction } from "./pages/ResetPassword";

const router = createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout/>,
    errorElement:<Error/>,
    children:[
      {
        index:true,
        element:<Landing/>,
        errorElement: <ErrorElement/>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>,
    errorElement:<Error/>,
    action:loginAction,
  },
  {
    path:'register',
    element:<Register/>,
    errorElement:<Error/>,
    action:registerAction,
  },
  {
    path:'/reset-password',
    element:<ResetPassword/>,
    errorElement:<Error/>,
    loader:resetPasswordLoader,
    action:resetPasswordAction,
  },
  {
    path:'verify-email',
    element:<VerifyEmail/>,
    errorElement:<Error/>,
    loader:verifyEmailLoader,
  }
]);

function App() {
  return(
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
