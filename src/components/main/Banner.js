import * as React from "react";

export default function Banner(props) {
  return (
    <section className="flex-col items-center overflow-hidden relative flex min-h-[554px] px-20 max-md:px-5">
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/477a4b4c-a68c-45d7-b23f-541379db1b54?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=100 100w, 
        https://cdn.builder.io/api/v1/image/assets/TEMP/477a4b4c-a68c-45d7-b23f-541379db1b54?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=200 200w, 
        https://cdn.builder.io/api/v1/image/assets/TEMP/477a4b4c-a68c-45d7-b23f-541379db1b54?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=400 400w, 
        https://cdn.builder.io/api/v1/image/assets/TEMP/477a4b4c-a68c-45d7-b23f-541379db1b54?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=800 800w,
        https://cdn.builder.io/api/v1/image/assets/TEMP/477a4b4c-a68c-45d7-b23f-541379db1b54?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=1200 1200w, 
        https://cdn.builder.io/api/v1/image/assets/TEMP/477a4b4c-a68c-45d7-b23f-541379db1b54?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=1600 1600w, 
        https://cdn.builder.io/api/v1/image/assets/TEMP/477a4b4c-a68c-45d7-b23f-541379db1b54?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=2000 2000w, 
        https://cdn.builder.io/api/v1/image/assets/TEMP/477a4b4c-a68c-45d7-b23f-541379db1b54?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=100"className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
        alt="Banner Image"
      />
      <div className="relative self-center flex w-[274px] max-w-full flex-col mt-32 mb-60 max-md:my-10">
        <h1 className="text-white text-5xl uppercase self-stretch whitespace-nowrap max-md:text-4xl font-['NEXON']">
          백엔드메이커
        </h1>
        <p className="text-white text-center text-2xl font-light leading-9 uppercase self-center whitespace-nowrap mt-11 max-md:mt-10 font-['NEXON']">
          이재욱, 최재원
        </p>
      </div>
    </section>
  );
}
