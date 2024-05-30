import React from "react";
import AddPatentForm from "../../components/patents";
import Mainpage from "@/components/mainpage";
import Sidebar from "@/components/sidebar";
export default function Patent() {
  return (
    <>
    <div className="">
          <Mainpage />
          <div className="grid grid-cols-[auto,1fr] 	">
            <Sidebar className="min-h-screen" />
            <AddPatentForm />
          </div>
        </div>
    </>
  );
}
