import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./product-card";
import { Category, Product } from '@/lib/types';

const ProductList = async () => {
    const [categoryResponse, productsResponse] = await Promise.all([
        fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
            next: { revalidate: 3600 } // cache for 1 hour
        }),
        fetch(`${process.env.BACKEND_URL}/api/catalog/products?perPage=100&tenantId=5`, {
            next: { revalidate: 5 } // cache for 5 seconds
        })
    ]);

    if (!categoryResponse.ok) {
        throw new Error("Failed to fetch categories");
    }
    if (!productsResponse.ok) {
        throw new Error("Failed to fetch products");
    }

    const [categories, products] = await Promise.all([
        categoryResponse.json() as Promise<Category[]>,
        productsResponse.json() as Promise<{ data: Product[] }>
    ]);
    return (
        <section>
            <div className="container mx-auto max-w-screen-lg py-12">
                <Tabs defaultValue={categories[0]._id} className="">
                    <TabsList>
                        {
                            categories.map((category) => {
                                return <TabsTrigger key={category._id} className="text-md" value={category._id}>{category.name}</TabsTrigger>
                            })
                        }

                    </TabsList>
                    {
                        categories.map((category) => {
                            return <TabsContent key={category._id} value={category._id}>
                                <div className="grid grid-cols-4 gap-6 mt-6">
                                    {
                                        products.data.filter((product) => product.category._id === category._id).map((product) => (
                                            <ProductCard key={product._id} product={product} />
                                        ))
                                    }
                                </div>
                            </TabsContent>
                        })
                    }

                    <TabsContent value="beverages">
                        <div className="grid grid-cols-4 gap-6 mt-6">
                            {
                                products.data.map((product: Product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            }
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

export default ProductList