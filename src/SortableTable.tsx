import React, { useState } from 'react';
import { ClothSize, ClothGroup, Cloth } from './types';
import { Link, useNavigate } from 'react-router-dom';

const SortableTable: React.FC<{ data: Cloth[] }> = ({ data }) => {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleAddNewCloth = () => {
    navigate('/new-cloth'); // Navigate to the NewClothForm component
  }
  const filteredCloths = data.filter((cloth) =>
  cloth.title.toLowerCase().includes(filter.toLowerCase()) ||
  cloth.brand.toLowerCase().includes(filter.toLowerCase()) ||
  cloth.sizes.some((size) => size.size.toLowerCase().includes(filter.toLowerCase())) ||
  cloth.groups.some((group) => group.group.toLowerCase().includes(filter.toLowerCase()))
);

  let sortedCloths = [...filteredCloths];

  if (sortBy === 'title') {
    sortedCloths.sort((a, b) => sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
  } else if (sortBy === 'price') {
    sortedCloths.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
  }

  return (
    <div className="table-responsive">
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-primary" onClick={handleAddNewCloth} style={{ marginRight: '1rem' }}>Add New Cloth</button>
         <input
         type="text"
         className="filter-input"
         placeholder="Filter by Name, Brand, Size or Group"
         value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
              Name {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
              Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th>Brand</th>
            <th>Sizes</th>
            <th>Groups</th>
          </tr>
        </thead>
        <tbody>
          {sortedCloths.map((cloth) => (
            <tr key={cloth.id}>
              <td><Link to={`/cloths/${cloth.id}`}>{cloth.title}</Link></td>            
              <td>${cloth.price.toFixed(2)}</td>
              <td>{cloth.brand}</td>
              <td>
                <ul>
                  {cloth.sizes.map((size) => (
                    <li key={size.sizeId}>{size.size}: {size.quantityInStock}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {cloth.groups.map((group) => (
                    <li key={group.groupId}>{group.group}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;