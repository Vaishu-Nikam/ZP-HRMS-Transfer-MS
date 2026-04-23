import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../../components/common/Input';
import { TransliteratedInput } from '../../../components/common/TransliteratedInput';
import toast from 'react-hot-toast';
import { Building } from 'lucide-react';
import FormLayout from '../../../components/common/FormLayout';
import ToggleSwitch from '../../../components/common/ToggleSwitch';

// ✅ API SERVICES
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
    description: '',
    description_mr: '',
    is_active: true
  });

  // 🔥 LOAD DATA (EDIT MODE)
  useEffect(() => {
    if (!isEditMode) return;

    const fetchDepartment = async () => {
      try {
        setLoading(true);

        const res = await getDepartmentById(id);
        console.log("API Response:", res);

        // 🔥 SAFE RESPONSE HANDLING
        const data = res?.data || res;

        setFormData({
          department_code: data?.code || '',
          department_name: data?.name || '',
          department_name_mr: data?.name_mr || '',
          description: data?.description || '',
          description_mr: data?.description_mr || '',
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

  // 🔥 SUBMIT (CREATE / UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.department_code) {
      toast.error('Department Code is required');
      return;
    }

    if (!formData.department_name) {
      toast.error('Department Name is required');
      return;
    }

    // 🔥 MAP FRONTEND → BACKEND
    const payload = {
      code: formData.department_code,
      name: formData.department_name,
      name_mr: formData.department_name_mr,
      description: formData.description,
      description_mr: formData.description_mr,
      is_active: formData.is_active
    };

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
        error.response?.data?.message ||
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

      <TransliteratedInput
        label="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData(prev => ({
            ...prev,
            description: e.target.value
          }))
        }
        valueMr={formData.description_mr}
        onChangeMr={(e) =>
          setFormData(prev => ({
            ...prev,
            description_mr: e.target.value
          }))
        }
        isTextArea
      />

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