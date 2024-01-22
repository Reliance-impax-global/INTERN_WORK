
import logo from './download.jpeg';
import { useState } from 'react';
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import Swal from 'sweetalert2';
import './App.css';
const toggle = () => {
  Swal.fire({
    title: "Try it",
    width: '800px',
    html: `
<div class="relative mb-6">
  <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
    </svg>
  </div>
  <input type="text" id="input-group-1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="name@rig-group.in">
  
</div>
<div class="relative mb-6">
  <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
  <svg aria-hidden="true" class="octicon octicon-mark-github" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
  </svg>
  </div>
  <input type="text" id="input-group-1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="name@rig-group.in">
  
</div>

<h3 class="mb-5  font-medium text-gray-900 text-left ">Choose technology:</h3>
<ul class="grid w-full gap-6 md:grid-cols-4">
    <li>
        <input type="checkbox" id="rebrand-option" value="" class="hidden peer" required="">
        <label for="rebrand-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-gray-100 border-2 border-gray-300 rounded-lg cursor-pointer light:hover:text-gray-300 light:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 light:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 light:text-gray-400 light:bg-gray-800 light:hover:bg-gray-700">                           
            <div class="block">
                <svg class="mb-2 w-7 h-7 text-sky-500" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z"/></svg>
                <div class="w-full text-lg font-semibold">Re-Brand</div>
                <div class="w-full text-sm">Rebrand the website based on the requirements</div>
            </div>
        </label>
    </li>
  
    <li>
        <input type="checkbox" id="Debug-option" value="" class="hidden peer">
        <label for="Debug-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-gray-100 border-2 border-gray-300 rounded-lg cursor-pointer light:hover:text-gray-300 light:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 light:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 light:text-gray-400 light:bg-gray-800 light:hover:bg-gray-700">
            <div class="block">
                <svg class="mb-2 text-green-400 w-7 h-7" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M356.9 64.3H280l-56 88.6-48-88.6H0L224 448 448 64.3h-91.1zm-301.2 32h53.8L224 294.5 338.4 96.3h53.8L224 384.5 55.7 96.3z"/></svg>
                <div class="w-full text-lg font-semibold">Debug</div>
                <div class="w-full text-sm">Having Issues With Code? We will fix it for you..</div>
            </div>
        </label>
    </li>
    <li>
        <input type="checkbox" id="runme-option" value="" class="hidden peer">
        <label for="runme-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-gray-100 border-2 border-gray-300 rounded-lg cursor-pointer light:hover:text-gray-300 light:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 light:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 light:text-gray-400 light:bg-gray-800 light:hover:bg-gray-700">
            <div class="block">
                <svg class="mb-2 text-green-400 w-7 h-7" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M356.9 64.3H280l-56 88.6-48-88.6H0L224 448 448 64.3h-91.1zm-301.2 32h53.8L224 294.5 338.4 96.3h53.8L224 384.5 55.7 96.3z"/></svg>
                <div class="w-full text-lg font-semibold">Runme</div>
                <div class="w-full text-sm">We will generate a Script to run it easily on the go.</div>
            </div>
        </label>
    </li>
    <li>
        <input type="checkbox" id="hosting-option" value="" class="hidden peer">
        <label for="hosting-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-gray-100 border-2 border-gray-300 rounded-lg cursor-pointer light:hover:text-gray-300 light:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 light:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 light:text-gray-400 light:bg-gray-800 light:hover:bg-gray-700">
            <div class="block">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" height="40px" width="40px" version="1.1" viewBox="0 0 448 512" enable-background="new 0 0 395 395">
  <g>
    <path d="m43.503,56.519c-1.98,0-3.91,0.8-5.31,2.2-1.39,1.39-2.19,3.33-2.19,5.3 0,1.97 0.8,3.91 2.19,5.3 1.4,1.4 3.33,2.2 5.31,2.2 1.97,0 3.9-0.8 5.3-2.2 1.4-1.39 2.2-3.33 2.2-5.3 0-1.97-0.8-3.91-2.2-5.3-1.4-1.4-3.33-2.2-5.3-2.2z"/>
    <path d="m72.803,58.719c-1.4-1.4-3.33-2.2-5.3-2.2-1.98,0-3.91,0.8-5.31,2.2-1.39,1.39-2.19,3.33-2.19,5.3 0,1.97 0.8,3.91 2.19,5.3 1.4,1.4 3.33,2.2 5.31,2.2 1.97,0 3.9-0.8 5.3-2.2 1.4-1.39 2.2-3.33 2.2-5.3 0-1.97-0.8-3.91-2.2-5.3z"/>
    <path d="m43.503,189.999c-1.98,0-3.91,0.8-5.31,2.2-1.39,1.39-2.19,3.33-2.19,5.3 0,1.97 0.8,3.91 2.19,5.3 1.4,1.4 3.33,2.2 5.31,2.2 1.97,0 3.9-0.8 5.3-2.2 1.4-1.39 2.2-3.33 2.2-5.3 0-1.97-0.8-3.91-2.2-5.3-1.4-1.4-3.33-2.2-5.3-2.2z"/>
    <path d="m72.803,192.199c-1.4-1.4-3.33-2.2-5.3-2.2-1.98,0-3.91,0.8-5.31,2.2-1.39,1.39-2.19,3.33-2.19,5.3 0,1.98 0.8,3.91 2.19,5.3 1.4,1.4 3.33,2.2 5.31,2.2 1.97,0 3.9-0.8 5.3-2.2 1.4-1.39 2.2-3.32 2.2-5.3 0-1.97-0.8-3.91-2.2-5.3z"/>
    <path d="m43.503,323.479c-1.98,0-3.91,0.8-5.31,2.2-1.39,1.39-2.19,3.33-2.19,5.3 0,1.98 0.8,3.91 2.19,5.3 1.4,1.4 3.33,2.2 5.31,2.2 1.97,0 3.9-0.8 5.3-2.2 1.4-1.39 2.2-3.33 2.2-5.3 0-1.97-0.8-3.9-2.2-5.3-1.4-1.4-3.33-2.2-5.3-2.2z"/>
    <path d="m72.803,325.679c-1.4-1.4-3.33-2.2-5.3-2.2-1.98,0-3.91,0.8-5.31,2.2-1.39,1.4-2.19,3.33-2.19,5.3 0,1.97 0.8,3.91 2.19,5.3 1.4,1.4 3.33,2.2 5.31,2.2 1.97,0 3.9-0.8 5.3-2.2 1.4-1.39 2.2-3.32 2.2-5.3 0-1.97-0.8-3.91-2.2-5.3z"/>
    <path d="M387.5,123.038c4.143,0,7.5-3.358,7.5-7.5V12.5c0-4.142-3.357-7.5-7.5-7.5H7.5C3.358,5,0,8.358,0,12.5v103.038   c0,4.142,3.358,7.5,7.5,7.5h21.87v15.443H7.5c-4.142,0-7.5,3.358-7.5,7.5v103.038c0,4.142,3.358,7.5,7.5,7.5h21.87v15.443H7.5   c-4.142,0-7.5,3.358-7.5,7.5V382.5c0,4.142,3.358,7.5,7.5,7.5h380c4.143,0,7.5-3.358,7.5-7.5V279.462c0-4.142-3.357-7.5-7.5-7.5   h-21.87v-15.443h21.87c4.143,0,7.5-3.358,7.5-7.5V145.981c0-4.142-3.357-7.5-7.5-7.5h-21.87v-15.443H387.5z M380,108.038h-39.166   V20H380V108.038z M286.823,108.038V20h39.011v88.038H286.823z M15,20h256.823v88.038H15V20z M15,153.481h256.823v88.038H15V153.481   z M286.823,241.519v-88.038h39.011v88.038H286.823z M15,286.962h256.823V375H15V286.962z M325.834,286.962V375h-39.011v-88.038   H325.834z M380,375h-39.166v-88.038H380V375z M350.63,271.962H44.37v-15.443h306.26V271.962z M380,241.519h-39.166v-88.038H380   V241.519z M350.63,138.481H44.37v-15.443h306.26V138.481z"/>
  </g>
</svg>
                <div class="w-full text-lg font-semibold">Hosting</div>
                <div class="w-full text-sm"> Issues Setting Up? We will setup and Host it For you</div>
            </div>
        </label>
    </li>
</ul>
<div class="grid gap-6 mb-15 md:grid-cols-2">
    <div class="text-left "> <!-- Added mb-4 (or any other value) class here -->
        <label for="website" class="block mb-2 text-sm font-medium text-gray-900 light:text-white">Image URL</label>
        <input type="url" id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500" placeholder="rig-group.in" required>
    </div>
    <div class="text-left"> <!-- Added text-left class here -->
        <label for="credits" class="block mb-2 text-sm font-medium text-gray-900 light:text-white">Credits</label>
        <input type="text" id="credits" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500" placeholder="rig-group" required>
    </div>
</div>

    `,
    showCancelButton: true,
    confirmButtonText: "Submit",
    cancelButtonText: "Cancel",
    showLoaderOnConfirm: true,
    didOpen: () => {
      Swal.getHtmlContainer().querySelector('#input-group-1').focus();
      Swal.getHtmlContainer().querySelector('#credits').disabled = true;
      Swal.getHtmlContainer().querySelector('#website').disabled = true;
      // add event listener to rebrand-option
      Swal.getHtmlContainer().querySelector('#rebrand-option').addEventListener('change', (e) => {
        if (e.target.checked) {
          // enable credits input
          Swal.getHtmlContainer().querySelector('#credits').disabled = false;
          Swal.getHtmlContainer().querySelector('#website').disabled = false;
        }else{
          Swal.getHtmlContainer().querySelector('#credits').disabled = true;
          Swal.getHtmlContainer().querySelector('#website').disabled = true;
        }
      });

    },
    
    preConfirm: () => {
      return fetch(`//api.github.com/users/1`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
         setTimeout(()=>{
           Swal.fire({
            title:"Success",
            icon:"success",
            text:"Your request has been submitted successfully you will recieve a mail shortly",

          })
         },500)
          
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
});

}
function NavBar(){
  return <Navbar fluid rounded>
  <NavbarBrand href="https://rig-group.in">
    <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
    <span className="self-center whitespace-nowrap text-xl font-semibold text-white">Rig-Group</span>
  </NavbarBrand>
  <div className="flex md:order-2">
    <Button 
    onClick={toggle}
    >Get started</Button>
    <NavbarToggle />
  </div>
  <NavbarCollapse>
    <NavbarLink href="#" active>
      Home
    </NavbarLink>
    <NavbarLink href="#">Services</NavbarLink>

  </NavbarCollapse>
</Navbar>
}
function App() {
  return (
    <>
    <NavBar />
    <div className="flex">
  <div className="flex items-center justify-start w-1/2">
    <img src="gpt.jpg" alt="logo" />
  </div>
  
<div className="flex flex-col items-start justify-center w-2/5 p-8">
  <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">
    Dev-gpt
  </h1>
  <p className="text-base text-gray-700 mb-4 whitespace-pre-line">
  As the Dev-gpt team, we're dedicated to enhancing your digital experience. Our top-tier tool automates various tasks, from setting up systems to fixing bugs. We also offer hosting services, ensuring your applications run smoothly. Additionally, we provide customized website rebranding, aligning your site with your specific needs. Our goal is to simplify your digital journey with comprehensive solutions.  </p>

</div>


</div>







    </>
  );
}



export default App;
