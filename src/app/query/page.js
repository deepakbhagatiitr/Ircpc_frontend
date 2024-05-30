import React from "react";
import Query from "@/components/queries";
import Sidebar from "@/components/sidebar";
import Mainpage from "@/components/mainpage";

export default function signin(){
    return (
      <>
        <div className="">
          <Mainpage />
          <div className="grid grid-cols-[auto,1fr] 	">
            <Sidebar />
            <Query className="h-[90%]"/>
          </div>
        </div>
      </>
    );
}