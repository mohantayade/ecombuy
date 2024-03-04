import { client } from "@/lib/sanity";
import { simplifiedProduct } from "../interface";
import Image from "next/image";
import Link from "next/link";

async function getData(category: string){
    const query = `*[_type == "product" && category->name == "${category}"]{
        _id,
          "imageUrl": images[0].asset->url,
            price,
          name,
          "slug" : slug.current,
          "categoryName": category->name
      }`;
        const data = await client.fetch(query);

        return data
}

export default async function CategoryPage({params}:{params: {category: string}}){
    const data:simplifiedProduct[] = await getData(params.category)
    return(
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-2xl tracking-tight text-gray-900">Our Product For {params.category}</h2>

                
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data.map((product)=>(
                        <div key={product._id} className="group relative">
                            <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                                <Image src={product.imageUrl} alt="Product Image" className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                                width={300}
                                height={300}/>
                            </div>

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700">
                                        <Link href={`/product/${product.slug}`}>
                                        {product.name}
                                        </Link>

                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.categoryName}</p>
                                </div>
                                    <p className="mt-1 text-xl font-medium text-gray-900">₹ {product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}