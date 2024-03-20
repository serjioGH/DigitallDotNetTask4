import { ClothSize, ClothGroup } from './types';
  
export const validateTitle = (value: string) => {
    return value.trim() ? '' : 'Title is required.';
  };
  
  export const validatePrice = (value: string) => {
    return value.trim()
      ? /^\d+(\.\d{1,2})?$/.test(value) && parseFloat(value) > 0 // Changed >= to >
        ? ''
        : 'Price must be a positive number with up to two decimal places and greater than zero.' // Updated error message
      : 'Price is required.';
  };
  
  export const validateBrandId = (value: string) => {
    return value.trim() ? '' : 'Brand is required.';
  };
  
  export const validateDescription = (value: string) => {
    return value.trim() ? '' : 'Description is required.';
  };
  
  export const validateSizes = (sizes: ClothSize[]) => {
    if (sizes.filter((size) => size.quantityInStock > 0).length === 0) {
      return 'At least one size must have a quantity greater than 0.';
    } else {
      return '';
    }
  };
  
  export const validateGroups = (groups: ClothGroup[]) => {
    return groups.length === 0 ? 'At least one group must be selected.' : '';
  };
  
  