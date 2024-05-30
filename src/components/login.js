"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from 'next/link';
import './style.css'

export default function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   function redirector() {
     const client_id = "Tm3HosWalwv6u2659Z2NNJVrix9dzlakb24ITtvV";
     const url = "https://channeli.in/oauth/authorise/?client_id=" + client_id;
     window.location = url;
   }
    const handleLogin = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });
        if (response.data.success) {
          console.log(response.data);
          if (typeof window !== 'undefined') {
            // Code that uses localStorage
            localStorage.setItem('userdata',JSON.stringify(response.data));
          }

           window.location.href = "/"; 
           
        } else {
          setError("Invalid credentials");
        }
      } catch (error) {
        console.error("Error during login:", error.message);
        setError("Login failed. Please try again.");
      }
    };
    function redirector(){
      const client_id = "ghTOIagj0bWyje4tT33ooKMbGiSmbwL7oD0LdlpM";
      const url ='https://channeli.in/oauth/authorise/?client_id='+client_id
      window.location = url
  }

  return (
    <>
  <section className='myclassName'>

<link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
<link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />



<div className="w-full px-4 pt-6 mx-auto lg:w-4/12">
  <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-blueGray-200">
    <div className="px-6 py-6 mb-0 rounded-t">
      <div className="mb-3 text-center">
        <h6 className="text-sm font-bold text-blueGray-500">
          Login in with
        </h6>
      </div>
      <div className="text-center btn-wrapper">
        <button onClick={redirector} className="inline-flex items-center px-4 py-2 mb-1 mr-2 text-xs font-normal font-bold uppercase transition-all duration-150 ease-linear bg-white rounded shadow outline-none active:bg-blueGray-50 text-blueGray-700 focus:outline-none hover:shadow-md" type="button">
          <img alt="..." className="w-5 mr-1" src="https://channeli.in/branding/site/logo.svg" />Channel-i</button>

      </div>
      <hr className="mt-6 border-b-1 border-blueGray-300" />
    </div>
    <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
      <div className="mb-3 font-bold text-center text-blueGray-400">
        <small>Or Login in with credentials</small>
      </div>
      <form>
        <div className="relative w-full mb-3">
          <label className="block mb-2 text-xs font-bold uppercase text-blueGray-600" for="grid-password">Email</label><input value={email} type="email" className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="relative w-full mb-3">
          <label className="block mb-2 text-xs font-bold uppercase text-blueGray-600" for="grid-password">Password</label><input value={password} type="password" className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mt-6 text-center">
          <button onClick={handleLogin} className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-blueGray-800 active:bg-blueGray-600 hover:shadow-lg focus:outline-none" type="button"> Log In </button>
        </div>
        <div className="mb-3 text-center">
        <h6 className="text-sm font-bold text-blueGray-500">
          Do not have account<Link href="/signup">
            <div className="text-[#907656]">Signup here!</div>
          </Link>
        </h6>
      </div>
      </form>
    </div>
  </div>
</div>
</section>
    </>
  );
}
