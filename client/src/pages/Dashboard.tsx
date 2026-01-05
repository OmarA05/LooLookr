import React, { useMemo, useState } from 'react';
import AppShell from '../components/layout/AppShell';
import TopSidebar, { SidebarFilters } from '../components/dashboard/TopSidebar';
import CampusMap from '../components/dashboard/CampusMap';
import { useTopToilets } from '../hooks/useTopToilets';
import { ToiletSummary } from '../types';

const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<SidebarFilters>({});
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const { data: toilets, isLoading } = useTopToilets({
    buildingCode: filters.buildingCode,
    search: filters.search,
  });

  const topList: ToiletSummary[] = useMemo(() => toilets ?? [], [toilets]);

  // Keep selected toilet in sync with the fetched list
  React.useEffect(() => {
    if (selectedId && !topList.find((t) => t.id === selectedId)) {
      setSelectedId(undefined);
    }
  }, [selectedId, topList]);

  return (
    <AppShell>
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl grid-cols-1 gap-4 px-4 py-6 lg:grid-cols-[340px_1fr]">
        <TopSidebar
          toilets={topList}
          isLoading={isLoading}
          filters={filters}
          onFiltersChange={setFilters}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <div className="h-[calc(100vh-96px)] rounded-3xl border border-white/10 bg-black/50 p-3">
          <CampusMap toilets={topList} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      </div>
    </AppShell>
  );
};

export default Dashboard;
