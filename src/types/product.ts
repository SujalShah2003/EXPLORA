export type ProductMeta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type ProductSummary = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  meta: ProductMeta;
};

export type ProductsResponse<T> = {
  products: T[];
  total: number;
  skip: number;
  limit: number;
};
