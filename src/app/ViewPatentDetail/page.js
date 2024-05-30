"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
export default function ViewPatentDetail(){
    const [id, setId] = useState(null);
    const[mail,setMail] = useState(false);
    const [patent, setPatent] = useState({});
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      setId(id);
      console.log(id);
      if (id) {
        fetchPatentDetails(id); // Fetch patent details if id is available
      }
      },[id]);
       const fetchPatentDetails = async (patentId) => {
         try {
           const response = await axios.get(
             `http://localhost:5000/api/profiles/patent/${patentId}`
           );
           setPatent(response.data);
         } catch (error) {
           console.error("Error fetching patent details:", error);
         }
       };
       const approvePatent = async (patentId,committeeMemberId) => {
         try {
           await axios.put(
             `http://localhost:5000/api/profiles/accept-committee/${patentId}/${committeeMemberId}`
           );
           
           // Optionally, update UI or navigate to another page after approval
         } catch (error) {
           console.error("Error approving patent:", error);
         }
       };

       const rejectPatent = async (patentId,committeeMemberId) => {
         try {
           await axios.put(
             `http://localhost:5000/api/profiles/reject-committee/${patentId}/${committeeMemberId}`
           );
           
           // Optionally, update UI or navigate to another page after rejection
         } catch (error) {
           console.error("Error rejecting patent:", error);
         }
       };
       const FormCommittee = async (patentId) => {
         try {
           await axios.put(
             `http://localhost:5000/api/profiles/send-emailto-committee/${patentId}`
           );
          setMail(true);
           
         } catch (error) {
           console.error("Error rejecting patent:", error);
         }
       };

     return (
       <>
         {patent ? (
           <div className="w-[100vw] min-h-screen mx-auto p-6 bg-white shadow-md rounded-lg flex items-center justify-center">
             <div className="border-l border-b border-r border-t border-gray-600 p-10">
               <div className="text-3xl font-bold mb-4">Patent Details</div>
               <div className="text-2xl font-semibold mb-2">
                 Applicant Name :
                 <span className="text-xl font-normal text-">
                   {" "}
                   {patent.inventor?.name}
                 </span>
               </div>
               <div className="text-2xl font-semibold mb-2">
                 Applicant background :
                 <span className="text-xl font-normal text-">
                   {patent.inventor?.background}
                 </span>
               </div>
               <div className="text-2xl font-semibold mb-2">
                 Title of the Patent:
                 <span className="text-xl font-normal text-">
                   {" "}
                   {patent.title}
                 </span>
               </div>
               <div className="text-2xl font-semibold mb-2">
                 Field of Innovation :
                 <span className="text-xl font-normal text-">
                   {patent.fieldOfInvention}
                 </span>
               </div>
               <div className="text-3xl font-bold mb-2">
                 Committee Member Details
                 {patent && patent.committeeMembers && (
                   <ul>
                     {patent.committeeMembers.map((member) => (
                       <li key={member._id}>
                         <div className="text-2xl font-semibold mb-2">
                           Name:
                           <span className="text-xl font-normal text-">
                             {" "}
                             {member.name}
                           </span>
                         </div>
                         <div className="text-2xl font-semibold mb-2">
                           Email ID:
                           <span className="text-xl font-normal text-">
                             {" "}
                             {member.email}
                           </span>
                         </div>
                         <div className="text-2xl font-semibold mb-2">
                           department:
                           <span className="text-xl font-normal text-">
                             {" "}
                             {member.department}
                           </span>
                         </div>
                         <div className="flex space-x-4">
                           <button
                             className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-2xl"
                             onClick={() =>
                               approvePatent(patent._id, member._id)
                             }
                           >
                             Confirm
                           </button>
                           <button
                             className="bg-red-500 hover:bg-red-300 text-white py-2 px-4 rounded text-2xl"
                             onClick={() =>
                               rejectPatent(patent._id, member._id)
                             }
                           >
                             Delete
                           </button>
                         </div>
                       </li>
                     ))}
                   </ul>
                 )}
               </div>
               {mail ? (
                 <button
                   className="mt-5 font-bold bg-black hover:bg-green-600 text-white py-2 px-4 rounded text-2xl "
                 >
                   Committee's Formed
                 </button>
               ) : (
                 <button
                   onClick={() => FormCommittee(patent._id)}
                   className="mt-5 font-bold bg-black hover:bg-green-600 text-white py-2 px-4 rounded text-2xl "
                 >
                   Form Committee
                 </button>
               )}
             </div>
           </div>
         ) : (
           <p>loading...</p>
         )}
       </>
     );
    }