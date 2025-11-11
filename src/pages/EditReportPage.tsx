import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const EditReportPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Report</h1>
        <p className="text-gray-600">Edit report {id}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Report Form</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Report edit form will be implemented here...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditReportPage;