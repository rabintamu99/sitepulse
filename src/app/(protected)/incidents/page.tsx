import React from 'react'
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { BsFillExclamationTriangleFill, BsCheckCircleFill, BsClockFill } from "react-icons/bs";

export default async function IncidentPage() {
    const session = await auth();
    const userId = session?.user?.id;

    const incidents = await prisma.incident.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            startedAt: 'desc'
        },
        select: {
            id: true,
            description: true,
            website: {
                select: {
                    url: true
                }
            },
            startedAt: true,
            resolvedAt: true,
            status: true,
        }
    });

    const formattedIncidents = incidents.map(incident => ({
        ...incident,
        id: incident.id.toString(), // Convert id to string
        websiteUrl: incident.website.url,
        startedAt: incident.startedAt.toISOString(), // Convert Date to string
        resolvedAt: incident.resolvedAt?.toISOString() // Convert Date to string if it exists
    }));

    const ongoingIncident = formattedIncidents.find(incident => !incident.resolvedAt);

    return (
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Incidents<span className='text-red-500'>.</span></h1>
        <div className="space-y-4 h-96 overflow-y-auto"> {/* Added height and overflow */}
          {ongoingIncident && (
            <IncidentCard incident={ongoingIncident} isOngoing={true} />
          )}
          {formattedIncidents.length > 0 ? (
            formattedIncidents.map((incident) => (
              incident.resolvedAt && <IncidentCard key={incident.id} incident={incident} />
            ))
          ) : (
            <div className='flex justify-center items-center gap-4 bg-gray-100 rounded-lg p-6'>
              <BsFillExclamationTriangleFill className='text-3xl text-red-500' />
              <h2 className='text-gray-500'>No incidents reported at this time.</h2>
            </div>
          )}
        </div>
      </div>
    )
}

type Incident = {
  id: string;
  description: string;
  websiteUrl: string;
  startedAt: string;
  resolvedAt?: string;
  status: string;
};

function IncidentCard({ incident, isOngoing = false }: { incident: Incident, isOngoing?: boolean }) {
  return (
    <div className={`rounded-lg p-6 shadow-md overflow-y-auto ${isOngoing ? 'bg-red-50 border border-red-200' : 'bg-white'}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{incident.description}</h3>
        <StatusBadge status={incident.status} />
      </div>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Website:</span> {incident.websiteUrl}
      </p>
      <div className="flex items-center text-sm text-gray-500">
        <BsClockFill className="mr-2" />
        Started: {new Date(incident.startedAt).toLocaleString()}
      </div>
      {incident.resolvedAt && (
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <BsCheckCircleFill className="mr-2 text-green-500" />
          Resolved: {new Date(incident.resolvedAt).toLocaleString()}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800';
      case 'monitoring':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}