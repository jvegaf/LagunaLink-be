export type UpgradeStudentRequest = {
  id: string;
  name?: string;
  surname?: string;
  lastname?: string;
  qualification?: { title: string; start_date: string; end_date: string };
  languages?: { name: string; speak: number; write: number }[];
  job_experiences?: {
    company: string;
    position: string;
    responsibilities: string;
    start_date: string;
    end_date: string
  }[];
};
