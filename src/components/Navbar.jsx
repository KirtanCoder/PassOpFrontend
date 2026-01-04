import React from "react";

export default function Navbar() {
  return (

      <nav className="bg-slate-600 flex justify-between items-center 
sticky top-0 z-50 px-4 py-2">
        <div className="mx-4 font-bold text-blue-500"> PassOP</div>
        <ul>
          <li className="flex gap-4">
            <a href="#" className="hover:font-bold">Home</a>
            <a href="#" className="hover:font-bold">About</a>
            <a href="#" className="mx-3 hover:font-bold">Contact</a>
          </li>
        </ul>
      </nav>

  );
}
