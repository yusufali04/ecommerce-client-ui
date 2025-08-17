import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard from "./components/product-card";
import { Category, Product } from "@/lib/types";

export default async function Home() {
  const categoryResponse = await fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
    next: {
      revalidate: 3600 // cache for 1 hour
    }
  })
  if (!categoryResponse.ok) {
    throw new Error("Failed to fetch categories")
  }
  const categories: Category[] = await categoryResponse.json();
  const productsResponse = await fetch(`${process.env.BACKEND_URL}/api/catalog/products?perPage=100&tenantId=5`, {
    next: {
      revalidate: 5 // cache for 1 hour
    }
  })
  const products: { data: Product[] } = await productsResponse.json();
  console.log(products);

  return (
    <>
      <section className="bg-white">
        <div className="container mx-auto max-w-screen-lg flex items-center justify-between py-24">
          <div>
            <h1 className="text-5xl font-black font-sans leading-2">
              Super Delicious Pizza in <br />
              <span className="text-primary">Only 45 Minutes</span>
            </h1>
            <p className="text-xl mt-8 max-w-lg leading-snug">
              Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
            </p>
            <Button className="mt-8 text-md rounded-full py-7 px-6 font-bold">
              Get your pizza now
            </Button>
          </div>
          <div>
            <Image alt="pizza-main" src={"/pizza-main.png"} width={400} height={400} />
          </div>
        </div>
      </section>
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
    </>
  );
}
