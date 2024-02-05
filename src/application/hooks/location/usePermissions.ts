import { useCallback, useEffect, useState } from 'react';

export function usePermissions(name: PermissionName) {
  const [permissionState, setPermissionState] = useState<
    PermissionState | 'error'
  >();

  const handlePermission = useCallback(() => {
    navigator.permissions
      .query({ name })
      .then((result) => {
        setPermissionState(result.state);
      })
      .catch(() => {
        setPermissionState('error');
      });
  }, []);

  useEffect(() => {
    handlePermission();
  }, []);

  return { permissionState };
}
