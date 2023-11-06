import * as React from "react";

export default function TrendingInstruction(props) {
  return (
    <main className="bg-white flex flex-col px-20 max-md:px-5">
      <section className="self-center flex w-full max-w-[977px] flex-col mt-32 mb-24 max-md:max-w-full max-md:my-10 font-['NEXON']">
        <h1 className="text-black text-5xl uppercase self-center whitespace-nowrap max-md:text-4xl">
          실시간 트렌드
        </h1>
        <p className="text-black text-2xl font-light uppercase self-center whitespace-nowrap mt-14 max-md:max-w-full max-md:mt-10 font-['NEXON']">
          실시간 트렌드를 주제별로 한 눈에 보기 쉽게 비교하고 알아 볼 수 있습니다.
        </p>
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/fe9c0523-a003-4734-a602-368a5c64a87f?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9c0523-a003-4734-a602-368a5c64a87f?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9c0523-a003-4734-a602-368a5c64a87f?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9c0523-a003-4734-a602-368a5c64a87f?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9c0523-a003-4734-a602-368a5c64a87f?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9c0523-a003-4734-a602-368a5c64a87f?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9c0523-a003-4734-a602-368a5c64a87f?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/fe9c0523-a003-4734-a602-368a5c64a87f?apiKey=d9a6bade01504f228813cd0dfee9b81b&"className="aspect-[1.67] object-contain object-center w-[677px] overflow-hidden self-center max-w-full mt-12 max-md:mt-10"
        />
        <div className="self-center flex w-full items-start justify-between gap-5 mt-20 max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mt-10">
          <div className="shadow-sm bg-white flex flex-col flex-1 px-9 py-3 rounded-3xl max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ebb2b7c-b651-4c2b-8b2e-6f7834777987?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
              className="aspect-square object-contain object-center w-full overflow-hidden self-stretch"
            />
            <a
              href="#"
              className="text-blue-400 text-base font-semibold leading-5 tracking-normal self-center whitespace-nowrap"
            >
              패션
            </a>
          </div>
          <div className="shadow-sm bg-white flex flex-col flex-1 pt-2.5 pb-4 px-9 rounded-3xl max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7108a0a4-bf35-43fb-80ca-453475259550?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
              className="aspect-square object-contain object-center w-full overflow-hidden self-stretch"
            />
            <a
              href="#"
              className="text-green-400 text-base font-semibold leading-5 tracking-normal self-center whitespace-nowrap"
            >
              스포츠
            </a>
          </div>
          <div className="shadow-sm bg-white flex flex-col flex-1 px-9 py-3 rounded-3xl max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5be54af-1423-4122-832e-b3f9b14439a0?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
              className="aspect-square object-contain object-center w-full overflow-hidden self-stretch"
            />
            <a
              href="#"
              className="text-violet-500 text-base font-semibold leading-5 tracking-normal self-center whitespace-nowrap"
            >
              가전
            </a>
          </div>
          <div className="shadow-sm bg-white flex flex-col flex-1 pl-8 pr-8 py-3 rounded-3xl max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/06873a76-9dd5-4c33-ae2f-c5a3541d3134?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
              className="aspect-[1.09] object-contain object-center w-full overflow-hidden self-stretch"
            />
            <a
              href="#"
              className="text-orange-300 text-base font-semibold leading-5 tracking-normal self-center whitespace-nowrap"
            >
              여가
            </a>
          </div>
          <div className="shadow-sm bg-white flex flex-col flex-1 pl-8 pr-9 py-3 rounded-3xl max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4bca508f-3345-4741-9e79-9cd7499ae077?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
              className="aspect-square object-contain object-center w-full overflow-hidden self-stretch"
            />
            <a
              href="#"
              className="text-red-400 text-base font-semibold leading-5 tracking-normal self-center whitespace-nowrap"
            >
              식품
            </a>
          </div>
        </div>
        <p className="text-black text-right text-2xl uppercase self-center whitespace-nowrap mt-24 max-md:max-w-full max-md:mt-10 font-['NEXON']">
          지금 바로 궁금한 트렌드를 눌러 실시간 검색어 순위를 확인하세요!
        </p>
      </section>
    </main>
  );
}