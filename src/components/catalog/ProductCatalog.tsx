'use client';

import { useState } from 'react';
import { PRODUCTS } from '@/lib/data';
import { Product } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
}

export function ProductCatalog({ onSelectProduct }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="Search products..."
          className="pl-10 h-12 bg-card border-none shadow-pop focus:shadow-pop-hover transition-all rounded-2xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {filteredProducts.map((product) => (
          <Card 
            key={product.id} 
            className="group hover:-translate-y-2 transition-all duration-500 border-none shadow-pop hover:shadow-pop-hover rounded-xl md:rounded-2xl overflow-hidden cursor-pointer bg-card flex flex-col border border-white/10"
            onClick={() => onSelectProduct(product)}
          >
            <CardHeader className="bg-mint/40 dark:bg-mint/10 p-4 md:p-6 border-b border-black/5 dark:border-white/5">
              <div className="flex justify-between items-start gap-2">
                <Badge variant="secondary" className="bg-sky/50 text-sky-foreground border-none px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase text-[9px] md:text-[10px] font-bold tracking-wider">
                  {product.category}
                </Badge>
              </div>
              <CardTitle className="text-base md:text-xl font-bold mt-2 md:mt-4 line-clamp-2 leading-tight">
                {product.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 flex-grow">
              <p className="text-xs md:text-sm text-muted-foreground">
                <span className="font-semibold block mb-0.5 md:mb-1">Packaging:</span>
                {product.packagingType}
              </p>
            </CardContent>
            <CardFooter className="px-4 pb-4 md:px-6 md:pb-6 pt-0">
              <Button 
                variant="ghost" 
                className="w-full rounded-xl md:rounded-2xl bg-secondary hover:bg-primary hover:text-primary-foreground font-bold transition-all text-sm md:text-base"
              >
                Add to Invoice
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 md:py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-muted">
          <p className="text-lg md:text-xl text-muted-foreground font-medium px-4">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}
