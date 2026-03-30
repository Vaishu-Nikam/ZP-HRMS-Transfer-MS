import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../../components/common/Input';
import { TransliteratedInput } from '../../../components/common/TransliteratedInput';
import toast from 'react-hot-toast';
import { Building } from 'lucide-react';
import FormLayout from '../../../components/common/FormLayout';
import ToggleSwitch from '../../../components/common/ToggleSwitch';

const OfficeForm = ({ isViewMode = false }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        office_code: '',
        office_name: '',
        office_name_mr: '',
        description: '',
        description_mr: '',
        is_active: true
    });

    useEffect(() => {
        if (isEditMode) {
            const data = JSON.parse(localStorage.getItem("offices")) || [];
            const office = data.find(o => o.office_id == id);
            if (office) setFormData(office);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.office_code || !formData.office_name) {
            toast.error("All required fields needed");
            return;
        }

        setLoading(true);

        let existing = JSON.parse(localStorage.getItem("offices")) || [];

        if (isEditMode) {
            existing = existing.map(item =>
                item.office_id == id ? { ...item, ...formData } : item
            );
            toast.success("Office updated");
        } else {
            existing.push({ office_id: Date.now(), ...formData });
            toast.success("Office created");
        }

        localStorage.setItem("offices", JSON.stringify(existing));

        setLoading(false);
        navigate('/masters/office');
    };

    return (
        <FormLayout
            title="Office"
            icon={Building}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/masters/office')}
            isEditMode={isEditMode}
            isViewMode={isViewMode}
            loading={loading}
        >
            <Input label="Office Code" value={formData.office_code}
                onChange={(e)=>setFormData(p=>({...p,office_code:e.target.value}))} required />

            <TransliteratedInput
                label="Office Name"
                value={formData.office_name}
                onChange={(e)=>setFormData(p=>({...p,office_name:e.target.value}))}
                valueMr={formData.office_name_mr}
                onChangeMr={(e)=>setFormData(p=>({...p,office_name_mr:e.target.value}))}
                required
            />

            <TransliteratedInput
                label="Description"
                value={formData.description}
                onChange={(e)=>setFormData(p=>({...p,description:e.target.value}))}
                valueMr={formData.description_mr}
                onChangeMr={(e)=>setFormData(p=>({...p,description_mr:e.target.value}))}
                isTextArea
            />

            <ToggleSwitch
                label="Active Status"
                checked={formData.is_active}
                onChange={(val)=>setFormData(p=>({...p,is_active:val}))}
            />
        </FormLayout>
    );
};

export default OfficeForm;