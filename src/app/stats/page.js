import React from "react";
import Stats from "@/components/statistic";
import Sidebar from "@/components/sidebar";
import Mainpage from "@/components/mainpage";

export default function signin(){
    return (
      <> 
      <Mainpage/>
        <div className="grid grid-cols-[auto,1fr]">
          <Sidebar />
          <Stats />
        </div>
      </>
    );
}