export type Unit = 'kg' | 'boxes' | 'bags' | 'cartons';

export interface Product {
  id: string;
  name: string;
  category: string;
  packagingType: string;
}

export interface InvoiceItem {
  id: string;
  product: Product;
  unit: Unit;
  totalPrice: number;
  unitPrice: number;
  quantity: number;
}

export interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
}

export interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface Invoice {
  id: string;
  date: string;
  companyInfo: CompanyInfo;
  customerInfo: CustomerInfo;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
}
