import React from 'react';
import useFetch from 'react-fetch-hook';
import SortableTable from './components/SortableTable';
import { Cloth } from './common/types';

interface Response {
  filter: Filter;
  cloths: Cloth[]
}

type Filter = {
  minprice: number;
  maxprice: number;
  sizes: string[]
};

const FetchComponent: React.FC = () => {
  const { isLoading, data, error } = useFetch<Response>('https://localhost:44326/api/Cloths');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="container">
    <h2>Cloths Data</h2>
    <SortableTable data={data.cloths} />
  </div>
  );
};

export default FetchComponent;
