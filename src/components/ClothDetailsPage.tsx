import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from 'react-fetch-hook';
import { Cloth } from '../common/types';

const ClothDetailPage: React.FC = () => {
  const { clothId } = useParams<{ clothId: string }>();
  const [cloth, setCloth] = useState<Cloth | null>(null);

  const { isLoading, data, error } = useFetch<Cloth>(`https://localhost:44326/api/cloths/${clothId}`);

  useEffect(() => {
    if (!isLoading && data) {
      setCloth(data);
    }
  }, [isLoading, data]);

  if (isLoading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error: {error.message}</div>;
  if (!cloth) return <div className="container">No data available</div>;

  return (
    <div className="container mt-5">
      <div className="card">
        <h2 className="card-header">Cloth Detail</h2>
        <div className="card-body">
          <Link to="/" className="btn btn-primary mb-3">Back</Link>
          <div className="mb-3 row">
            <label htmlFor="title" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <p className="form-control-plaintext">{cloth.title}</p>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="price" className="col-sm-2 col-form-label">Price</label>
            <div className="col-sm-10">
              <p className="form-control-plaintext">${cloth.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="brand" className="col-sm-2 col-form-label">Brand</label>
            <div className="col-sm-10">
              <p className="form-control-plaintext">{cloth.brand}</p>
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Sizes</label>
            <div className="col-sm-10">
              <ul className="list-group">
                {cloth.sizes.map(size => (
                  <li key={size.sizeId} className="list-group-item">{size.size}: {size.quantityInStock}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Groups</label>
            <div className="col-sm-10">
              <ul className="list-group">
                {cloth.groups.map(group => (
                  <li key={group.groupId} className="list-group-item">{group.group}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothDetailPage;
