import Toast from 'react-native-toast-message';

export const showToast = (type = 'info', message = 'Something happened') => {
  Toast.show({
    type: 'custom_toast',
    props: {
      type,
      message,
    },
    position: 'bottom',
    visibilityTime: 3000,
    autoHide: true,
  });
};
