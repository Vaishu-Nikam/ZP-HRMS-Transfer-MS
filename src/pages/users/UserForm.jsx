import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { getRoles } from '../../services/role.service';
import { Eye, EyeOff, Users } from 'lucide-react';
import FormLayout from '../../components/common/FormLayout';
import DropdownSearch from '../../components/common/DropdownSearch';
import ToggleSwitch from '../../components/common/ToggleSwitch';

// Base schema with common fields
const baseSchema = z.object({
    full_name: z.string().min(2, 'Name must be at least 2 characters'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    mobile_no: z
        .string()
        .optional()
        .or(z.literal(''))
        .refine((val) => {
            if (val === undefined || val === '') return true;
            return /^\d{10}$/.test(val);
        }, 'Mobile number must be exactly 10 digits'),
    role_id: z.coerce.number().min(1, 'Please select a valid role'),
    is_active: z.boolean().optional(),
});

// Schema for adding a new user (password required)
const addUserSchema = baseSchema.extend({
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Schema for editing a user (password optional)
const editUserSchema = baseSchema.extend({
    password: z.string().optional().or(z.literal('')),
});

export const UserForm = ({
    initialData,
    isViewMode = false,
    onSubmit,
    isLoading,
    title
}) => {
    const navigate = useNavigate();
    const [roles, setRoles] = React.useState([]);
    const [showPassword, setShowPassword] = React.useState(false);
    const isEditMode = !!initialData;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        watch,
    } = useForm({
        resolver: zodResolver(isEditMode ? editUserSchema : addUserSchema),
        defaultValues: {
            full_name: '',
            username: '',
            email: '',
            mobile_no: '',
            password: '',
            role_id: initialData?.role_id != null
                ? Number(initialData.role_id)
                : initialData?.role?.role_id != null
                    ? Number(initialData.role.role_id)
                    : undefined,
            is_active: true,
            ...initialData,
        },
    });

    useEffect(() => {
        const loadRoles = async () => {
            const data = await getRoles();
            // Handle both array [] and object { roles: [] } response types from API
            const rolesList = Array.isArray(data) ? data : (data.roles || []);
            setRoles(rolesList);
        };
        loadRoles();
    }, []);

    useEffect(() => {
        if (initialData) {
            // Ensure password is reset to empty string on edit load so validation works
            // Also ensure role_id is correctly set if it comes as a nested object or string
            const formData = {
                ...initialData,
                role_id: initialData.role_id != null
                    ? Number(initialData.role_id)
                    : initialData.role?.role_id != null
                        ? Number(initialData.role.role_id)
                        : undefined,
                password: ''
            };
            if (formData.role_id !== undefined && formData.role_id !== null) {
                formData.role_id = Number(formData.role_id);
            }
            reset(formData);
        }
    }, [initialData, reset]);

    // Debug role binding
    const currentRoleId = watch('role_id');
    useEffect(() => {
        if (isEditMode) {
            console.debug('UserForm role debug', {
                initialRoleId: initialData?.role_id || initialData?.role?.role_id,
                currentRoleId,
                rolesLoaded: roles.length,
            });
        }
    }, [currentRoleId, initialData, isEditMode, roles.length]);

    const handleFormSubmit = (data) => {
        // If in edit mode and password is empty, remove it from the payload
        if (isEditMode && !data.password) {
            const { password, ...rest } = data;
            onSubmit(rest);
        } else {
            onSubmit(data);
        }
    };

    return (
        <FormLayout
            title="User"
            icon={Users}
            onSubmit={handleSubmit(handleFormSubmit)}
            onCancel={() => navigate('/users')}
            isEditMode={isEditMode}
            isViewMode={isViewMode}
            loading={isLoading}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Input
                    label="Full Name"
                    placeholder="John Doe"
                    error={errors.full_name?.message}
                    disabled={isViewMode}
                    {...register('full_name')}
                />

                <Input
                    label="Username"
                    placeholder="johndoe"
                    error={errors.username?.message}
                    disabled={isViewMode}
                    {...register('username')}
                />

                <Input
                    label="Email Address"
                    placeholder="john@example.com"
                    type="email"
                    error={errors.email?.message}
                    disabled={isViewMode}
                    {...register('email')}
                />

                <Input
                    label={isEditMode ? "Password (leave blank to keep)" : "Password"}
                    placeholder={isEditMode ? "********" : "Enter password"}
                    type={showPassword ? "text" : "password"}
                    endIcon={!isViewMode && (showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />)}
                    onEndIconClick={() => !isViewMode && setShowPassword(!showPassword)}
                    error={errors.password?.message}
                    disabled={isViewMode}
                    {...register('password')}
                />

                <Input
                    label="Mobile Number"
                    placeholder="9876543210"
                    error={errors.mobile_no?.message}
                    disabled={isViewMode}
                    inputMode="numeric"
                    maxLength={10}
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    }}
                    {...register('mobile_no')}
                />

                <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Role</label>
                    <Controller
                        name="role_id"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <DropdownSearch
                                value={value}
                                onChange={(e) => onChange(Number(e.target.value))}
                                options={roles.map(r => ({ id: r.role_id, name: r.role_name }))}
                                placeholder="Select Role"
                                disabled={isViewMode}
                            />
                        )}
                    />
                    {errors.role_id && <p className="mt-1 text-sm text-red-500">{errors.role_id.message}</p>}
                </div>
            </div>

            {/* Active Status */}
            <Controller
            name="is_active"
            control={control}
            render={({ field: { value, onChange } }) => (
                <ToggleSwitch
                    label="Active Status"
                    description={value ? 'User is currently active' : 'User is currently inactive'}
                    checked={!!value}
                    onChange={onChange}
                    disabled={isViewMode}
                />
            )}
/>
        </FormLayout>
    );
};