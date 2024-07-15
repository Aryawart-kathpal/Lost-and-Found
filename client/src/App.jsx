import {RouterProvider,createBrowserRouter}  from "react-router-dom";
import { HomeLayout,Error, Landing, Login, Register,VerifyEmail,ResetPassword,About,Items,Contact, Profile } from "./pages";
import { ErrorElement } from "./components";

//loaders
import { loader as verifyEmailLoader } from "./pages/VerifyEmail";
import { loader as resetPasswordLoader } from "./pages/ResetPassword";
import {loader as landingLoader} from "./pages/Landing";

//actions
import {action as loginAction} from "./pages/Login";
import {action as registerAction} from "./pages/Register";
import { action as resetPasswordAction } from "./pages/ResetPassword";

import { store } from "./store";

const router = createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout/>,
    errorElement:<Error/>,
    children:[
      {
        index:true,
        element:<Landing/>,
        errorElement: <ErrorElement/>,
        loader:landingLoader,
      },
      {
        path:'/about',
        element:<About/>,
        errorElement:<ErrorElement/>,
      },
      {
        path:'/items',
        element:<Items/>,
        errorElement:<ErrorElement/>,
      },
      {
        path:'/contact',
        element:<Contact/>,
        errorElement:<ErrorElement/>, 
      },
      {
        path : '/profile',
        element : <Profile/>,
        errorElement:<ErrorElement/>,
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>,
    errorElement:<Error/>,
    action:loginAction(store),
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
