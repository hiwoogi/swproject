import * as React from "react";

export default function KeywordInstruction(props) {
  return (
    <m  ain className="justify-center items-start bg-white flex flex-col px-20 max-md:px-5">
      <section className="self-center w-full max-w-[1161px] mt-32 mb-24 max-md:max-w-full max-md:my-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[31%] max-md:w-full max-md:ml-0">
            <div className="flex flex-col max-md:mt-10">
              <h2 className="text-stone-500 text-base underline uppercase self-stretch whitespace-nowrap">
                이미지/텍스트 유형01
              </h2>
              <h1 className="text-black text-5xl leading-[70px] uppercase self-stretch whitespace-nowrap mt-3 max-md:text-4xl">
                키워드 검색
              </h1>
              <p className="text-stone-500 text-base leading-6 uppercase self-stretch mt-24 max-md:mt-10">
                보고싶은 키워드에 대한 클릭량, 성별, 연령별 등 다양한 데이터를 얻을 수 있어요!
              </p>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[69%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex-col overflow-hidden relative flex min-h-[500px] grow pl-20 pr-5 pt-96 pb-2.5 max-md:max-w-full max-md:mt-10 max-md:pl-5 max-md:pt-24">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccc5ecdd-407c-42b0-a996-a798016e3cff?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
                className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                alt="Keyword Search"
              />
              <a
                href="#"
                className="relative text-white text-lg leading-7 uppercase whitespace-nowrap bg-yellow-900 w-[180px] max-w-full pl-7 pr-8 py-3 rounded-[30px] self-end max-md:px-5"
              >
                키워드 분석하기
              </a>
            </div>
          </div>
        </div>
      </section>
    </m>
  );
}