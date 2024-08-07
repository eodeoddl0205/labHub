// src/components/Notification.tsx
import React, { forwardRef, useImperativeHandle } from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NotificationProps {
    closeTime?: number;
}

export interface NotificationRef {
    notify: (message: string, type?: 'default' | 'success' | 'error' | 'warning' | 'info') => void;
}

const Notification: React.ForwardRefRenderFunction<NotificationRef, NotificationProps> = (
    { closeTime = 5000 },
    ref
) => {
    useImperativeHandle(ref, () => ({
        notify: (message: string, type?: 'default' | 'success' | 'error' | 'warning' | 'info') => {
            const options: ToastOptions = { autoClose: closeTime };
            switch (type) {
                case 'success':
                    toast.success(message, options);
                    break;
                case 'error':
                    toast.error(message, options);
                    break;
                case 'warning':
                    toast.warning(message, options);
                    break;
                case 'info':
                    toast.info(message, options);
                    break;
                default:
                    toast(message, options);
                    break;
            }
        }
    }));

    return (
        <ToastContainer position="bottom-right" autoClose={closeTime} />
    );
};

export default forwardRef(Notification);