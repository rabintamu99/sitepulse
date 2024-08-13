"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ActivityIcon, Loader2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "./data-table";
import { columns } from "@/components/data-table/columns";
import { getFetchedWebsites } from "@/app/actions";
import { toast, Toaster } from 'react-hot-toast';
import { DataTableLoading } from "@/components/data-table/data-table-skeleton";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL").startsWith("https://", "URL must start with https://"),
  checkInterval: z.number().int().min(1, "Check interval must be at least 1 minute").max(60, "Check interval must not exceed 60 minutes"),
});

export default function Dashboard() {
  const [websites, setWebsites] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWebsite, setNewWebsite] = useState("");
  const [checkInterval, setCheckInterval] = useState(5); // Default to 5 minutes
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingWebsite, setIsAddingWebsite] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [formErrors, setFormErrors] = useState<{ url?: string; checkInterval?: string }>({});
  const { data: session } = useSession();

  useEffect(() => {
    const fetchWebsites = async () => {
      setIsLoading(true);
      const fetchedWebsites = await getFetchedWebsites();
      console.log("Fetched Websites:", fetchedWebsites); // Add this line
      setWebsites(fetchedWebsites ?? []);
      setIsLoading(false);
      setDataFetched(true);
    };
    fetchWebsites();
  }, [session]);

  
  const validateForm = () => {
    try {
      formSchema.parse({ url: newWebsite, checkInterval });
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors;
        setFormErrors(errors as { url?: string; checkInterval?: string });
      }
      return false;
    }
  };

  const addWebsiteToMonitor = async () => {
    if (!validateForm()) return;
    setIsAddingWebsite(true);
    toast.promise(
      axios.get('/api/monitor', {
        params: {
          url: newWebsite,
          checkInterval,
          userId: session?.user?.id
        }
      }),
      {
        loading: 'Adding website...',
        success: (response) => {
          const addedWebsite = response.data;
          setWebsites([...websites, addedWebsite]);
          setIsModalOpen(false);
          setNewWebsite("");
          setCheckInterval(5);
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
        <Button 
          variant={"outline"} 
          className="px-3 py-1 rounded-full" 
          onClick={() => {
            console.log("Opening modal");
            setIsModalOpen(true);
          }}
        >
          <ActivityIcon className="w-2 h-2 mr-2" />
          <span className="text-xs">Create Monitor</span>
        </Button>
      </div>
      {/* <WebsiteMonitorList website={websites} /> */}
      {dataFetched ? (
        websites.length > 0 ? (
          <DataTable data={websites} columns={columns}/>
        ) : (
          <p>No monitors.</p>
        )
      ) : (
        <DataTableLoading columnCount={2} />
      )}
      <Dialog open={isModalOpen} onOpenChange={(open) => {
        console.log("Dialog open state changed:", open);
        setIsModalOpen(open);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Website to Monitor</DialogTitle>
            <DialogDescription>Create a new monitor</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center p-4">
            <Label htmlFor="check-interval" className="text-lg self-start">Website URL</Label>
            <span className="text-sm my-1 mb-2 self-start">Frequency of how often your endpoint will be pinged.</span>
            <Input
              id="website-url"
              type="text"
              value={newWebsite}
              onChange={(e) => setNewWebsite(e.target.value)}
              placeholder="Enter website URL (https://...)"
              className="w-full mb-5"
            />
            {formErrors.url && <p className="text-red-500 text-sm self-start mb-2">{formErrors.url}</p>}
            
            <Label htmlFor="check-interval" className="text-lg self-start">Check Interval (minutes)</Label>
            <span className="text-sm my-1 mb-2 self-start">Frequency of how often your endpoint will be pinged.</span>
            <Select 
              onValueChange={(value) => setCheckInterval(Number(value))} 
              defaultValue="5"
            >
              <SelectTrigger className="w-full mb-2">
                <SelectValue placeholder="Select check interval" />
              </SelectTrigger>
              <SelectContent>
                {[1, 5, 10, 15, 30, 60].map((interval) => (
                  <SelectItem key={interval} value={interval.toString()}>
                    {interval === 5 ? 
                      `${interval} minutes (default)` : 
                      `${interval} minute${interval > 1 ? 's' : ''}`
                    }
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formErrors.checkInterval && <p className="text-red-500 text-sm self-start mb-2">{formErrors.checkInterval}</p>}
          </div>
          <DialogFooter>
            <Button 
              className="px-4 rounded-full mt-4" 
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}