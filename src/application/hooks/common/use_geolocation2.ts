import { useCallback, useState } from 'react';

interface Geolocation {
  isLoading: boolean;
  error?: GeolocationPositionError;
  data?: GeolocationPosition;
}

export function useGeolocation() {
  const [location, setLocation] = useState<Geolocation>({
    isLoading: false,
  });

  // only success
  const handleSuccess = useCallback((position: GeolocationPosition) => {
    setLocation({
      isLoading: false,
      error: undefined,
      data: position,
    });
  }, []);

  // only failure
  const handleError = useCallback((positionError: GeolocationPositionError) => {
    setLocation({
      isLoading: false,
      error: positionError,
      data: undefined,
    });
  }, []);

  // only request
  const getCurrentPosition = useCallback(() => {
    if (!window.navigator) {
      return;
    }

    setLocation((prevLocation) => ({
      ...prevLocation,
      isLoading: true,
    }));

    window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return {
    location,
    getCurrentPosition,
  };
}
