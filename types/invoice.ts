export type InvoiceMode = "bundle" | "satuan";
export type DeliverableStatus = "Delivered" | "Expired";

export interface Deliverable {
  id: string;
  name: string;
  slideCount: number;
  designType: string;
  keterangan: string;
  status: DeliverableStatus;
}

export interface LineItem {
  id: string;
  name: string;
  keterangan: string;
  qty: number;
  unitPrice: number;
}

export interface InvoiceData {
  // Meta
  invoiceNumber: string;
  date: string;
  // Client
  clientName: string;
  projectName: string;
  // Mode
  mode: InvoiceMode;
  // Bundle mode
  packageName: string;
  packagePrice: number;
  periodStart: string;
  periodEnd: string;
  deliverables: Deliverable[];
  packageNote: string;
  dp: number;
  dpDate: string;
  // Satuan mode
  lineItems: LineItem[];
  // Common
  extraRevisiCount: number;
  notes: string;
}

export interface StoredInvoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  projectName: string;
  totalAmount: number;
  remainingAmount: number;
  createdAt: string;
  data: InvoiceData;
}
