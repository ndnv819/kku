import { useCallback, useEffect, useMemo, useState } from 'react';

interface GeolocationState {
  isLoading: boolean;
  error?: string;
  data?: GeolocationPosition;
}

const geolocationNotSupportedError = 'GPS 기능을 지원하지 않는 브라우저입니다';

export function useGeolocation() {
  const [location, setLocation] = useState<GeolocationState>({
    isLoading: false,
  });
  const [watchId, setWatchId] = useState<number | undefined>(undefined);

  const isGeolocationAvailable = useMemo((): boolean => {
    // eslint-disable-next-line
    return (
      typeof navigator !== 'undefined' && navigator.geolocation !== undefined
    );
  }, []);

  const updateGeolocationData = useCallback(
    (newPosition: GeolocationPosition): void => {
      setLocation({ isLoading: false, data: newPosition });
    },
    [],
  );

  const updateGeolocationError = useCallback(
    (newError: string | GeolocationPositionError): void => {
      setLocation({
        isLoading: false,
        // @ts-ignore; 'newError instanceof Erro' 구문이 GeolocationPositionError 체크를 해주지 않기때문에 발생하는 오류임
        // 실제로 문제가 없는 코드기때문에 ignore함
        error: newError instanceof Error ? newError.message : newError,
      });
    },
    [],
  );

  const getCurrentPosition = useCallback((): void => {
    setLocation({ isLoading: true });
    navigator.geolocation.getCurrentPosition(
      updateGeolocationData,
      updateGeolocationError,
    );
  }, []);

  const watchPosition = useCallback((): void => {
    setLocation({ isLoading: true });
    const id = navigator.geolocation.watchPosition(
      updateGeolocationData,
      updateGeolocationError,
    );
    setWatchId(id);
  }, []);

  const clearWatch = useCallback((): void => {
    if (!watchId) {
      return;
    }

    navigator.geolocation.clearWatch(watchId);
    setWatchId(undefined);
  }, [watchId]);

  useEffect(() => {
    if (!isGeolocationAvailable) {
      updateGeolocationError(geolocationNotSupportedError);
      return () => {};
    }

    return () => {
      if (watchId) {
        clearWatch();
      }
    };
  }, [watchId]);

  return {
    isGeolocationAvailable,
    getCurrentPosition,
    watchPosition,
    clearWatch,
    location,
  };
}
