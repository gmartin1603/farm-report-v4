import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db, auth } from './config';
import type { Report, CreateReportInput, UpdateReportInput } from '@/types/report';

const CURRENT_USER_ID = (): string => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No authenticated user found');
  }
  return user.uid;
};
const REPORTS_COLLECTION = 'reports';

export const firestoreService = {
  // Create a new report
  createReport: async (reportData: CreateReportInput): Promise<string> => {
    const docRef = await addDoc(collection(db, CURRENT_USER_ID(), REPORTS_COLLECTION), {
      ...reportData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  },

  // Update an existing report
  updateReport: async (reportId: string, reportData: UpdateReportInput): Promise<void> => {
    const docRef = doc(db, CURRENT_USER_ID(), REPORTS_COLLECTION, reportId);
    await updateDoc(docRef, {
      ...reportData,
      updatedAt: Timestamp.now(),
    });
  },

  // Delete a report
  deleteReport: async (reportId: string): Promise<void> => {
    const docRef = doc(db, CURRENT_USER_ID(), REPORTS_COLLECTION, reportId);
    await deleteDoc(docRef);
  },

  // Get a single report by ID
  getReport: async (reportId: string): Promise<Report | null> => {
    const docRef = doc(db, CURRENT_USER_ID(), REPORTS_COLLECTION, reportId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return mapDocToReport(docSnap.id, docSnap.data());
    }
    return null;
  },

  // Get all reports for a user
  getUserReports: async (userId: string): Promise<Report[]> => {
    const q = query(
      collection(db, userId, 'profile', REPORTS_COLLECTION),
      // where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => mapDocToReport(doc.id, doc.data()));
  },

  // Subscribe to real-time updates for user reports
  subscribeToUserReports: (
    userId: string,
    callback: (_reports: Report[]) => void
  ): (() => void) => {
    const q = query(
      collection(db, userId, 'profile', REPORTS_COLLECTION),
      // where('userId', '==', userId),
      orderBy('date', 'desc')
    );

    return onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const _reports = querySnapshot.docs.map(doc => mapDocToReport(doc.id, doc.data()));
      callback(_reports);
    });
  },
};

// Helper function to map Firestore document to Report type
const mapDocToReport = (id: string, data: DocumentData): Report => ({
  id,
  date: data.date,
  expenses: data.expenses || [],
  labels: data.labels || [],
  total: data.total || 0,
  userId: data.userId,
  createdAt: data.createdAt?.toDate() || new Date(),
  updatedAt: data.updatedAt?.toDate() || new Date(),
});