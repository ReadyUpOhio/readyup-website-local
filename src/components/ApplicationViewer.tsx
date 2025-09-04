import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// The full application type, based on db.js schema
export interface ApplicationFull {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  position?: string;
  cover_letter?: string;
  resume_name?: string;
  resume_data_url?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  start_date?: string;
  desired_pay?: string;
  availability_type?: string;
  hours_per_week?: string;
  work_auth?: string;
  over_18?: boolean | number;
  has_transport?: boolean | number;
  website?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  experience_summary?: string;
  last_employer?: string;
  last_title?: string;
  last_employment_dates?: string;
  reference_name?: string;
  reference_phone?: string;
  availability_notes?: string;
  consent?: boolean | number;
  status?: string | null;
  archived_at?: string | null;
}

interface ApplicationViewerProps {
  application: ApplicationFull | null;
  onClose: () => void;
}

const DetailItem = ({ label, value }: { label: string; value?: string | number | null | boolean }) => {
  if (value === null || value === undefined || value === '') return null;
  return (
    <div>
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <p className="text-base whitespace-pre-wrap">{String(value)}</p>
    </div>
  );
};

export const ApplicationViewer = ({ application, onClose }: ApplicationViewerProps) => {
  const isOpen = !!application;

  if (!application) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Application from: {application.name}</DialogTitle>
          <DialogDescription>
            For position: {application.position || 'N/A'} • Submitted on {new Date(application.created_at).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4 max-h-[70vh] overflow-y-auto">
          <DetailItem label="Applicant Name" value={application.name} />
          <DetailItem label="Email" value={application.email} />
          <DetailItem label="Phone" value={application.phone} />
          <DetailItem label="Address" value={`${application.address || ''}, ${application.city || ''}, ${application.state || ''} ${application.zip || ''}`.replace(/^, |, $/g, '')} />
          <DetailItem label="Position Applied For" value={application.position} />
          <DetailItem label="Desired Pay" value={application.desired_pay} />
          <DetailItem label="Start Date" value={application.start_date} />
          <DetailItem label="Availability" value={application.availability_type ? `${application.availability_type} (${application.hours_per_week} hrs/wk)` : ''} />
          
          <div className="col-span-full">
            <h3 className="text-lg font-semibold mt-4 mb-2">Cover Letter</h3>
            <p className="text-base whitespace-pre-wrap">{application.cover_letter || 'N/A'}</p>
          </div>

          <div className="col-span-full">
            <h3 className="text-lg font-semibold mt-4 mb-2">Experience</h3>
            <p className="text-base whitespace-pre-wrap">{application.experience_summary || 'N/A'}</p>
          </div>

          <DetailItem label="Last Employer" value={application.last_employer} />
          <DetailItem label="Last Title" value={application.last_title} />
          <DetailItem label="Employment Dates" value={application.last_employment_dates} />

          <div className="col-span-full">
            <h3 className="text-lg font-semibold mt-4 mb-2">Links</h3>
            <div className="flex flex-col gap-2">
              <DetailItem label="Website" value={application.website} />
              <DetailItem label="LinkedIn" value={application.linkedin} />
              <DetailItem label="GitHub" value={application.github} />
              <DetailItem label="Portfolio" value={application.portfolio} />
            </div>
          </div>
          
          {application.resume_name && (
            <div className="col-span-full mt-4">
              <h3 className="text-lg font-semibold mb-2">Resume</h3>
              <a href={application.resume_data_url} download={application.resume_name} className="text-blue-400 hover:underline">
                {application.resume_name}
              </a>
            </div>
          )}

          <div className="col-span-full">
            <h3 className="text-lg font-semibold mt-4 mb-2">References</h3>
            <DetailItem label="Reference Name" value={application.reference_name} />
            <DetailItem label="Reference Phone" value={application.reference_phone} />
          </div>

          <div className="col-span-full">
            <h3 className="text-lg font-semibold mt-4 mb-2">Additional Info</h3>
            <DetailItem label="Authorized to work in the US?" value={application.work_auth} />
            <DetailItem label="Over 18?" value={application.over_18 ? 'Yes' : 'No'} />
            <DetailItem label="Has reliable transportation?" value={application.has_transport ? 'Yes' : 'No'} />
            <DetailItem label="Availability Notes" value={application.availability_notes} />
            <DetailItem label="Consent to process data" value={application.consent ? 'Yes' : 'No'} />
          </div>

        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
