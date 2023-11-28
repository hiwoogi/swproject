import React from "react";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ data }) {
  return (
    <aside
      id="default-sidebar"
      class="fixed top-90 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        {data.map((item, index) => (
          <SidebarItem key={index} data={item} num={index} />
        ))}
      </div>
    </aside>
  );
}
