"use client";
import React, { useState } from "react";
import axios from "axios";

export default function Nav() {
  return (
    <>
       <header className="antialiased">
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 shadow-md">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button id="toggleSidebar" aria-expanded="true" aria-controls="sidebar" className="hidden p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h14M1 6h14M1 11h7" />
                                </svg>
                            </button>
                            <button aria-expanded="true" aria-controls="sidebar" className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <svg className="w-[18px] h-[18px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                                <span className="sr-only">Toggle sidebar</span>
                            </button>
                            <a href="https://ipr.iitr.ac.in" className="flex mr-4">
                                <img src="https://ipr.iitr.ac.in/wp-content/uploads/2021/12/Logo-1-e1642711426899.png" className="h-8 mr-3" alt="FlowBite Logo" />
                            </a>
                            <form action="#" method="GET" className="hidden lg:block lg:pl-2">
                                <label htmlFor="topbar-search" className="sr-only">Search</label>
                                <div className="relative mt-1 lg:w-96">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="text" name="search" id="topbar-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" />
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center lg:order-2">
                            
                            <button aria-haspopup="true" className="relative ml-2">
                                <span className="sr-only">User Menu</span>
                                <img className="border-2 border-blue-600 rounded-full w-9 h-9 hover:border-blue-700" src="https://randomuser.me/api/portraits/men/10.jpg" alt="User" />
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

    </>
  )
}  