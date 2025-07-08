'use client';

// package
import { useState, useEffect } from 'react';

// slice
import UserApplicationsPresenter from '../presenters/Applications.presenter';
import { ApplicationData } from '../types';
import { MOCK_APPLICATIONS } from '../data';

export default function UserApplicationsContainer() {
  const [applications] = useState<ApplicationData[]>(MOCK_APPLICATIONS);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredApplications, setFilteredApplications] = useState<
    ApplicationData[]
  >([]);

  useEffect(() => {
    let filtered = applications.filter((app) =>
      app.gameName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApplications(filtered);
  }, [searchTerm, applications]);

  return (
    <UserApplicationsPresenter
      applications={applications}
      searchTerm={searchTerm}
      filteredApplications={filteredApplications}
      onSearchChange={setSearchTerm}
    />
  );
}
