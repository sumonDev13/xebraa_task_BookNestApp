import { toast as hotToast } from 'react-hot-toast';

export const toast = {
  success: (message: string) => {
    hotToast.success(message, {
      position: 'top-right',
      duration: 3000,
      style: {
        background: '#4CAF50',
        color: 'white',
        padding: '12px',
        borderRadius: '8px'
      }
    });
  },
  error: (message: string) => {
    hotToast.error(message, {
      position: 'top-right',
      duration: 3000,
      style: {
        background: '#F44336',
        color: 'white',
        padding: '12px',
        borderRadius: '8px'
      }
    });
  },
  custom: (message: string, type: 'info' | 'warning' = 'info') => {
    const backgroundColor = type === 'info' ? '#2196F3' : '#FF9800';
    hotToast(message, {
      position: 'top-right',
      duration: 3000,
      style: {
        background: backgroundColor,
        color: 'white',
        padding: '12px',
        borderRadius: '8px'
      }
    });
  }
};
