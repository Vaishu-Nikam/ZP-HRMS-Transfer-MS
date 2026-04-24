import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../../components/common/Input';
import { TransliteratedInput } from '../../../components/common/TransliteratedInput';
import toast from 'react-hot-toast';
import { Users } from 'lucide-react';
import FormLayout from '../../../components/common/FormLayout';

import {
  getCadreById,
  createCadre,
  updateCadre
} from '../../../services/cadre.service';

const CadreForm = ({ isViewMode = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    department_id: '',
    description: '',
    cadre_name: '',
    cadre_name_mr: '',
    description_mr: '',
    cadre_group: ''
  });

  // 🔹 LOAD (EDIT MODE)
  useEffect(() => {
    if (!isEditMode) return;

    const fetchCadre = async () => {
      try {
        setLoading(true);

        const res = await getCadreById(id);
        const data = res?.data || res;

        setFormData({
          department_id: data?.department_id || '',
          description: data?.description || '',
          cadre_name: data?.cadre_name || '',
          cadre_name_mr: data?.cadre_name_mr || '',
          description_mr: data?.description_mr || '',
          cadre_group: data?.cadre_group || ''
        });

      } catch (error) {
        console.error(error);
        toast.error("Failed to load cadre");
      } finally {
        setLoading(false);
      }
    };

    fetchCadre();
  }, [id]);

  // 🔹 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.department_id) {
      toast.error('Department ID is required');
      return;
    }

    if (!formData.cadre_name) {
      toast.error('Cadre Name is required');
      return;
    }

    if (!formData.cadre_name_mr) {
      toast.error('Marathi Name is required');
      return;
    }

    if (!formData.cadre_group) {
      toast.error('Cadre Group is required');
      return;
    }

    const payload = {
      department_id: Number(formData.department_id),
      description: Number(formData.description), // 👈 backend expects number
      cadre_name: formData.cadre_name,
      cadre_name_mr: formData.cadre_name_mr,
      description_mr: formData.description_mr,
      cadre_group: formData.cadre_group
    };

    console.log("FINAL PAYLOAD:", payload);

    try {
      setLoading(true);

      if (isEditMode) {
        await updateCadre(id, payload);
        toast.success("Cadre updated");
      } else {
        await createCadre(payload);
        toast.success("Cadre created");
      }

      navigate('/masters/cadre');

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to save cadre"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="Cadre"
      icon={Users}
      onSubmit={handleSubmit}
      onCancel={() => navigate('/masters/cadre')}
      isEditMode={isEditMode}
      isViewMode={isViewMode}
      loading={loading}
    >
      {/* Department ID */}
      <Input
        label="Department ID"
        value={formData.department_id}
        onChange={(e) =>
          setFormData(prev => ({
            ...prev,
            department_id: e.target.value
          }))
        }
        required
      />

      {/* Description (NUMBER) */}
      <Input
        label="Description (Number)"
        value={formData.description}
        onChange={(e) =>
          setFormData(prev => ({
            ...prev,
            description: e.target.value
          }))
        }
        required
      />

      {/* Cadre Name */}
      <TransliteratedInput
        label="Cadre Name"
        value={formData.cadre_name}
        onChange={(e) =>
          setFormData(prev => ({
            ...prev,
            cadre_name: e.target.value
          }))
        }
        valueMr={formData.cadre_name_mr}
        onChangeMr={(e) =>
          setFormData(prev => ({
            ...prev,
            cadre_name_mr: e.target.value
          }))
        }
        required
      />

      {/* Description Marathi */}
      <TransliteratedInput
        label="Description (Marathi)"
        value={formData.description_mr}
        onChange={(e) =>
          setFormData(prev => ({
            ...prev,
            description_mr: e.target.value
          }))
        }
        isTextArea
      />

      {/* Cadre Group */}
      <Input
        label="Cadre Group (A/B/C/D)"
        value={formData.cadre_group}
        onChange={(e) =>
          setFormData(prev => ({
            ...prev,
            cadre_group: e.target.value
          }))
        }
        placeholder="A"
        required
      />
    </FormLayout>
  );
};

export default CadreForm;