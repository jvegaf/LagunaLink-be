export interface UpgradeStudentRequest {
  id: string;
  name: string;
  surname: string;
  lastname: string;
  qualification: { title: string; start_date: Date; end_date: Date };
  languages: [{ name: string; speak: number; write: number }];
  job_experiences: [{
    company: string;
    position: string;
    responsibilities: string;
    start_date: Date;
    end_date: Date;
  }];
}
