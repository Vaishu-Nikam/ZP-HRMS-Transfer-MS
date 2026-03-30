import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../../components/common/Input';
import { TransliteratedInput } from '../../../components/common/TransliteratedInput';
import toast from 'react-hot-toast';
import { Briefcase } from 'lucide-react';
import FormLayout from '../../../components/common/FormLayout';
import ToggleSwitch from '../../../components/common/ToggleSwitch';

const DesignationForm = ({ isViewMode = false }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        designation_code: '',
        designation_name: '',
        designation_name_mr: '',
        description: '',
        description_mr: '',
        is_active: true
    });

    // 🔥 LOAD (EDIT)
    useEffect(() => {
        if (isEditMode) {
            const data = JSON.parse(localStorage.getItem("designations")) || [];
            const designation = data.find(d => d.designation_id == id);

            if (designation) {
                setFormData(designation);
            }
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.designation_code) {
            toast.error('Designation Code is required');
            return;
        }
        if (!formData.designation_name) {
            toast.error('Designation Name is required');
            return;
        }

        setLoading(true);

        let existing = JSON.parse(localStorage.getItem("designations")) || [];

        if (isEditMode) {
            existing = existing.map(item =>
                item.designation_id == id ? { ...item, ...formData } : item
            );
            toast.success("Designation updated");
        } else {
            const newDesignation = {
                designation_id: Date.now(),
                ...formData
            };
            existing.push(newDesignation);
            toast.success("Designation created");
        }

        localStorage.setItem("designations", JSON.stringify(existing));

        setLoading(false);
        navigate('/masters/designation');
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
            <Input
                label="Designation Code"
                value={formData.designation_code}
                onChange={(e) => setFormData(prev => ({ ...prev, designation_code: e.target.value }))}
                placeholder="e.g. MGR"
                required
                disabled={isEditMode}
            />

            <TransliteratedInput
                label="Designation Name"
                value={formData.designation_name}
                onChange={(e) => setFormData(prev => ({ ...prev, designation_name: e.target.value }))}
                valueMr={formData.designation_name_mr}
                onChangeMr={(e) => setFormData(prev => ({ ...prev, designation_name_mr: e.target.value }))}
                placeholder="Manager"
                placeholderMr="व्यवस्थापक"
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

export default DesignationForm;