import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Home() {
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
          <Tabs defaultValue="pizza" className="w-[400px]">
            <TabsList>
              <TabsTrigger className="text-md" value="pizza">Pizza</TabsTrigger>
              <TabsTrigger className="text-md" value="beverages">Beverages</TabsTrigger>
            </TabsList>
            <TabsContent value="pizza">Pizza list</TabsContent>
            <TabsContent value="beverages">Beverages list</TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
