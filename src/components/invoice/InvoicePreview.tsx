'use client';

import { Invoice, InvoiceItem } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface InvoicePreviewProps {
  invoice: Invoice;
}

export function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const subtotal = invoice.items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="bg-white text-black p-[20mm] w-[210mm] min-h-[297mm] mx-auto shadow-2xl print:shadow-none print:p-0 print:m-0 font-sans">
      {/* Header */}
      <div className="flex justify-between items-start mb-12 border-b-4 border-primary pb-8">
        <div>
          <h1 className="text-4xl font-black text-primary mb-2">{invoice.companyInfo.name}</h1>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{invoice.companyInfo.address}</p>
            <p>Phone: {invoice.companyInfo.phone}</p>
            <p>Email: {invoice.companyInfo.email}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-6xl font-black text-gray-200 uppercase tracking-tighter">Invoice</h2>
          <div className="mt-4 space-y-1">
            <p className="font-bold">Date: {invoice.date}</p>
            <p className="font-bold">Invoice #: {invoice.id}</p>
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Bill To</h3>
          <div className="space-y-1">
            <p className="text-xl font-bold">{invoice.customerInfo.name}</p>
            <p className="text-gray-600">{invoice.customerInfo.address}</p>
            <p className="text-gray-600">{invoice.customerInfo.phone}</p>
            <p className="text-gray-600">{invoice.customerInfo.email}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-12">
        <Table className="border-collapse w-full">
          <TableHeader>
            <TableRow className="border-b-2 border-black hover:bg-transparent">
              <TableHead className="font-black text-black py-4 uppercase text-xs">Description</TableHead>
              <TableHead className="font-black text-black py-4 uppercase text-xs text-right">Qty / Unit</TableHead>
              <TableHead className="font-black text-black py-4 uppercase text-xs text-right">Unit Price</TableHead>
              <TableHead className="font-black text-black py-4 uppercase text-xs text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.items.map((item) => (
              <TableRow key={item.id} className="border-b border-gray-200 hover:bg-transparent">
                <TableCell className="py-4 font-medium">
                  {item.product.name}
                  <div className="text-[10px] text-gray-500">{item.product.category}</div>
                </TableCell>
                <TableCell className="py-4 text-right">
                  {item.quantity} {item.unit}
                </TableCell>
                <TableCell className="py-4 text-right">
                  ${item.unitPrice.toFixed(2)}
                </TableCell>
                <TableCell className="py-4 text-right font-bold">
                  ${item.totalPrice.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-24">
        <div className="w-64 space-y-2">
          <div className="flex justify-between border-b border-gray-100 py-2">
            <span className="text-gray-600">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 py-2">
            <span className="text-gray-600">Tax (0%)</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-xl font-black">Total</span>
            <span className="text-2xl font-black text-primary">${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-12 border-t border-gray-100 text-center text-xs text-gray-400 space-y-1">
        <p>Thank you for your business!</p>
        <p>{invoice.companyInfo.name} • {invoice.companyInfo.phone} • {invoice.companyInfo.email}</p>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            margin: 0;
            padding: 0;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
