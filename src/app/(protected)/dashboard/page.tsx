"use client";

import { Button } from "@/components/ui/button";
import MonitoringCard from "@/components/ui/monitoring-card";
import { ActivityIcon, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getFetchedWebsites } from "@/app/actions";
import Link from "next/link";
import DashboardComponent from "@/components/DashboardComponent";

export default function Dashboard() {
  const [websites, setWebsites] = useState<any[]>([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWebsite, setNewWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  
  useEffect(() => {
    const fetchWebsites = async () => {
      const fetchedWebsites = await getFetchedWebsites();
      console.log("fetchedWebsites", fetchedWebsites);
      setWebsites(fetchedWebsites ?? []);
    };
    fetchWebsites();
  }, [session]);

  const addWebsiteToMonitor = async () => {
    try {
      const response = await axios.get('/api/monitor?url=' + newWebsite + '&userId=' + session?.user?.id);
      const addedWebsite = response.data;
      setWebsites([...websites, addedWebsite]);
      setIsModalOpen(false);
      setNewWebsite("");
    } catch (error) {
      console.error("Error adding website to monitor:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 max-w-[1100px] mx-auto">
      <h1 className="sticky top-0 z-[10] flex items-start justify-start bg-background/50 text-2xl backdrop-blur-lg">
        <span>Welcome to SitePulse, {session?.user?.name ?? "Guest"} 👋🏻</span>
      </h1>
      <span>we are working 24/7 to monitor your website</span>
      <div className="flex flex-col items-end self-end gap-2">
        <Button className="px-4 rounded-full" onClick={() => setIsModalOpen(true)}>
          <ActivityIcon className="w-4 h-4 mr-2" />
          <span>Monitor Website</span>
        </Button>
      </div>
      {/* <DashboardComponent websites={websites} /> */}
      <div className="flex flex-col items-center mt-5">
        {websites.length === 0 ? (
             <>
             <h2 className="text-muted-foreground">No websites to monitor.</h2>
             <span className="text-muted-foreground">Add a website to get started.</span>
           </>
        ) : (
          websites.slice(0, 3).map((website, index) => (
            <MonitoringCard 
              id={website.id}
              siteName={website.url}
              status={website.status} 
              uptime={website.uptime} 
              responseTime={website.responseTime}
              updatedAt={website.updatedAt}
            />
          ))
        )}
      </div>
      {websites.length > 0 && (
        <div className="flex flex-col">
          <Link href="/monitors" className="text-muted-foreground">See all your websites →</Link>
        </div>
      )}

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
              {isLoading ? <Loader2Icon className="w-4 h-4 mr-2" /> : "Add Website"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}