import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../../components/common/Input';
import { TransliteratedInput } from '../../../components/common/TransliteratedInput';
import toast from 'react-hot-toast';
import { Building } from 'lucide-react';
import FormLayout from '../../../components/common/FormLayout';
import ToggleSwitch from '../../../components/common/ToggleSwitch';

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

    // 🔥 LOAD (EDIT)
    useEffect(() => {
        if (isEditMode) {
            const data = JSON.parse(localStorage.getItem("departments")) || [];
            const dept = data.find(d => d.department_id == id);

            if (dept) {
                setFormData(dept);
            }
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.department_code) {
            toast.error('Department Code is required');
            return;
        }
        if (!formData.department_name) {
            toast.error('Department Name is required');
            return;
        }

        setLoading(true);

        let existing = JSON.parse(localStorage.getItem("departments")) || [];

        if (isEditMode) {
            existing = existing.map(item =>
                item.department_id == id ? { ...item, ...formData } : item
            );
            toast.success("Department updated");
        } else {
            const newDept = {
                department_id: Date.now(),
                ...formData
            };
            existing.push(newDept);
            toast.success("Department created");
        }

        localStorage.setItem("departments", JSON.stringify(existing));

        setLoading(false);
        navigate('/masters/departments');
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
                onChange={(e) => setFormData(prev => ({ ...prev, department_code: e.target.value }))}
                placeholder="e.g. DWCD"
                required
                disabled={isEditMode}
            />

            <TransliteratedInput
                label="Department Name"
                value={formData.department_name}
                onChange={(e) => setFormData(prev => ({ ...prev, department_name: e.target.value }))}
                valueMr={formData.department_name_mr}
                onChangeMr={(e) => setFormData(prev => ({ ...prev, department_name_mr: e.target.value }))}
                placeholder="Women and Child Development"
                placeholderMr="महिला आणि बाल विकास विभाग"
                required
            />

            <TransliteratedInput
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                valueMr={formData.description_mr}
                onChangeMr={(e) => setFormData(prev => ({ ...prev, description_mr: e.target.value }))}
                isTextArea
            />

            <ToggleSwitch
                label="Active Status"
                description={formData.is_active ? 'Active' : 'Inactive'}
                checked={formData.is_active}
                onChange={(val) => setFormData(prev => ({ ...prev, is_active: val }))}
            />
        </FormLayout>
    );
};

export default DepartmentForm;