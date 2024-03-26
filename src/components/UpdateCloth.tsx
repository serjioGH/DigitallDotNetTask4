import React, { useState, useEffect } from 'react';
import { ClothSize, ClothGroup } from '../common/types';
import sizesAndGroupsData from '../common/sizesAndGroups.json';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { validateTitle, validatePrice, validateBrandId, validateDescription, validateSizes, validateGroups } from '../common/validation';

const UpdateCloth: React.FC = () => {
    const { clothId } = useParams<{ clothId: string }>();
    const [cloth, setCloth] = useState<any>(null);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [brandId, setBrandId] = useState('');
    const [description, setDescription] = useState('');
    const [sizes, setSizes] = useState<ClothSize[]>([]);
    const [groups, setGroups] = useState<ClothGroup[]>([]);
    const brands: { brandId: string; brand: string }[] = sizesAndGroupsData.brands;
    const navigate = useNavigate();
    const apiUrl = `https://localhost:44326/api/Cloths/${clothId}`;
  
    useEffect(() => {
      // Fetch cloth data using clothId and populate the state
      const fetchClothData = async () => {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error('Failed to fetch cloth data');
          }
          const data = await response.json();
          setCloth(data);
          setTitle(data.title);
          setPrice(data.price.toString());
          setBrandId(data.brandId);
          setDescription(data.description);
          setSizes(data.sizes);
          setGroups(data.groups);
        } catch (error) {
          console.error('An error occurred while fetching cloth data:', error);
        }
      };
  
      fetchClothData();
    }, [apiUrl, clothId]);
  
    // Validation functions
    const [errors, setErrors] = useState({
      title: '',
      price: '',
      brandId: '',
      description: '',
      sizes: '',
      groups: '',
    });
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const filteredSizes = sizes.filter((size) => size.quantityInStock > 0);
      const titleError = validateTitle(title);
      const priceError = validatePrice(price);
      const brandIdError = validateBrandId(brandId);
      const descriptionError = validateDescription(description);
      const sizesError = validateSizes(filteredSizes);
      const groupsError = validateGroups(groups);
  
      setErrors({
        title: titleError,
        price: priceError,
        brandId: brandIdError,
        description: descriptionError,
        sizes: sizesError,
        groups: groupsError,
      });
  
      // Check if there are any validation errors
      if (!titleError && !priceError && !brandIdError && !descriptionError && !sizesError && !groupsError) {
        try {
          const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, price, brandId, description, sizes : filteredSizes, groups }),
          });
          if (!response.ok) {
            throw new Error('Failed to update cloth');
          }
  
          console.log('Cloth updated successfully');
          navigate('/');
        } catch (error: any) {
          if (error instanceof Error) {
            // Handle error
            console.error('An error occurred:', error.message);
            Swal.fire('Failed to update cloth', 'Please try again.', 'error');
          }
        }
      }
    };
  

  // Similar JSX structure as CreateCloth component
  return (
    <div className="container mt-5">
      <div className="card">
        <h2 className="card-header">Edit Cloth</h2>
        <div className="card-body">
          <Link to="/" className="btn btn-primary mb-3">
            Back
          </Link>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <label htmlFor="title" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    validateTitle(e.target.value);
                  }}
                />
                <div className="text-danger">{errors.title}</div>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="price" className="col-sm-2 col-form-label">
                Price
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    validatePrice(e.target.value);
                  }}
                />
                <div className="text-danger">{errors.price}</div>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="brand" className="col-sm-2 col-form-label">
                Brand
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  id="brand"
                  value={brandId}
                  onChange={(e) => {
                    setBrandId(e.target.value);
                    validateBrandId(e.target.value);
                  }}
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand.brandId} value={brand.brandId}>
                      {brand.brand}
                    </option>
                  ))}
                </select>
                <div className="text-danger">{errors.brandId}</div>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                Description
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    validateDescription(e.target.value);
                  }}
                  style={{ resize: 'none' }}
                />
                <div className="text-danger">{errors.description}</div>
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Sizes</label>
              <div className="col-sm-10">
                {sizesAndGroupsData.sizes.map((size) => (
                  <div key={size.sizeId} className="mb-2 row">
                    <label htmlFor={`size-${size.sizeId}`} className="col-sm-2 col-form-label">
                      {size.size}
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="number"
                        className="form-control"
                        id={`size-${size.sizeId}`}
                        value={sizes.find((s) => s.sizeId === size.sizeId)?.quantityInStock.toString() || ''}
                        onChange={(e) => {
                          const newSize: ClothSize = { ...size, quantityInStock: parseInt(e.target.value, 10) };
                          if (sizes.find((s) => s.sizeId === size.sizeId)) {
                            setSizes(sizes.map((s) => (s.sizeId === size.sizeId ? newSize : s)));
                          } else {
                            setSizes([...sizes, newSize]);
                          }
                          
                        }}
                      />
                    </div>
                  </div>
                ))}
                <div className="text-danger">{errors.sizes}</div>
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Groups</label>
              <div className="col-sm-10">
                {sizesAndGroupsData.groups.map((group) => (
                  <div key={group.groupId} className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={group.groupId}
                      checked={groups.some((g) => g.groupId === group.groupId)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setGroups([...groups, group]);
                        } else {
                          setGroups(groups.filter((g) => g.groupId !== group.groupId));
                        }
                     
                      }}
                    />
                    <label className="form-check-label">{group.group}</label>
                  </div>
                ))}
                <div className="text-danger">{errors.groups}</div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCloth;
