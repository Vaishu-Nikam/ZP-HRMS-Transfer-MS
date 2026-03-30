import { useState, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { logout } from '../../../redux/slices/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export const useHeader = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const getBreadcrumb = () => {
        const parts = location.pathname.replace(/^\//, '').split('/');
        return parts
            .filter(Boolean)
            .map((p) =>
                p.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
            )
            .join(' › ');
    };

    const userInitial = user?.full_name
        ? user.full_name.charAt(0).toUpperCase()
        : 'A';

    return {
        user,
        isProfileOpen,
        setIsProfileOpen,
        dropdownRef,
        handleLogout,
        getBreadcrumb,
        userInitial,
        navigate
    };
};