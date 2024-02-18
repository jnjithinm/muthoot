import {APP_FONTS} from 'config/Fonts';
import {MessageOptions, showMessage} from 'react-native-flash-message';

const useShowFlashMessage = (
  type: 'success' | 'warning',
  message: string,
  duration?: number,
) => {
  let Options: MessageOptions;
  const successOptions = {
    message,
    backgroundColor: '#577D20',
    color: '#fff',
    titleStyle: {
      fontFamily: APP_FONTS.Bold,
    },
  };

  const errorOptions = {
    message,
    backgroundColor: '#831741',
    color: '#fff',
    duration: duration || 3000,
    titleStyle: {
      fontFamily: APP_FONTS.Bold,
    },
  };
  type === 'warning' ? (Options = errorOptions) : (Options = successOptions);
  showMessage(Options);
};

export default useShowFlashMessage;
