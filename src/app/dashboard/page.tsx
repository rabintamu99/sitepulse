"use client";

import AddWebsite from "@/components/AddWebsite";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto p-4 fadeIn">
      <div className="flex flex-col items-center justify-center h-screen mx-auto p-4 fadeIn">
        <AddWebsite />
      </div>
    </div>
  );
}
