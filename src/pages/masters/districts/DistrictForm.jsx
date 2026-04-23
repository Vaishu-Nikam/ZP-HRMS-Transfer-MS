import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import FormLayout from "../../../components/common/FormLayout";
import { TransliteratedInput } from "../../../components/common/TransliteratedInput";
import ToggleSwitch from "../../../components/common/ToggleSwitch";
import toast from "react-hot-toast";

// ✅ API SERVICES
import {
  getDistrictById,
  createDistrict,
  updateDistrict,
} from "../../../services/district.service";

const DistrictForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    district_name: "",
    district_name_mr: "",
    is_active: true,
  });

  // 🔥 LOAD DATA (EDIT MODE)
  useEffect(() => {
    if (!isEditMode) return;

    const fetchDistrict = async () => {
      try {
        setLoading(true);

        const res = await getDistrictById(id);
        console.log("District API:", res);

        const data = res?.data || res;

        setFormData({
          district_name: data?.name || "",
          district_name_mr: data?.name_mr || "",
          is_active: data?.is_active ?? true,
        });

      } catch (error) {
        console.error(error);
        toast.error("Failed to load district");
      } finally {
        setLoading(false);
      }
    };

    fetchDistrict();
  }, [id, isEditMode]);

  // 🔥 SUBMIT (CREATE + UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.district_name) {
      toast.error("District Name is required");
      return;
    }

    // 🔥 MAP FRONTEND → BACKEND
    const payload = {
      name: formData.district_name,
      name_mr: formData.district_name_mr,
      is_active: formData.is_active,
    };

    try {
      setLoading(true);

      if (isEditMode) {
        await updateDistrict(id, payload);
        toast.success("District updated successfully");
      } else {
        await createDistrict(payload);
        toast.success("District created successfully");
      }

      navigate("/masters/districts");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to save district"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="District"
      icon={MapPin}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/masters/districts")}
      isEditMode={isEditMode}
      isViewMode={false}
      loading={loading}
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