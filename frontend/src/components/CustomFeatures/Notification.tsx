// src/components/Notification.tsx
import React, { forwardRef, useImperativeHandle } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const NotificationWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

interface NotificationProps {
    message?: string;
    type?: 'default' | 'success' | 'error' | 'warning' | 'info';
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
            switch (type) {
                case 'success':
                    toast.success(message);
                    break;
                case 'error':
                    toast.error(message);
                    break;
                case 'warning':
                    toast.warning(message);
                    break;
                case 'info':
                    toast.info(message);
                    break;
                default:
                    toast(message);
                    break;
            }
        }
    }));

    return (
        <NotificationWrapper>
            <ToastContainer position="bottom-right" autoClose={closeTime} />
        </NotificationWrapper>
    );
};

export default forwardRef(Notification);
