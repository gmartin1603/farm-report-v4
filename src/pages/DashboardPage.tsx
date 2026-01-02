import React from 'react';
import { Link } from 'react-router-dom';
import { useReports } from '@/features/reports/hooks/useReports';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { formatDate, formatCurrency } from '@/lib/utils/calculations';

const DashboardPage: React.FC = () => {
  const { data: reports, isLoading, error } = useReports();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load reports. Please try again.</p>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your farm reports</p>
        </div>
        <Link to="/reports/new">
          <Button>Create New Report</Button>
        </Link>
      </div>

      {reports?.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Reports Found</CardTitle>
            <CardDescription>
              Get started by creating your first farm report.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/reports/new">
              <Button>Create Your First Report</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports?.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  Report - {formatDate(report.date)}
                </CardTitle>
                <CardDescription>
                  Total: {formatCurrency(report.total)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>{report.expenses.length} expenses</p>
                  <p>{report.labels.length} labels</p>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Link to={`/reports/${report.id}/edit`}>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;