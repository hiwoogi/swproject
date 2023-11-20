import axios from "axios";
import React, { useState } from "react";

export default function Signup(props) {
  const [signupForm, setSignupForm] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    gender: "", // You can modify this based on your requirements
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  
  const fetchData = async () => {

    const baseUrl = "http://localhost:8080";

    try {
      //서버로 스크래핑 요청보내고 응답데이터를 받아옴 (응답데이터는  1~10위 검색어 데이터가 10개의 배열로 들어가있음)
      const response = await axios.post(baseUrl+`/test3/signup`,signupForm);
      console.log('Response:', response.data);
      
      // Process the response data as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchData()
    console.log("Form submitted:", signupForm);

  };

  return (
    <section className="bg-white flex flex-col items-center px-5">
      <form id="signupForm" onSubmit={handleSubmit}>
        <article className="border shadow-2xl bg-white flex w-[670px] max-w-full flex-col items-center mt-20 mb-11 px-20 py-12 rounded-3xl border-solid border-blue-300 max-md:my-10 max-md:px-5">
          <h1 className="text-blue-600 text-3xl font-medium leading-8 max-w-[462px] mr-auto mt-2 max-md:max-w-full">
            회원 가입을 위해 <br /> 정보를 입력해주세요
          </h1>
          <div className="text-neutral-500 text-base leading-4 mt-24 self-start max-md:max-w-full max-md:mt-10">
            * <span className="text-left">이메일</span>
          </div>
          <input
            type="text"
            name="email"
            value={signupForm.email}
            onChange={handleChange}
            className="aspect-[470] object-contain object-center w-[470px] border border-solid border-gray-300 mt-7 max-md:mt-10"
            placeholder="이메일"
          />
          <div className="text-neutral-500 text-base leading-4 mr-auto mt-5 max-md:max-w-full">
            * 이름
          </div>
          <input
            type="text"
            name="name"
            value={signupForm.name}
            onChange={handleChange}
            className="aspect-[470] object-contain object-center w-[470px] border border-solid border-gray-300 mt-7 max-md:mt-10"
            placeholder="이름"
          />

          <div className="text-neutral-500 text-base leading-4 mr-auto mt-5 max-md:max-w-full">
            * 비밀번호
          </div>
          <input
            type="password"
            name="password"
            value={signupForm.password}
            onChange={handleChange}
            className="aspect-[470] object-contain object-center w-[470px] border border-solid border-gray-300 mt-7 max-md:mt-10"
            placeholder="비밀번호"
          />
          <div className="text-neutral-500 text-base leading-4 mr-auto mt-5 max-md:max-w-full">
            * 비밀번호 확인
          </div>
          <input
            type="password"
            name="confirmPassword"
            value={signupForm.confirmPassword}
            onChange={handleChange}
            className="aspect-[470] object-contain object-center w-[470px] border border-solid border-gray-300 mt-7 max-md:mt-10"
            placeholder="비밀번호 확인"
          />
          <div className="flex w-[143px] max-w-full items-stretch justify-between gap-5 mt-12 max-md:mt-10">
            <div className="flex items-stretch justify-between gap-1.5">
              <div className="text-black text-base leading-4 grow whitespace-nowrap self-start">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={signupForm.gender === "male"}
                  onChange={handleChange}
                />
                남성
              </div>
            </div>
            <div className="flex items-stretch justify-between gap-1.5">
              <div className="stroke-[1px] flex w-6 shrink-0 h-5 flex-col rounded-[50%]" />
              <div className="text-black text-base leading-4 grow whitespace-nowrap self-start">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={signupForm.gender === "female"}
                  onChange={handleChange}
                />
                여성
              </div>
            </div>
          </div>
          <div className="flex w-[434px] max-w-full gap-4 mt-14 max-md:flex-wrap max-md:mt-10">
            <input
              type="checkbox"
              className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
              alt="Terms and Conditions"
            />
            <div className="text-black text-sm leading-4 self-stretch grow shrink basis-auto">
              이용약관 개인정보 수집 및 이용, 마케팅 활용 선택에 모두
              동의합니다.
            </div>
          </div>
          <div className="bg-neutral-200 flex w-[470px] shrink-0 h-px flex-col mt-6 max-md:max-w-full" />
          <button
            type="submit"
            className="text-blue-600 text-center text-lg leading-5 whitespace-nowrap border bg-white w-[470px] max-w-full items-center mt-8 mb-9 pt-6 pb-9 px-5 rounded-xl border-solid border-blue-600"
          >
            가입하기
          </button>
        </article>
      </form>
    </section>
  );
}

// className="aspect-[470] object-contain object-center w-[470px] stroke-[1px] stroke-blue-600 overflow-hidden max-w-full mt-16 max-md:mt-10"
