import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard, { Product } from "./components/product-card";
import { Category } from "@/lib/types";

const products: Product[] = [
  {
    _id: '1',
    name: 'Margerita Pizza',
    description: "This is a tasty pizza",
    price: 500,
    image: "/pizza-main.png"
  },
  {
    _id: '2',
    name: 'Margerita Pizza',
    description: "This is a tasty pizza",
    price: 500,
    image: "/pizza-main.png"
  },
  {
    _id: '3',
    name: 'Margerita Pizza',
    description: "This is a tasty pizza",
    price: 500,
    image: "/pizza-main.png"
  },
  {
    _id: '4',
    name: 'Margerita Pizza',
    description: "This is a tasty pizza",
    price: 500,
    image: "/pizza-main.png"
  },
  {
    _id: '5',
    name: 'Margerita Pizza',
    description: "This is a tasty pizza",
    price: 500,
    image: "/pizza-main.png"
  }
]

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
  console.log(categories);

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
          <Tabs defaultValue="pizza" className="">
            <TabsList>
              {
                categories.map((category) => {
                  return <TabsTrigger key={category._id} className="text-md" value={category._id}>{category.name}</TabsTrigger>
                })
              }

            </TabsList>
            <TabsContent value="pizza">
              <div className="grid grid-cols-4 gap-6 mt-6">
                {
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                }
              </div>
            </TabsContent>
            <TabsContent value="beverages">
              <div className="grid grid-cols-4 gap-6 mt-6">
                {
                  products.map((product) => (
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
