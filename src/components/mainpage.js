"use client";
import React, { use, useState,useEffect } from "react";
import { useRouter } from 'next/navigation';
import Avatar from "@mui/material/Avatar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { FiLogOut } from 'react-icons/fi';
export default function Mainpage(){
  const router = useRouter()
  const Logout=()=>{
    localStorage.clear()
    router.push('/signin')
  }
    return (
      <>
         <div className="w-full">
        <div className="h-[10vh]  pr-4  bg-blue-100 flex items-center justify-between shadow-md">
        <div className="px-[1.1vw]">
            <img src="./img/logo.png" className="w-auto h-12 md:h-16 lg:h-20" alt="Logo" />
          </div>
          <div className="inline-flex w-4/12 h-12 px-2 bg-transparent border rounded lg:px-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-3 pl-10 pr-4 text-gray-700 bg-white border rounded-lg shadow-sm outline-none focus:outline-none focus:border-blue-500"
            />
            <svg
              className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>
          </div>
          <div className="relative group">
            <button
              type="button"
              onClick={Logout}
              className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none "
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>

          </div>
        </div>
        <hr className="border-gray-300" />
      </div>
      </>
    );
}