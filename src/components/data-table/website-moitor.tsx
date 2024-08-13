
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Website {
  id: string;
  url: string;
  status: string;
  lastChecked: string;
}

interface WebsiteMonitorTableProps {
  websites: Website[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function WebsiteMonitorTable({ websites, onEdit, onDelete }: WebsiteMonitorTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>URL</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Checked</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {websites.map((website) => (
          <TableRow key={website.id}>
            <TableCell>{website.url}</TableCell>
            <TableCell>{website.status}</TableCell>
            <TableCell>{website.lastChecked}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" onClick={() => onEdit(website.id)}>
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(website.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}