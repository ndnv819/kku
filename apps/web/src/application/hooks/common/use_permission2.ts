import { useCallback, useEffect, useState } from 'react';

export function usePermission(name: PermissionName) {
  const [permissionState, setPermissionState] = useState<
    PermissionState | 'error'
  >();

  const handlePermission = useCallback(() => {
    if (!window.navigator) {
      return;
    }

    window.navigator.permissions
      .query({ name })
      .then((result) => {
        setPermissionState(result.state);
      })
      .catch(() => {
        setPermissionState('error');
      });
  }, []);

  useEffect(() => {
    if (!window.navigator) {
      return;
    }

    handlePermission();
  }, []);

  return { permissionState };
}
