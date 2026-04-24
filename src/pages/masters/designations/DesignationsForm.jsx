import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../../components/common/Input';
import toast from 'react-hot-toast';
import { Briefcase } from 'lucide-react';
import FormLayout from '../../../components/common/FormLayout';

import {
  createPost,
  updatePost,
  getPostById
} from '../../../services/post.service';

const DesignationForm = ({ isViewMode = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    department_id: '',
    designation: '',
    total_positions: ''
  });

  // ================= LOAD (EDIT) =================
  useEffect(() => {
    if (!isEditMode) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getPostById(id);

        setFormData({
          department_id: data?.department_id || '',
          designation: data?.designation || '',
          total_positions: data?.total_positions || ''
        });

      } catch (error) {
        console.error(error);
        toast.error("Failed to load designation");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEditMode]);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.department_id) {
      return toast.error('Department ID is required');
    }
    if (!formData.designation) {
      return toast.error('Designation is required');
    }
    if (!formData.total_positions) {
      return toast.error('Total positions is required');
    }

    const payload = {
      department_id: Number(formData.department_id), // 🔥 important
      designation: formData.designation,
      total_positions: Number(formData.total_positions)
    };

    console.log("FINAL PAYLOAD:", payload);

    try {
      setLoading(true);

      if (isEditMode) {
        await updatePost(id, payload);
        toast.success("Designation updated");
      } else {
        await createPost(payload);
        toast.success("Designation created");
      }

      navigate('/masters/designation');

    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to save designation"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="Designation"
      icon={Briefcase}
      onSubmit={handleSubmit}
      onCancel={() => navigate('/masters/designation')}
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
        placeholder="Enter Department ID"
        required
      />

      {/* Designation */}
      <Input
        label="Designation"
        value={formData.designation}
        onChange={(e) =>
          setFormData(prev => ({
            ...prev,
            designation: e.target.value
          }))
        }
        placeholder="e.g. Tester"
        required
      />

      {/* Total Positions */}
      <Input
        label="Total Positions"
        type="number"
        value={formData.total_positions}
        onChange={(e) =>
          setFormData(prev => ({
            ...prev,
            total_positions: e.target.value
          }))
        }
        placeholder="e.g. 5"
        required
      />
    </FormLayout>
  );
};

export default DesignationForm;