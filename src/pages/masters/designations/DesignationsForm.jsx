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

// ✅ IMPORT DEPARTMENT API
import { getDepartments } from '../../../services/department.service';

const DesignationForm = ({ isViewMode = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    department_id: '',
    designation: '',
    total_positions: ''
  });

  // ================= LOAD DEPARTMENTS =================
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load departments");
    }
  };

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
      return toast.error('Department is required');
    }
    if (!formData.designation) {
      return toast.error('Designation is required');
    }
    if (!formData.total_positions) {
      return toast.error('Total positions is required');
    }

    const payload = {
      department_id: Number(formData.department_id),
      designation: formData.designation,
      total_positions: Number(formData.total_positions)
    };

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

      {/* 🔥 DEPARTMENT DROPDOWN */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Department
        </label>

        <select
          value={formData.department_id}
          onChange={(e) =>
            setFormData(prev => ({
              ...prev,
              department_id: e.target.value
            }))
          }
          className="border rounded-lg px-3 py-2"
          disabled={isViewMode}
        >
          <option value="">Select Department</option>

          {departments.map(dep => (
            <option key={dep.id} value={dep.id}>
              {dep.name || dep.department_name}
            </option>
          ))}
        </select>
      </div>

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