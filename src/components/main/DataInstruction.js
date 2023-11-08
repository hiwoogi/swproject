import React from "react";

export default function DataInstruction(props) {
  return (
    <main className="bg-white flex flex-col px-20 max-md:px-5">
      <section className="self-center flex w-full max-w-[1159px] flex-col mt-28 mb-24 max-md:max-w-full max-md:my-10">
        <h1 className="text-black text-5xl uppercase self-center whitespace-nowrap max-md:text-4xl font-['NEXON']">
          데이터 대시보드
        </h1>
        <p className="text-black text-center text-2xl font-light leading-8 uppercase self-center whitespace-nowrap mt-3.5 max-md:max-w-full font-['NEXON']">
          보고싶은 키워드의 데이터를 다양한 데이터로 만나보세요!
        </p>
        <div className="self-stretch mt-28 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col max-md:mt-5">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1296a0bb-8337-4e99-88c1-19c4111a39b1?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1296a0bb-8337-4e99-88c1-19c4111a39b1?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1296a0bb-8337-4e99-88c1-19c4111a39b1?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1296a0bb-8337-4e99-88c1-19c4111a39b1?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1296a0bb-8337-4e99-88c1-19c4111a39b1?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1296a0bb-8337-4e99-88c1-19c4111a39b1?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1296a0bb-8337-4e99-88c1-19c4111a39b1?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1296a0bb-8337-4e99-88c1-19c4111a39b1?apiKey=d9a6bade01504f228813cd0dfee9b81b&"className="aspect-[1.13] object-contain object-center w-full overflow-hidden self-stretch"
                  alt="Graph Chart"
                />
                <div className="bg-neutral-100 self-stretch flex w-full grow flex-col pt-6 pb-28 px-20 max-md:pb-24 max-md:px-5">
                  <h2 className="text-black text-center text-2xl uppercase self-center whitespace-nowrap -mb-6 max-md:mb-2.5 font-['NEXON']">
                    그래프 차트
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col max-md:mt-5">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ea74b729-9327-4d0e-9a3a-28a5b798cd41?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea74b729-9327-4d0e-9a3a-28a5b798cd41?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea74b729-9327-4d0e-9a3a-28a5b798cd41?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea74b729-9327-4d0e-9a3a-28a5b798cd41?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea74b729-9327-4d0e-9a3a-28a5b798cd41?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea74b729-9327-4d0e-9a3a-28a5b798cd41?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea74b729-9327-4d0e-9a3a-28a5b798cd41?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea74b729-9327-4d0e-9a3a-28a5b798cd41?apiKey=d9a6bade01504f228813cd0dfee9b81b&"className="aspect-[1.13] object-contain object-center w-full overflow-hidden self-stretch"
                  alt="Circular Grid Chart"
                />
                <div className="bg-neutral-100 self-stretch flex w-full grow flex-col pt-7 pb-28 px-20 max-md:pb-24 max-md:px-5">
                  <h2 className="text-black text-center text-2xl uppercase self-center mb-0 whitespace-nowrap max-md:mb-2.5 font-['NEXON']">
                    원형 그리드 차트
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col max-md:mt-5">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/8153e030-8f5d-4af9-9800-6ea6653be5fe?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/8153e030-8f5d-4af9-9800-6ea6653be5fe?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8153e030-8f5d-4af9-9800-6ea6653be5fe?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/8153e030-8f5d-4af9-9800-6ea6653be5fe?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/8153e030-8f5d-4af9-9800-6ea6653be5fe?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8153e030-8f5d-4af9-9800-6ea6653be5fe?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/8153e030-8f5d-4af9-9800-6ea6653be5fe?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/8153e030-8f5d-4af9-9800-6ea6653be5fe?apiKey=d9a6bade01504f228813cd0dfee9b81b&"className="aspect-[1.13] object-contain object-center w-full overflow-hidden self-stretch"
                  alt="Dashboard Chart"
                />
                <div className="bg-neutral-100 self-stretch flex w-full grow flex-col pt-6 pb-28 px-20 max-md:pb-24 max-md:px-5">
                  <h2 className="text-black text-center text-2xl uppercase self-center whitespace-nowrap -mb-6 max-md:mb-2.5 font-['NEXON']">
                    계기판 차트
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