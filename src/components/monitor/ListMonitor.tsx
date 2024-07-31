"use client";

import { ActivityIcon } from "lucide-react";
import Ripple from "../magicui/ripple";
import NumberTicker from "../magicui/number-ticker";
import { BiSolidLockAlt } from "react-icons/bi";

interface MonitorTableProps {
  siteName: string;
  status: number;
  uptime: number;
  checkInterval: number;
  responseTime: number;
}

const MonitorTable = ({ monitors = [] }: { monitors: MonitorTableProps[] }) => {
  if (monitors.length === 0) {
    return <div className="text-center py-4">No monitors available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Site Name</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Response Time</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {monitors.map((monitor, index) => (
            <tr key={index} className={`border ${monitor.status === 200 ? 'border-gray-700' : 'border-red-400'} mb-2 rounded-lg shadow-sm`}>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <div className="flex relative">
                    <span className={`w-3 h-3 ${monitor.status === 200 ? "bg-green-500" : "bg-red-500"} rounded-full`}></span> {/* Static dot */}
                    <span className={`w-3 h-3 animate-ping ${monitor.status === 200 ? "bg-green-500" : "bg-red-500"} rounded-full absolute top-0 left-0`}></span> {/* Heartbeat */}
                  </div>
                  <div className="flex flex-col ml-5">
                    <h5 className="font-medium flex items-center gap-2"><BiSolidLockAlt className="w-4 h-4 text-green-500" />{monitor.siteName}</h5>
                    <p className="text-sm text-gray-500">
                      <span className={monitor.status === 200 ? "text-green-500" : "text-red-500"}>
                        {monitor.status === 200 ? "Site is Up" : "Site is Down"}
                      </span> 
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2 text-center">
                <ActivityIcon className="w-3 h-3 animate-pulse text-gray-500" />
              </td>
              <td className="px-4 py-2 text-center">
                <NumberTicker value={monitor.responseTime}/>ms
              </td>
              <td className="px-4 py-2 text-center">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.75 4.75h12.5m-12.5 6.5h12.5m-12.5 6.5h12.5"
                    ></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonitorTable;