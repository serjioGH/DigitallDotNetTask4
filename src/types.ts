
  export type Cloth = {
      id: string;
      title: string;
      price: number;
      brand: string;
      sizes: ClothSize[];
      groups: ClothGroup[];
    };
  
    export type ClothGroup = {
      groupId: string;
      group: string;
    };
  
    export type ClothSize = {
      sizeId: string;
      size: string;
      quantityInStock: number;
    };