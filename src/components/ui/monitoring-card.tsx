"use client";

import { ActivityIcon } from "lucide-react";
import Ripple from "../magicui/ripple";

interface MonitoringCardProps {
    siteName: string;
    status: string;
    uptime: string;
    checkInterval: string;
    responseTime: number;
  }

const MonitoringCard = ({ siteName, status, uptime, checkInterval, responseTime }: MonitoringCardProps) => {
    return (
      <div className="flex flex-col justify-center border border-gray-700 p-4 gap-2 mb-2 rounded-lg shadow-sm w-[1000px] relative">
        <div className="flex justify-between items-center">
          <div className="flex flex-row items-center">
            <div className="flex relative">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span> {/* Static dot */}
              <span className="w-3 h-3 animate-ping bg-green-500 rounded-full absolute top-0 left-0"></span> {/* Heartbeat */}
            </div>
            <div className="flex flex-col ml-5">
              <h5 className="font-medium">{siteName}</h5>
              <p className="text-sm text-gray-500">
                <span className="text-green-500">{status}</span> · {uptime}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <ActivityIcon className="w-3 h-3 animate-pulse text-gray-500" />
            <p className="text-sm text-gray-500 animate-pulse">{responseTime}</p>
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
