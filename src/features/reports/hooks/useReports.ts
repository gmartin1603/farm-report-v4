import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { firestoreService } from '@/lib/firebase/firestore';
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { CreateReportInput, UpdateReportInput } from '@/types/report';

const REPORTS_QUERY_KEY = 'reports';

export const useReports = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: [REPORTS_QUERY_KEY, user?.uid],
    queryFn: () => firestoreService.getUserReports(user!.uid),
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useReport = (reportId: string) => {
  return useQuery({
    queryKey: [REPORTS_QUERY_KEY, reportId],
    queryFn: () => firestoreService.getReport(reportId),
    enabled: !!reportId,
  });
};

export const useCreateReport = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reportData: Omit<CreateReportInput, 'userId'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const fullReportData: CreateReportInput = {
        ...reportData,
        userId: user.uid,
      };
      
      return firestoreService.createReport(fullReportData);
    },
    onSuccess: () => {
      // Invalidate and refetch reports
      queryClient.invalidateQueries({ queryKey: [REPORTS_QUERY_KEY] });
    },
  });
};

export const useUpdateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reportId, reportData }: { reportId: string; reportData: UpdateReportInput }) => {
      return firestoreService.updateReport(reportId, reportData);
    },
    onSuccess: (_, { reportId }) => {
      // Invalidate and refetch reports
      queryClient.invalidateQueries({ queryKey: [REPORTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [REPORTS_QUERY_KEY, reportId] });
    },
  });
};

export const useDeleteReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reportId: string) => {
      return firestoreService.deleteReport(reportId);
    },
    onSuccess: () => {
      // Invalidate and refetch reports
      queryClient.invalidateQueries({ queryKey: [REPORTS_QUERY_KEY] });
    },
  });
};