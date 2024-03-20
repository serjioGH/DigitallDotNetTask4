import React, { useState, useEffect } from 'react';
import { ClothSize, ClothGroup, Cloth } from './types';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

const SortableTable: React.FC<{ data: Cloth[] }> = ({ data: initialData }) => {
  const [data, setData] = useState<Cloth[]>(initialData);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

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

  const handleEditCloth = (id: string) => {
    navigate(`/edit-cloth/${id}`);
  };

  const handleDeleteCloth = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this cloth!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://localhost:44326/api/Cloths/${id}`, {
            method: 'DELETE',
          });
  
          if (!response.ok) {
            throw new Error('Failed to delete cloth');
          }
  
          setData(prevData => prevData.filter(cloth => cloth.id !== id));
          Swal.fire('Deleted!', 'Your cloth has been deleted.', 'success');
        } catch (error) {
          console.error('An error occurred while deleting cloth:', error);
          Swal.fire('Failed to delete cloth', 'Please try again.', 'error');
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your cloth is safe :)', 'info');
      }
    });
  };
  
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
            <th></th>
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
              <td>
                {/* Icons for delete and edit functionalities */}
                <Link to={`/edit-cloth/${cloth.id}`}>
                <FaEdit style={{ cursor: 'pointer', marginRight: '0.5rem' }}  />
                </Link>
               
                <FaTrash style={{ cursor: 'pointer' }} onClick={() => handleDeleteCloth(cloth.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;
