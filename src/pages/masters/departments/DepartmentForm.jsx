import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../../components/common/Input';
import { TransliteratedInput } from '../../../components/common/TransliteratedInput';
import toast from 'react-hot-toast';
import { Building } from 'lucide-react';
import FormLayout from '../../../components/common/FormLayout';
import ToggleSwitch from '../../../components/common/ToggleSwitch';

import {
  getDepartmentById,
  createDepartment,
  updateDepartment
} from '../../../services/department.service';

const DepartmentForm = ({ isViewMode = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    department_code: '',
    department_name: '',
    department_name_mr: '',
    zp_id: '',
    is_active: true // UI only
  });

  // ================== LOAD (EDIT MODE) ==================
  useEffect(() => {
    if (!isEditMode) return;

    const fetchDepartment = async () => {
      try {
        setLoading(true);

        const data = await getDepartmentById(id); // ✅ FIXED

        setFormData({
          department_code: data?.code || '',
          department_name: data?.name || '',
          department_name_mr: data?.name_mr || '',
          zp_id: data?.zp_id || '',
          is_active: data?.is_active ?? true
        });

      } catch (error) {
        console.error(error);
        toast.error("Failed to load department");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id, isEditMode]);

  // ================== SUBMIT ==================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.department_code) return toast.error('Department Code is required');
    if (!formData.department_name) return toast.error('Department Name is required');
    if (!formData.department_name_mr) return toast.error('Marathi Name is required');
    if (!formData.zp_id) return toast.error('ZP ID is required');

    // ✅ MATCH BACKEND BODY EXACTLY
    const payload = {
      code: formData.department_code,
      name: formData.department_name,
      name_mr: formData.department_name_mr,
      zp_id: Number(formData.zp_id)
    };

    console.log("FINAL PAYLOAD:", payload);

    try {
      setLoading(true);

      if (isEditMode) {
        await updateDepartment(id, payload);
        toast.success("Department updated");
      } else {
        await createDepartment(payload);
        toast.success("Department created");
      }

      navigate('/masters/departments');

    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to save department"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="Department"
      icon={Building}
      onSubmit={handleSubmit}
      onCancel={() => navigate('/masters/departments')}
      isEditMode={isEditMode}
      isViewMode={isViewMode}
      loading={loading}
    >
      {/* Department Code */}
      <Input
        label="Department Code"
        value={formData.department_code}
        onChange={(e) =>
          setFormData(prev => ({
            ...prev,
            department_code: e.target.value
          }))
        }
        placeholder="e.g. DWCD"
        required
        disabled={isEditMode}
      />

      {/* ZP ID */}
      <Input
        label="ZP ID"
        value={formData.zp_id}
        onChange={(e) =>
          setFormData(prev => ({
            ...prev,
            zp_id: e.target.value
          }))
        }
        placeholder="Enter ZP ID"
        required
      />

      {/* Department Name */}
      <TransliteratedInput
        label="Department Name"
        value={formData.department_name}
        onChange={(e) =>
          setFormData(prev => ({
            ...prev,
            department_name: e.target.value
          }))
        }
        valueMr={formData.department_name_mr}
        onChangeMr={(e) =>
          setFormData(prev => ({
            ...prev,
            department_name_mr: e.target.value
          }))
        }
        placeholder="Women and Child Development"
        placeholderMr="महिला आणि बाल विकास विभाग"
        required
      />

      {/* Optional UI Toggle (not sent to API) */}
      <ToggleSwitch
        label="Active Status"
        description={formData.is_active ? 'Active' : 'Inactive'}
        checked={formData.is_active}
        onChange={(val) =>
          setFormData(prev => ({
            ...prev,
            is_active: val
          }))
        }
      />
    </FormLayout>
  );
};

export default DepartmentForm;