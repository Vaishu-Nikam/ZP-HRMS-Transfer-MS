import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import FormLayout from "../../../components/common/FormLayout";
import { TransliteratedInput } from "../../../components/common/TransliteratedInput";
import ToggleSwitch from "../../../components/common/ToggleSwitch";
import toast from "react-hot-toast";

const DistrictForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    district_name: "",
    district_name_mr: "",
    is_active: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.district_name) {
      toast.error("District Name is required");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("districts")) || [];

    const newDistrict = {
      district_id: Date.now(),
      ...formData,
    };

    const updated = [...existing, newDistrict];

    localStorage.setItem("districts", JSON.stringify(updated));

    toast.success("District saved successfully");
    navigate("/masters/districts");
  };

  return (
    <FormLayout
      title="District"
      icon={MapPin}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/masters/districts")}
      isEditMode={false}
      isViewMode={false}
      loading={false}
    >
      <TransliteratedInput
        label="District Name"
        value={formData.district_name}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            district_name: e.target.value,
          }))
        }
        valueMr={formData.district_name_mr}
        onChangeMr={(e) =>
          setFormData((prev) => ({
            ...prev,
            district_name_mr: e.target.value,
          }))
        }
        placeholder="Enter district name"
        placeholderMr="पुणे"
        required
      />

      <ToggleSwitch
        label="Active Status"
        description={
          formData.is_active
            ? "District is currently active"
            : "District is currently inactive"
        }
        checked={formData.is_active}
        onChange={(val) =>
          setFormData((prev) => ({
            ...prev,
            is_active: val,
          }))
        }
      />
    </FormLayout>
  );
};

export default DistrictForm;