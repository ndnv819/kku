export const getColor = (
  status: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger',
  appearances: 'filled' | 'outline' | 'ghost',
) => {
  const baseColor = {
    basic: {
      filled: 'bg-basic-300 text-[#222b45]',
      outline: 'bg-basic-transparent-8 border border-basic-600 text-[#8f9bb3]',
      ghost: 'text-basic-800',
    },
    primary: {
      filled: 'bg-primary-500 text-basic-100',
      outline: 'border border-primary-500 text-primary-500',
      ghost: 'text-primary-500',
    },
    success: {
      filled: 'bg-success-500 text-basic-100',
      outline:
        'bg-success-transparent-8 border border-success-500 text-success-500',
      ghost: 'text-success-500',
    },
    info: {
      filled: 'bg-info-500 text-basic-100',
      outline: 'bg-info-transparent-8 border border-info-500 text-info-500',
      ghost: 'text-info-500',
    },
    warning: {
      filled: 'bg-warning-500 text-basic-100',
      outline:
        'bg-warning-transparent-8 border border-warning-500 text-warning-500',
      ghost: 'text-warning-500',
    },
    danger: {
      filled: 'bg-danger-500 text-basic-100',
      outline:
        'bg-danger-transparent-8 border border-danger-500 text-danger-500',
      ghost: 'text-danger-500',
    },
  };

  return baseColor[status][appearances];
};
