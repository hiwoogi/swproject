import React from "react";

export default function DataInstruction(props) {
  return (
    <main className="bg-white flex flex-col px-20 max-md:px-5">
      <section className="self-center flex w-full max-w-[1200px] flex-col mt-28 mb-24 max-md:max-w-full max-md:my-10">
        <h1 className="text-black text-5xl uppercase self-center whitespace-nowrap max-md:text-4xl font-['NEXON']">
          데이터 대시보드
        </h1>
        <p className="text-black text-center text-2xl font-light leading-8 uppercase self-center whitespace-nowrap mt-3.5 max-md:max-w-full font-['NEXON']">
          보고싶은 키워드의 데이터를 다양한 차트로 만나보세요!
        </p>
        <div className="self-stretch mt-28 max-md:max-w-full max-md:mt-10">
          <div className="gap-4 flex max-md:flex-col max-md:items-stretch max-md:gap-0">

            <div className="flex flex-col items-stretch w-[23%] max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col max-md:mt-5">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/325d02b0-5296-4746-892d-1ec0465e25fc?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
                  className="object-cover w-full h-[200px]"
                  alt="ClickChart"
                />
                <div className="bg-neutral-100 self-stretch flex w-full grow flex-col pt-6 pb-28 px-20 max-md:pb-24 max-md:px-5">
                  <h2 className="text-black text-center text-2xl uppercase self-center whitespace-nowrap -mb-6 max-md:mb-2.5 font-['NEXON']">
                    <br />키워드 클릭량 데이터를
                    <br />라인 차트로 체크해보세요!
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[23%] max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col max-md:mt-5">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ca77b17e-9cb4-4640-b03e-87d420b397fb?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
                  className="object-cover w-full h-[200px]"
                  alt="DeviceChart"
                />
                <div className="bg-neutral-100 self-stretch flex w-full grow flex-col pt-6 pb-28 px-20 max-md:pb-24 max-md:px-5">
                  <h2 className="text-black text-center text-2xl uppercase self-center whitespace-nowrap -mb-6 max-md:mb-2.5 font-['NEXON']">
                  <br />기기별 검색량 데이터를
                  <br />원형 차트로 비교해보세요!
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[23%] max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col max-md:mt-5">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b146555b-2628-4d7d-89ab-e203ecc77288?apiKey=d9a6bade01504f228813cd0dfee9b81b&" 
                  className="object-cover w-full h-[200px]"
                  alt="AgeChart"
                />
                <div className="bg-neutral-100 self-stretch flex w-full grow flex-col pt-6 pb-28 px-20 max-md:pb-24 max-md:px-5">
                  <h2 className="text-black text-center text-2xl uppercase self-center whitespace-nowrap -mb-6 max-md:mb-2.5 font-['NEXON']">
                  <br />연령별 검색량 데이터를
                  <br />막대 차트로 비교해보세요!
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[23%] max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col max-md:mt-5">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1f69852f-4f37-4915-b0c1-36f28bd5e175?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
                  className="object-cover w-full h-[200px]"
                  alt="GenderChart"
                />
                <div className="bg-neutral-100 self-stretch flex w-full grow flex-col pt-6 pb-28 px-20 max-md:pb-24 max-md:px-5">
                  <h2 className="text-black text-center text-2xl uppercase self-center whitespace-nowrap -mb-6 max-md:mb-2.5 font-['NEXON']">
                    <br />성별 검색량 데이터를
                    <br />각 차트로 비교해보세요!
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}