import { useEffect, useState } from 'react';

export function usePermission(permissionName: PermissionName) {
  const [permissionStatus, setPermissionStatus] = useState<
    PermissionState | 'unsupported'
  >('prompt');

  useEffect(() => {
    if (!navigator.permissions) {
      setPermissionStatus('unsupported');
      return;
    }

    navigator.permissions
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
