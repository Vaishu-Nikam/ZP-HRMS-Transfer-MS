import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { logoutUser} from "../../../redux/slices/authSlice";

export const useSidebar = () => {
  const dispatch = useAppDispatch();
  const [openSection, setOpenSection] = useState(null);

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  const toggleSection = (key) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  return {
    openSection,
    toggleSection,
    handleLogout,
  };
};