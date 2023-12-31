import * as React from "react";
import { Link } from "react-router-dom";

export default function TrendingInstruction(props) {
  return (
    <main className="bg-white flex flex-col px-20 max-md:px-5">
      <section className="self-center flex w-full max-w-[977px] flex-col mt-32 mb-24 max-md:max-w-full max-md:my-10">
        <h1 className="text-black text-5xl uppercase self-center whitespace-nowrap max-md:text-4xl font-['NEXON']">
          실시간 트렌드
        </h1>
        <p className="text-black text-2xl font-light uppercase self-center whitespace-nowrap mt-14 max-md:max-w-full max-md:mt-10 font-['NEXON']">
          실시간 트렌드를 주제별로 한 눈에 보기 쉽게 비교하고 알아 볼 수 있습니다.
        </p>
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/6e6d1187-41b2-408e-ab0d-f9c9e6b1a964?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=2000"
          className="aspect-[1.67] object-contain object-center w-[677px] overflow-hidden self-center max-w-full mt-12 max-md:mt-10"
        />
        <div className="self-center flex w-full items-start justify-between gap-5 mt-10 max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mt-10">
          <div className="text-center shadow-sm bg-white flex flex-col flex-1 px-9 py-3 rounded-3xl max-md:px-5">
            <Link to={"/trend"} state={{ fieldValue: 50000000 }}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ebb2b7c-b651-4c2b-8b2e-6f7834777987?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
                className="aspect-square object-contain object-center w-full overflow-hidden self-stretch"
              />
              <p className="text-blue-400 text-base font-semibold leading-5 tracking-normal self-center whitespace-nowrap font-['NEXON']">
                패션 </p>
            </Link>
          </div>
          <div className="text-center shadow-sm bg-white flex flex-col flex-1 pt-2.5 pb-4 px-9 rounded-3xl max-md:px-5">
            <Link to={"/trend"} state={{ fieldValue: 50000007 }}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7108a0a4-bf35-43fb-80ca-453475259550?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
                className="aspect-square object-contain object-center w-full overflow-hidden self-stretch"
              />
              <p className="text-green-400 text-base font-semibold leading-5 tracking-normal self-center whitespace-nowrap font-['NEXON']">
                스포츠 </p>
            </Link>
          </div>
          <div className="text-center shadow-sm bg-white flex flex-col flex-1 px-9 py-3 rounded-3xl max-md:px-5">
            <Link to={"/trend"} state={{ fieldValue: 50000003 }}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5be54af-1423-4122-832e-b3f9b14439a0?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
                className="aspect-square object-contain object-center w-full overflow-hidden self-stretch"
              />
              <p className="text-violet-500 text-base font-semibold leading-5 tracking-normal self-center whitespace-nowrap font-['NEXON']">
                가전제품 </p>
            </Link>
          </div>
          <div className="text-center shadow-sm bg-white flex flex-col flex-1 pl-8 pr-8 py-3 rounded-3xl max-md:px-5">
            <Link to={"/trend"} state={{ fieldValue: 50005542 }}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5212e9aa-1b66-46b3-ad02-878575df8d4f?"
                className="aspect-square object-contain object-center w-full overflow-hidden self-stretch"
              />
              <p className="text-orange-300 text-base font-semibold leading-5 tracking-normal self-center whitespace-nowrap font-['NEXON']">
                도서 </p>
            </Link>
          </div>
          <div className="text-center shadow-sm bg-white flex flex-col flex-1 pl-8 pr-9 py-3 rounded-3xl max-md:px-5">
            <Link to={"/trend"} state={{ fieldValue: 50000006 }}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4bca508f-3345-4741-9e79-9cd7499ae077?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
                className="aspect-square object-contain object-center w-full overflow-hidden self-stretch"
              />
              <p className="text-red-400 text-base font-semibold leading-5 tracking-normal self-center whitespace-nowrap font-['NEXON']">
                식품 </p>
            </Link>
          </div>
        </div>
        <p className="text-black text-right text-2xl uppercase self-center whitespace-nowrap mt-24 max-md:max-w-full max-md:mt-10 font-['NEXON']">
          지금 바로 궁금한 트렌드를 눌러 실시간 트렌드 순위를 확인하세요!
        </p>
      </section>
    </main>
  );
}