import { useState } from "react";
import { SUB_TABS } from "../../constants/employee/employeeTabs";

const useEmployeeTabs = () => {
  const [activeMainTab, setActiveMainTab] = useState("personal");
  const [activeSubTab, setActiveSubTab] = useState(SUB_TABS["personal"][0]);

  const handleMainTabChange = (tabId) => {
    setActiveMainTab(tabId);
    setActiveSubTab(SUB_TABS[tabId][0]);
  };

  return {
    activeMainTab,
    activeSubTab,
    handleMainTabChange,
    setActiveSubTab
  };
};

export default useEmployeeTabs;