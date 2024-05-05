import { useEffect, useState } from 'react';

export function usePermission(permissionName: PermissionName) {
  const [permissionStatus, setPermissionStatus] = useState<
    PermissionState | 'unsupported'
  >('prompt');

  useEffect(() => {
    if (!window.navigator) {
      return;
    }
    if (!window.navigator.permissions) {
      setPermissionStatus('unsupported');
      return;
    }

    window.navigator.permissions
      .query({ name: permissionName })
      .then((result) => {
        setPermissionStatus(result.state);

        result.onchange = () => {
          setPermissionStatus(result.state);
        };
      })
      .catch(() => {
        setPermissionStatus('denied');
      });
  }, [permissionName]);

  return { permissionStatus };
}
