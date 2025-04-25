import toast from 'react-hot-toast';

export const makeToastSucess = (text: string) => {
  toast.success(text, {
    style: {
      borderRadius: '2px',
      background: '#fff',
      color: '#333',
    },
  });
};

export const makeToastError = (text: string) => {
  toast.error(text, {
    style: {
      borderRadius: '2px',
      background: '#fff',
      color: '#333',
    },
  });
};
