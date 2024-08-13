// components/WebsiteMonitorList.tsx
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import WebsiteMonitorTable  from './website-moitor'; // Corrected the import statement

interface Website {
  id: string;
  url: string;
  status: string;
  lastChecked: string;
}

const ITEMS_PER_PAGE = 10;

export default function WebsiteMonitorList() {
  const [websites, setWebsites] = useState<Website[]>([
    // Add some dummy data here
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredWebsites = websites.filter(website =>
    website.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWebsites.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentWebsites = filteredWebsites.slice(startIndex, endIndex);

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log(`Edit website with id: ${id}`);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    setWebsites(websites.filter(website => website.id !== id));
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Search websites..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <WebsiteMonitorTable
        websites={currentWebsites}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => setCurrentPage(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}