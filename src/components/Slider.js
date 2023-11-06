import * as React from "react";

export default function Slider(props) {
    return (
        <section className="flex flex-col min-h-[580px] items-center justify-center gap-5 max-md:flex-wrap overflow-hidden relative">
            <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1ba9aa69-bab9-48ac-af50-8dfae301870a?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=100 100w,
           https://cdn.builder.io/api/v1/image/assets/TEMP/1ba9aa69-bab9-48ac-af50-8dfae301870a?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=200 200w, 
           https://cdn.builder.io/api/v1/image/assets/TEMP/1ba9aa69-bab9-48ac-af50-8dfae301870a?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=400 400w, 
           https://cdn.builder.io/api/v1/image/assets/TEMP/1ba9aa69-bab9-48ac-af50-8dfae301870a?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=800 800w, 
           https://cdn.builder.io/api/v1/image/assets/TEMP/1ba9aa69-bab9-48ac-af50-8dfae301870a?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=1200 1200w, 
           https://cdn.builder.io/api/v1/image/assets/TEMP/1ba9aa69-bab9-48ac-af50-8dfae301870a?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=1600 1600w, 
           https://cdn.builder.io/api/v1/image/assets/TEMP/1ba9aa69-bab9-48ac-af50-8dfae301870a?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=2000 2000w, 
           https://cdn.builder.io/api/v1/image/assets/TEMP/1ba9aa69-bab9-48ac-af50-8dfae301870a?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
           className="absolute z-[-1] h-full w-full object-cover object-center inset-0" />
<div className="relative flex flex-col mt-24 px-5 justify-center items-center max-md:max-w-full max-md:mt-10">
            <div className="text-black text-base uppercase whitespace-nowrap bg-white w-[120px] max-w-full -ml-2.5 px-3 py-1 rounded-3xl self-start"> developer </div>
            <h1 className="text-black text-8xl font-light uppercase mt-3.5 self-start max-md:max-w-full max-md:text-4xl"> 트렌드 분석 서비스 </h1>
            <div className="self-center flex w-full max-w-[1549px] grow flex-col mt-5 pl-2.5 max-md:max-w-full">
              <p className="text-black text-xl font-light uppercase self-stretch whitespace-nowrap max-md:max-w-full"> 궁금한 트렌드를 쉽게 찾아보세요 </p>
              <div className="self-center flex w-full max-w-[1539px] items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
                <a href="#" className="text-black text-base leading-6 uppercase whitespace-nowrap bg-zinc-300 w-[180px] max-w-full mt-44 pl-12 pr-12 py-3.5 self-end max:mt-10 max-md:px-5"> 자세히 보기 </a>
                <div className="flex flex-col self-end max-md:max-w-full">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6834a6d3-7128-4650-aa45-e4f63ffe36f1?apiKey=d9a6bade01504f228813cd0dfee9b81b&" className="aspect-[0.53] object-contain object-center w-[30px] stroke-[1px] stroke-white overflow-hidden max-w-full self-end" />
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c05547db-41fd-4d1a-8110-0a80fe148927?apiKey=d9a6bade01504f228813cd0dfee9b81b&" className="aspect-[6.75] object-contain object-center w-[108px] overflow-hidden max-w-full grow mt-56 self-start max-md:mt-10" />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
}



