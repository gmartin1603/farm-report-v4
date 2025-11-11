export interface Report {
  id: string;
  date: string; // ISO date string
  expenses: Expense[];
  labels: Label[];
  total: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category?: string;
}

export interface Label {
  id: string;
  name: string;
  count: number;
}

export type CreateReportInput = Omit<Report, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateReportInput = Partial<CreateReportInput>;