export type UpgradeStudentRequest = {
  id: string;
  name: string;
  surname: string;
  lastname: string;
  qualifications: { end_date: string; title: string; start_date: string }[];
  languages: { name: string; speak: number; write: number }[];
  job_experiences: { responsibilities: string; endDate: string; company: string; position: string; startDate: string }[];
};
