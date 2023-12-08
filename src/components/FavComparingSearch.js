import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createRoot } from "react-dom/client";
import GenderChart from "./charts/GenderChart";
import AgeChart from "./charts/AgeChart";
import DeviceChart from "./charts/DeviceChart";
import ClickChart from "./charts/ClickChart";
import { SyncLoader } from "react-spinners";
import SingleDatePicker from "./searchForms/SingleDatePicker";
import dayjs, { Dayjs } from "dayjs";
import FavModal from "../function/FavModal";
import { makeChartData } from "../function/MakeChartData";
import SelectCategory from "./searchForms/SelectCategory";
import InputKeyword from "./searchForms/InputKeyword";
import SelectPeriod from "./searchForms/SelectPeriod";
import AgeCheckbox from "./searchForms/AgeCheckbox";
import DeviceRadio from "./searchForms/DeviceRadio";
import GenderRadio from "./searchForms/GenderRadio";
import { WithContext as ReactTags } from "react-tag-input";

export default function FavComparingSearch() {
  return (
    <div>FavComparingSearch</div>
  )
}
