import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../../components/common/Input';
import { TransliteratedInput } from '../../../components/common/TransliteratedInput';
import toast from 'react-hot-toast';
import { Users } from 'lucide-react';
import FormLayout from '../../../components/common/FormLayout';
import ToggleSwitch from '../../../components/common/ToggleSwitch';

const CadreForm = ({ isViewMode = false }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        cadre_code: '',
        cadre_name: '',
        cadre_name_mr: '',
        description: '',
        description_mr: '',
        is_active: true
    });

    // 🔥 LOAD (EDIT)
    useEffect(() => {
        if (isEditMode) {
            const data = JSON.parse(localStorage.getItem("cadres")) || [];
            const cadre = data.find(c => c.cadre_id == id);

            if (cadre) {
                setFormData(cadre);
            }
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.cadre_code) {
            toast.error('Cadre Code is required');
            return;
        }
        if (!formData.cadre_name) {
            toast.error('Cadre Name is required');
            return;
        }

        setLoading(true);

        let existing = JSON.parse(localStorage.getItem("cadres")) || [];

        if (isEditMode) {
            existing = existing.map(item =>
                item.cadre_id == id ? { ...item, ...formData } : item
            );
            toast.success("Cadre updated");
        } else {
            const newCadre = {
                cadre_id: Date.now(),
                ...formData
            };
            existing.push(newCadre);
            toast.success("Cadre created");
        }

        localStorage.setItem("cadres", JSON.stringify(existing));

        setLoading(false);
        navigate('/masters/cadre');
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
            <Input
                label="Cadre Code"
                value={formData.cadre_code}
                onChange={(e) => setFormData(prev => ({ ...prev, cadre_code: e.target.value }))}
                placeholder="e.g. ADM"
                required
                disabled={isEditMode}
            />

            <TransliteratedInput
                label="Cadre Name"
                value={formData.cadre_name}
                onChange={(e) => setFormData(prev => ({ ...prev, cadre_name: e.target.value }))}
                valueMr={formData.cadre_name_mr}
                onChangeMr={(e) => setFormData(prev => ({ ...prev, cadre_name_mr: e.target.value }))}
                placeholder="Administrative"
                placeholderMr="प्रशासकीय"
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

export default CadreForm;