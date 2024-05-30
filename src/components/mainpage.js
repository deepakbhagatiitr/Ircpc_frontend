"use client";
import React, { use, useState,useEffect } from "react";
import { useRouter } from 'next/navigation';
import Avatar from "@mui/material/Avatar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export default function Mainpage(){
  const router = useRouter()
  const Logout=()=>{
    localStorage.clear()
    router.push('/signin')
  }
    return (
      <>
        <div className="w-[100vw] ">
          <div className="h-[8vh] bg-[#d7f1ff] flex items-center justify-between">
            <div className="px-[2vw] ">
              <img src="./img/logo.png" className="w-[24vw]" />
            </div>
            <div className="inline-flex border rounded w-4/12 px-2 lg:px-6 h-12 bg-transparent">
              <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                <input
                  type="text"
                  className=" bg-[#dbe3ff] flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-black rounded-md px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-[#a9acb1] font-thin"
                  placeholder="Enter your search term here"
                ></input>
              </div>
            </div>
            <div className="flex px-[2vw] ">
            <button onClick={Logout} type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
            </div>
          </div>
          <hr className="border-t-1 border-gray-500"></hr>
          {/* <div className="bg-white h-[10vh] flex justify-between items-center px-[10vw]">
            <div className="flex flex-col justify-center">
              <img src="./img/Dashboard.png" className="h-[4vh] w-14 ml-2" />
              <h2 className="">Dashboard</h2>
            </div>
            <div className="flex flex-col">
              <img src="./img/stat.png" className="h-[4vh] w-14 ml-2" />
              <h2 className="">Statistics</h2>
            </div>
            <div className="flex flex-col">
              <img src="./img/message.png" className="h-[4vh] w-14 ml-2" />
              <h2 className="">Messages</h2>
            </div>
            <div className="flex flex-col">
              <img src="./img/calender.png" className="h-[4vh] w-14 ml-2" />
              <h2 className="">Calender</h2>
            </div>
            <div className="flex flex-col">
              <img src="./img/report.png" className="h-[4vh] w-14 ml-2" />
              <h2 className="">Reports</h2>
            </div> */}
          {/* </div> */}
          <hr className="border-t-1 border-gray-500"></hr>
        </div>
      </>
    );
}