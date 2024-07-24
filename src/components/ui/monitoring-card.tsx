"use client";

import { ActivityIcon } from "lucide-react";
import Ripple from "../magicui/ripple";
import NumberTicker from "../magicui/number-ticker";
import { BiSolidLockAlt } from "react-icons/bi";

interface MonitoringCardProps {
    siteName: string;
    status: number;
    uptime: number;
    checkInterval: number;
    responseTime: number;
  }

const MonitoringCard = ({ siteName, status, uptime, responseTime }: MonitoringCardProps) => {
    return (
      <div className={`flex flex-col justify-center border ${status === 200 ? 'border-gray-700' : 'border-red-400'} p-4 gap-2 mb-2 rounded-lg shadow-sm w-[1200px] relative`}>
        <div className="flex justify-between items-center">
          <div className="flex flex-row items-center">
            <div className="flex relative">
              <span className={`w-3 h-3 ${status === 200 ? "bg-green-500" : "bg-red-500"} rounded-full`}></span> {/* Static dot */}
              <span className={`w-3 h-3 animate-ping ${status === 200 ? "bg-green-500" : "bg-red-500"} rounded-full absolute top-0 left-0`}></span> {/* Heartbeat */}
            </div>
            <div className="flex flex-col ml-5">
              <h5 className="font-medium flex items-center gap-2"><BiSolidLockAlt className="w-4 h-4 text-green-500" />{siteName}</h5>
              <p className="text-sm text-gray-500">
                <span className={status === 200 ? "text-green-500" : "text-red-500"}>
                  {status === 200 ? "Site is Up" : "Site is Down"}
                </span> 
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <ActivityIcon className="w-3 h-3 animate-pulse text-gray-500" />
            <p className="text-sm text-gray-500 animate-pulse"> <NumberTicker value={responseTime}/>ms</p>
            <button className="text-gray-500 hover:text-gray-700 ml-5">
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
          </div>
        </div>
        <div className="flex justify-center items-center my-2">
          <svg className="w-full h-8" viewBox="0 0 100 20" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="grey"
              strokeWidth="0.2"
              points="0,10 10,10 15,5 20,15 25,10 30,10 35,5 40,15 45,10 50,10 55,5 60,15 65,10 70,10 75,5 80,15 85,10 90,10 95,5 100,15"
              className="animate-pulse"
            />
          </svg>
        </div>
        <Ripple numCircles={10} mainCircleOpacity={0.3} mainCircleSize={1} />
      </div>
    );
  };
  
  export default MonitoringCard;  