import React from "react";
import './services.css'; // Import the CSS file

const ServicesMenu = () => {
  return (
    <div className="bg-white p-6 shadow-lg w-[800px] h-[550px] relative rounded-lg"> 
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-bold text-white bg-red-700 p-3 rounded-md shadow-md">PERIODIC MAINTENANCE</h3>
          <ul className="list-none space-y-3 mt-2">
            <li className="text-gray-700">Washing </li>
            <li className="text-gray-700">Lube Services</li>
            <li className="text-gray-700">Exterior & Interior Detailing</li>
            <li className="text-gray-700">Engine Tune-ups</li>
            <li className="text-gray-700">Inspection Reports</li>
            <li className="text-gray-700">Waxing</li>
            <li className="text-gray-700">Undercarriage Degreasing</li>
            <li className="text-gray-700">Windscreen Treatments</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white bg-red-700 p-3 rounded-md shadow-md">COLLISION REPAIRS</h3>
          <ul className="list-none space-y-3 mt-2">
            <li className="text-gray-700">Wheel Alignment</li>
            <li className="text-gray-700">Full Paints</li>
            <li className="text-gray-700">Part Replacements</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white bg-red-700 p-3 rounded-md shadow-md mt-2">TYRE SERVICES</h3>
          <ul className="list-none space-y-3 mt-2">
            <li className="text-gray-700">Battery Services</li>
            <li className="text-gray-700">Tyre Replacements</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white bg-red-700 p-3 rounded-md shadow-md mt-2">MECHANICAL REPAIR</h3>
          <ul className="list-none space-y-3 mt-2">
            <li className="text-gray-700">Spare Parts Replacements</li>
            <li className="text-gray-700">Hybrid Services</li>
          </ul>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-red-700 rounded-b-lg"></div>
    </div>
  );
};

export default ServicesMenu;
