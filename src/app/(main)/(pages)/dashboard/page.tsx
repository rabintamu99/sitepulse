"use client";

import { Button } from "@/components/ui/button";
import MonitoringCard from "@/components/ui/monitoring-card";
import { ActivityIcon } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog"; // Assuming you have a Modal component

export default function Dashboard(props) {
  const [websites, setWebsites] = useState([
    { siteName: "Facebook.com", status: "Up", uptime: "99.9%", checkInterval: "5 minutes", responseTime: 20 }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWebsite, setNewWebsite] = useState("");

  const addWebsiteToMonitor = async () => {
    try {
      const response = await axios.get('/api/monitor?url=' + newWebsite);
      const addedWebsite = response.data;
      console.log(addedWebsite);
      console.log(addedWebsite.responseTime);
      console.log(addedWebsite.siteName);
      setWebsites([...websites, addedWebsite]);
      setIsModalOpen(false);
      setNewWebsite("");
    } catch (error) {
      console.error("Error adding website to monitor:", error);
    }
  };

  console.log(websites);
  return (
    <div className="flex flex-col gap-2 max-w-[1000px] mx-auto mt-5">
      <h1 className="sticky top-0 z-[10] flex items-start justify-start bg-background/50 text-2xl backdrop-blur-lg">
        <span>Welcome to SitePulse , Rabin👋🏻</span>
      </h1>
      <span>we are working 24/7 to monitor your website</span>
      <div className="flex flex-col items-end self-end gap-2">
        <Button className="px-4 rounded-full" onClick={() => setIsModalOpen(true)}>
          <ActivityIcon className="w-4 h-4 mr-2" />
          <span>Monitor Website</span>
        </Button>
      </div>
      <div className="flex flex-col items-center mt-5">
        {websites.map((website, index) => (
          <MonitoringCard 
            key={index}
            siteName={website.siteName}
            status={website.status} 
            uptime={website.uptime} 
            checkInterval={website.checkInterval} 
            responseTime={website.responseTime}
          />
        ))}
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Website to Monitor</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center p-4 ">
            <input
              type="text"
              value={newWebsite.startsWith("https://") ? newWebsite : `https://${newWebsite}`}
              onChange={(e) => setNewWebsite(e.target.value)}
              placeholder="Enter website URL"
              className="border border-gray-700 bg-background/50 rounded-lg p-2 w-full mb-4 focus:outline-none"
            />
            <Button className="px-4 rounded-full" onClick={addWebsiteToMonitor}>
              Add Website
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}