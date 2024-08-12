"use client";
import { Button } from "@/components/ui/button";
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
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import toast, { Toaster } from 'react-hot-toast';

export default function Dashboard() {
  const [websites, setWebsites] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWebsite, setNewWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingWebsite, setIsAddingWebsite] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchWebsites = async () => {
      setIsLoading(true);
      const fetchedWebsites = await getFetchedWebsites();
      console.log("fetchedWebsites", fetchedWebsites);
      setWebsites(fetchedWebsites ?? []);
      setIsLoading(false);
    };
    fetchWebsites();
  }, [session]);

  const addWebsiteToMonitor = async () => {
    setIsAddingWebsite(true);
    toast.promise(
      axios.get('/api/monitor?url=' + newWebsite + '&userId=' + session?.user?.id),
      {
        loading: 'Adding website...',
        success: (response) => {
          const addedWebsite = response.data;
          setWebsites([...websites, addedWebsite]);
          setIsModalOpen(false);
          setNewWebsite("");
          return <b>Website added successfully!</b>;
        },
        error: (error) => {
          console.error("Error adding website to monitor:", error);
          return <b>Could not add website.</b>;
        },
      }
    ).finally(() => {
      setIsAddingWebsite(false);
    });
  };

  return (
    <div className="flex flex-col gap-2 mx-10">
      <Toaster position="bottom-right" />
      <h1 className="sticky top-0 z-[10] flex items-start justify-start bg-background/50 text-3xl font-bold backdrop-blur-lg">
        <span>Monitors.</span>
      </h1>
      <div className="flex flex-col items-end self-end gap-2">
        <Button className="px-3 py-1 rounded-full" onClick={() => setIsModalOpen(true)}>
          <ActivityIcon className="w-2 h-2 mr-2" />
          <span className="text-xs">Create Monitor</span>
        </Button>
      </div>
      <DataTable data={websites} columns={columns} isLoading={isLoading} />
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
            <Button 
              className="px-4 rounded-full" 
              onClick={addWebsiteToMonitor}
              disabled={isAddingWebsite}
            >
              {isAddingWebsite ? (
                <>
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Website"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}