import React, { useRef, useState } from 'react';
import { Form, redirect,useNavigation } from "react-router-dom";
import { FormInput,SubmitBtn } from '../components';  // Make sure the path is correct
import { MdEmail } from "react-icons/md";
import { FaKey,FaGoogle } from "react-icons/fa";
import {customFetch} from "../utils";
import {toast} from "react-toastify";
import { loginUser } from '../features/userSlice';

export const action = (store)=>async({request})=>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const {email,password} = data;
  try {
    const response = await customFetch.post('/auth/login',{email,password});
    // console.log(response.data.user);
    store.dispatch(loginUser(response.data));
    toast.success("User Successfully Logged In");
    return redirect('/');
  } catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.msg || 'An error occurred';
    toast.error(errorMessage);
    return null;
  }
}

const Login = () => {

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const [forgotEmail,setForgotEmail] = useState('');
  const handleSendRequest = async()=>{
    try {
      const response = await customFetch.post('/auth/forgot-password',{email:forgotEmail});
      toast.success(response?.data?.msg);
      document.getElementById('modal').close();
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.msg || 'An error occurred';
      toast.error(errorMessage);
    }
  }

  const handleGoogleSignIn = ()=>{
    window.location.href= 'http://localhost:5000/api/v1/auth/google';//**CORRECT IT LATER */
  }

  return (
    <section className="h-screen grid place-items-center">
      <Form className="card bg-base-300 w-96 shadow-xl hover:shadow-2xl duration-300" method='post'>
        <div className="card-body items-center">
          <h2 className="card-title text-2xl pb-4">
            Login
          </h2>
          <FormInput name="email" type="email" label="Email" Icon={MdEmail}/>
          <FormInput name="password" type="password" label="Password" Icon={FaKey}/>
          <div className="justify-end self-end mt-[-0.5rem]">
            {/* Forgot password modal */}

            <button className='text-primary hover:text-secondary' onClick={()=>document.getElementById('modal').showModal()} type='button'>Forgot password</button>

            <dialog id="modal" className='modal'>
              <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
                <h2 className="font-bold text-lg text-center mb-4">Forgot Password</h2>
                <h3 className='font-medium mb-2 pl-4'>Enter your Email Below</h3>

                <label htmlFor="forgot" className="input input-bordered flex items-center gap-2 input-primary w-full">
                  <MdEmail/>
                  <input type="email" name="forgot" className="grow" id="forgot" value={forgotEmail}  onChange={(e)=>setForgotEmail(e.target.value)}/>
                </label>

                <button type="button" className='btn btn-accent mt-2' onClick={handleSendRequest}>
                  {isSubmitting?<span className="loading loading-spinner"></span>:'Send Request'}
                </button>
              </div>
            </dialog>

          </div>
          <SubmitBtn text="Login"/>
          <button type="button" className='btn btn-neutral btn-block mt-2' onClick={handleGoogleSignIn}>
            <FaGoogle/>
            Sign in With Google
          </button>
        </div>
      </Form>
    </section>
  );
};

export default Login;
