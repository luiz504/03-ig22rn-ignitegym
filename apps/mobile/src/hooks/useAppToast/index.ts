import { IToastProps, useToast } from 'native-base/src/components/composites'

export const useAppToast = () => {
  const toast = useToast()

  const placement: IToastProps['placement'] = 'top'

  const showError = ({ ...props }: IToastProps) =>
    toast.show({ placement, bg: 'red.500', ...props })

  const showSuccess = ({ ...props }: IToastProps) =>
    toast.show({ placement, bg: 'green.700', ...props })

  return { showError, showSuccess }
}
