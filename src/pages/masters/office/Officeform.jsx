import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../../components/common/Input';
import { TransliteratedInput } from '../../../components/common/TransliteratedInput';
import toast from 'react-hot-toast';
import { Building } from 'lucide-react';
import FormLayout from '../../../components/common/FormLayout';
import ToggleSwitch from '../../../components/common/ToggleSwitch';

// ✅ IMPORT API
import {
    createOffice,
    updateOffice,
    getOfficeById
} from '../../../services/office.service';

const OfficeForm = ({ isViewMode = false }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        office_code: '',
        office_name: '',
        office_name_marathi: '',
        description: '',
        description_marathi: '',
        is_active: true
    });

    // 🔥 LOAD DATA (EDIT MODE)
    useEffect(() => {
        if (isEditMode) {
            fetchOffice();
        }
    }, [id]);

    const fetchOffice = async () => {
        try {
            const data = await getOfficeById(id);

            setFormData({
                office_code: data.office_code || '',
                office_name: data.office_name || '',
                office_name_marathi: data.office_name_marathi || '',
                description: data.description || '',
                description_marathi: data.description_marathi || '',
                is_active: data.is_active ?? true
            });
        } catch (error) {
            toast.error("Failed to load office");
        }
    };

    // 🔥 SUBMIT (CREATE / UPDATE)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.office_code || !formData.office_name) {
            toast.error("All required fields needed");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                office_code: formData.office_code,
                office_name: formData.office_name,
                office_name_marathi: formData.office_name_marathi,
                description: formData.description,
                description_marathi: formData.description_marathi
            };

            if (isEditMode) {
                await updateOffice(id, payload);
                toast.success("Office updated successfully");
            } else {
                await createOffice(payload);
                toast.success("Office created successfully");
            }

            navigate('/masters/office');

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
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
            {/* Office Code */}
            <Input
                label="Office Code"
                value={formData.office_code}
                onChange={(e) =>
                    setFormData((p) => ({
                        ...p,
                        office_code: e.target.value
                    }))
                }
                required
                disabled={isViewMode}
            />

            {/* Office Name */}
            <TransliteratedInput
                label="Office Name"
                value={formData.office_name}
                onChange={(e) =>
                    setFormData((p) => ({
                        ...p,
                        office_name: e.target.value
                    }))
                }
                valueMr={formData.office_name_marathi}
                onChangeMr={(e) =>
                    setFormData((p) => ({
                        ...p,
                        office_name_marathi: e.target.value
                    }))
                }
                required
                disabled={isViewMode}
            />

            {/* Description */}
            <TransliteratedInput
                label="Description"
                value={formData.description}
                onChange={(e) =>
                    setFormData((p) => ({
                        ...p,
                        description: e.target.value
                    }))
                }
                valueMr={formData.description_marathi}
                onChangeMr={(e) =>
                    setFormData((p) => ({
                        ...p,
                        description_marathi: e.target.value
                    }))
                }
                isTextArea
                disabled={isViewMode}
            />

            {/* Active */}
            <ToggleSwitch
                label="Active Status"
                checked={formData.is_active}
                onChange={(val) =>
                    setFormData((p) => ({
                        ...p,
                        is_active: val
                    }))
                }
                disabled={isViewMode}
            />
        </FormLayout>
    );
};

export default OfficeForm;