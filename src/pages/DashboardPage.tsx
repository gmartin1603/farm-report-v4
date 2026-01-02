import React from 'react';
// import { Link } from 'react-router-dom';
import { useReports } from '@/features/reports/hooks/useReports';
// import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
// import { formatDate, formatCurrency } from '@/lib/utils/calculations';

const DashboardPage: React.FC = () => {
  const { data: _reports, isLoading, error } = useReports();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    console.error('Failed to load reports:', error);
    return (
      <div className="text-center py-12">
        <p className="text-red-600">An error occurred. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your settings</p>
        </div>
        {/* <Link to="/reports/new">
          <Button>Create New Report</Button>
        </Link> */}
      </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  Expenses
                </CardTitle>
                <CardDescription>
                  View and manage your farm expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                </div>
                <div className="mt-4 flex space-x-2">
                  
                </div>
              </CardContent>
            </Card>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  Crops
                </CardTitle>
                <CardDescription>
                  List of crop and commodities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                </div>
                <div className="mt-4 flex space-x-2">
                  
                </div>
              </CardContent>
            </Card>
        </div>
    </div>
  );
};

export default DashboardPage;