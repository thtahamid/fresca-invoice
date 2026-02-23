'use client';

import { useEffect, useRef, useState } from 'react';
import { Invoice } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface InvoicePreviewProps {
  invoice: Invoice;
}

export function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const subtotal = invoice.items.reduce((sum, item) => sum + item.totalPrice, 0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const invoiceWidth = 794; // 210mm in pixels at 96 DPI
        if (containerWidth < invoiceWidth) {
          setScale(containerWidth / invoiceWidth);
        } else {
          setScale(1);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center items-start overflow-hidden py-4 md:py-8">
      <div 
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top center',
          width: '210mm',
          marginBottom: `calc(297mm * ${scale - 1})`
        }}
        className="bg-white text-black p-[10mm] md:p-[20mm] w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none print:p-0 print:m-0 font-sans transition-transform duration-300"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-12 border-b-4 border-primary pb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-primary mb-2 line-clamp-1">{invoice.companyInfo.name}</h1>
            <div className="text-xs text-gray-600 space-y-0.5">
              <p>{invoice.companyInfo.address}</p>
              <p>Phone: {invoice.companyInfo.phone}</p>
              <p>Email: {invoice.companyInfo.email}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-4xl md:text-6xl font-black text-gray-200 uppercase tracking-tighter leading-none">Invoice</h2>
            <div className="mt-4 space-y-0.5 text-sm">
              <p className="font-bold">Date: {invoice.date}</p>
              <p className="font-bold"># {invoice.id}</p>
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-2 gap-8 md:gap-12 mb-12">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Bill To</h3>
            <div className="space-y-0.5">
              <p className="text-lg md:text-xl font-bold line-clamp-1">{invoice.customerInfo.name}</p>
              <p className="text-xs md:text-sm text-gray-600">{invoice.customerInfo.address}</p>
              <p className="text-xs md:text-sm text-gray-600">{invoice.customerInfo.phone}</p>
              <p className="text-xs md:text-sm text-gray-600">{invoice.customerInfo.email}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-12">
          <Table className="border-collapse w-full">
            <TableHeader>
              <TableRow className="border-b-2 border-black hover:bg-transparent">
                <TableHead className="font-black text-black py-3 uppercase text-[10px]">Description</TableHead>
                <TableHead className="font-black text-black py-3 uppercase text-[10px] text-right">Qty / Unit</TableHead>
                <TableHead className="font-black text-black py-3 uppercase text-[10px] text-right">Unit Price</TableHead>
                <TableHead className="font-black text-black py-3 uppercase text-[10px] text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.map((item) => (
                <TableRow key={item.id} className="border-b border-gray-200 hover:bg-transparent">
                  <TableCell className="py-3 font-medium text-sm">
                    {item.product.name}
                    <div className="text-[9px] text-gray-500 uppercase tracking-tight">{item.product.category}</div>
                  </TableCell>
                  <TableCell className="py-3 text-right text-sm">
                    {item.quantity} {item.unit}
                  </TableCell>
                  <TableCell className="py-3 text-right text-sm">
                    ${item.unitPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="py-3 text-right font-bold text-sm">
                    ${item.totalPrice.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-24">
          <div className="w-48 md:w-64 space-y-2">
            <div className="flex justify-between border-b border-gray-100 py-2 text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-2 text-sm">
              <span className="text-gray-600">Tax (0%)</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-lg md:text-xl font-black">Total</span>
              <span className="text-xl md:text-2xl font-black text-primary">${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 border-t border-gray-100 text-center text-[10px] text-gray-400 space-y-0.5">
          <p className="font-bold">Thank you for your business!</p>
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
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 210mm !important;
              transform: none !important;
            }
            @page {
              size: A4;
              margin: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
