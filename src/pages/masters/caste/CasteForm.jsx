import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../../components/common/Input';
import { TransliteratedInput } from '../../../components/common/TransliteratedInput';
import toast from 'react-hot-toast';
import { Users } from 'lucide-react';
import FormLayout from '../../../components/common/FormLayout';
import ToggleSwitch from '../../../components/common/ToggleSwitch';

const CasteForm = ({ isViewMode = false }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        caste_code: '',
        caste_name: '',
        caste_name_mr: '',
        description: '',
        description_mr: '',
        is_active: true
    });

    // 🔥 LOAD (EDIT)
    useEffect(() => {
        if (isEditMode) {
            const data = JSON.parse(localStorage.getItem("castes")) || [];
            const caste = data.find(c => c.caste_id == id);

            if (caste) {
                setFormData(caste);
            }
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.caste_code) {
            toast.error('Caste Code is required');
            return;
        }
        if (!formData.caste_name) {
            toast.error('Caste Name is required');
            return;
        }

        setLoading(true);

        let existing = JSON.parse(localStorage.getItem("castes")) || [];

        if (isEditMode) {
            existing = existing.map(item =>
                item.caste_id == id ? { ...item, ...formData } : item
            );
            toast.success("Caste updated");
        } else {
            const newCaste = {
                caste_id: Date.now(),
                ...formData
            };
            existing.push(newCaste);
            toast.success("Caste created");
        }

        localStorage.setItem("castes", JSON.stringify(existing));

        setLoading(false);
        navigate('/masters/caste');
    };

    return (
        <FormLayout
            title="Caste"
            icon={Users}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/masters/caste')}
            isEditMode={isEditMode}
            isViewMode={isViewMode}
            loading={loading}
        >
            <Input
                label="Caste Code"
                value={formData.caste_code}
                onChange={(e) => setFormData(prev => ({ ...prev, caste_code: e.target.value }))}
                placeholder="e.g. GEN"
                required
                disabled={isEditMode}
            />

            <TransliteratedInput
                label="Caste Name"
                value={formData.caste_name}
                onChange={(e) => setFormData(prev => ({ ...prev, caste_name: e.target.value }))}
                valueMr={formData.caste_name_mr}
                onChangeMr={(e) => setFormData(prev => ({ ...prev, caste_name_mr: e.target.value }))}
                placeholder="General"
                placeholderMr="सामान्य"
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

export default CasteForm;