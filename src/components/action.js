import React from "react";
import "./usermodal.css";

const Action = ({
  serialNumber,
  name,
  title,
  background,
  status,
  submittedon,
  onClose,
}) => {
  return (
    <div className="modal-overlay w-[20%] ">
      <div className="modal">
        <div className="modal-header">
          <h2>Status</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
<div className="mt-6 mb-6">
{/* <!-- Stepper --> */}
<ul class="relative flex flex-col md:flex-row gap-2">
  {/* <!-- Item --> */}
  <li class="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block">
    <div class="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
      <span class="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-gray-700 dark:text-white">
        1
      </span>
      <div class="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-gray-200 group-last:hidden dark:bg-gray-700"></div>
    </div>
    <div class="grow md:grow-0 md:mt-3 pb-5">
      <span class="block text-sm font-medium text-gray-800 dark:text-black">
        Step
      </span>
      <p class="text-sm text-gray-500">
        HOD APPROVAL 
      </p>
    </div>
  </li>
  {/* <!-- End Item -->

  <!-- Item --> */}
  <li class="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block">
    <div class="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
      <span class="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-gray-700 dark:text-white">
        2
      </span>
      <div class="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-gray-200 group-last:hidden dark:bg-gray-700"></div>
    </div>
    <div class="grow md:grow-0 md:mt-3 pb-5">
      <span class="block text-sm font-medium text-gray-800 dark:text-black">
        Step
      </span>
      <p class="text-sm text-gray-500">
        ADI APPROVAL
      </p>
    </div>
  </li>
  {/* <!-- End Item --> */}

  {/* <!-- Item --> */}
  <li class="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block">
    <div class="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
      <span class="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-gray-700 dark:text-white">
        3
      </span>
      <div class="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-gray-200 group-last:hidden dark:bg-gray-700"></div>
    </div>
    <div class="grow md:grow-0 md:mt-3 pb-5">
      <span class="block text-sm font-medium text-gray-800 dark:text-black">
        Step
      </span>
      <p class="text-sm text-gray-500">
        COMMITTEE MEMBERS HAVE JOINED
      </p>
    </div>
  </li>
  {/* <!-- End Item --> */}
</ul>
{/* <!-- End Stepper --> */}
</div>
Committee members
<hr />
<ul class="max-w-xs flex flex-col">
  <li class="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white">
    person a
  </li>
  <li class="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white">
    Settings
  </li>
  <li class="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white">
    Newsletter
  </li>
</ul>
<button type="button" class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Members </button>
<hr />
Date for IPAC meeting
<hr /> 
  <input type="datetime-local" id="birthdaytime" name="birthdaytime"/>
  <button type="button" class="mt-3 ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Finalized Date </button>
  <hr />
  Final Comment
  <hr />
  <input type="text" id="comment" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Final Comment" required />
  <button type="button" class=" mt-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Post</button>
</div>
</div>
  );
};

export default Action;
