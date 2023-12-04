import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [error, setError] = useState(""); // New state for error message

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };


  const validateForm = () => {
    const { email, name, password, confirmPassword, gender } = signupForm;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^.{4,}$/;
    const nameRegex = /^[a-zA-Z가-힣]{2,10}$/;

    let errors = {};

    if (!emailRegex.test(email)) {
      errors.email = "올바른 이메일 주소를 입력하세요.";
    }

    if (name.length < 2 || name.length > 10) {
      errors.name = "이름은 2~10자리 내에서 입력해주세요.";
    } else {
      if (!nameRegex.test(name)) {
        errors.name = "이름은 한글과 영어만 가능합니다.";
      }
    }

    if (!passwordRegex.test(password)) {
      errors.password = "비밀번호는 최소 4자리 이상이어야 합니다.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    if (!gender) {
      errors.gender = "성별을 선택해주세요.";
    }

    setErrorMessages(errors);

    return Object.keys(errors).length === 0; // 유효성 검사 통과 여부 반환
  };

  const fetchData = async () => {
    const baseUrl = "http://localhost:8080";

    try {
      if (validateForm()) {
        const response = await axios.post(
          baseUrl + `/test3/signup`,
          signupForm
        );
        console.log("Response:", response.data);
        if (response.data) {
          console.log("Signup successful!");
          navigate("/login");
        } else {
          console.log("Signup failed:", response.data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Error:", error.response.data.errors);
      console.error("중복 error:", error.response.data);
      setError(error.response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <section className="bg-white flex flex-col items-center px-5 font-['NEXON']">
      <form id="signupForm" onSubmit={handleSubmit}>
        <article className="border shadow-2xl bg-white flex w-[670px] max-w-full flex-col items-center mt-20 mb-11 px-20 py-12 rounded-3xl border-solid border-blue-300 max-md:my-10 max-md:px-5">
          <h1 className="text-blue-600 text-3xl font-medium leading-8 max-w-[462px] mr-auto mt-2 max-md:max-w-full">
            회원 가입을 위해 <br /> 정보를 입력해주세요
          </h1>

          {error && <h2 className="text-red-500 text-2xl mt-10">{error}</h2>} {/* Display error message */}

          <div className="text-neutral-500 text-base leading-4 mt-20 self-start max-md:max-w-full max-md:mt-10">
            * <span className="text-left">이메일</span>
          </div>
          <input
            type="text"
            name="email"
            value={signupForm.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@email.com"
          />
          {errorMessages.email && (
            <div className="text-red-500 text-sm mt-2 mr-auto">{errorMessages.email}</div>
          )}

          <div className="text-neutral-500 text-base leading-4 mr-auto mt-5 max-md:max-w-full">
            * 이름
          </div>
          <input
            type="text"
            name="name"
            value={signupForm.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="이름"
          />
          {errorMessages.name && (
            <div className="text-red-500 text-sm mt-2 mr-auto">{errorMessages.name}</div>
          )}

          <div className="text-neutral-500 text-base leading-4 mr-auto mt-5 max-md:max-w-full">
            * 비밀번호
          </div>
          <input
            type="password"
            name="password"
            value={signupForm.password}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="비밀번호"
          />
          {errorMessages.password && (
            <div className="text-red-500 text-sm mt-2 mr-auto">{errorMessages.password}</div>
          )}

          <div className="text-neutral-500 text-base leading-4 mr-auto mt-5 max-md:max-w-full">
            * 비밀번호 확인
          </div>
          <input
            type="password"
            name="confirmPassword"
            value={signupForm.confirmPassword}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="비밀번호 확인"
          />
          {errorMessages.confirmPassword && (
            <div className="text-red-500 text-sm mt-2 mr-auto">{errorMessages.confirmPassword}</div>
          )}

          <div className="mr-auto flex justify-start items-stretch gap-5 mt-12 max-md:mt-10">
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
          {errorMessages.gender && (
            <div className="text-red-500 text-sm mt-2 mr-auto">{errorMessages.gender}</div>
          )}


          <div className="flex w-[500px] max-w-full gap-4 mt-14 max-md:flex-wrap max-md:mt-10">
            <input
              type="checkbox"
              className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
              alt="Terms and Conditions"
            />
            <div className="text-black text-sm self-stretch grow shrink basis-auto">
              이용약관 개인정보 수집 및 이용, 마케팅 활용 선택에 모두
              동의합니다.
            </div>
          </div>
          <div className="bg-neutral-200 flex w-[470px] shrink-0 h-px flex-col mt-6 max-md:max-w-full" />
          <button
            type="submit"
            className="text-blue-600 text-center text-2xl leading-5 whitespace-nowrap border bg-white w-[470px] max-w-full items-center mt-8 mb-9 pt-7 pb-7 px-5 rounded-xl border-solid border-blue-600"
          >
            가입하기
          </button>
        </article>
      </form>
    </section>
  );
}