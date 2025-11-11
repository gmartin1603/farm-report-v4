import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const NewReportPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Report</h1>
        <p className="text-gray-600">Add a new farm report with expenses and labels</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Form</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Report form will be implemented here...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewReportPage;