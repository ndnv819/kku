import { useCallback, useEffect, useState } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState<{
    errorMessage: string;
    isLoading: boolean;
    coords?: {
      latitude: number;
      longitude: number;
    };
  }>({ errorMessage: '', isLoading: false, coords: undefined });

  // only success
  const handleSuccess = useCallback((position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setLocation({
      errorMessage: '',
      isLoading: false,
      coords: { latitude, longitude },
    });
  }, []);

  // only failure
  const handleError = useCallback((positionError: GeolocationPositionError) => {
    setLocation({
      errorMessage: positionError.message,
      isLoading: false,
      coords: undefined,
    });
  }, []);

  // only request
  const handleCurrentPosition = useCallback(() => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      isLoading: true,
    }));
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        errorMessage: 'no navigator',
        isLoading: false,
        coords: undefined,
      });
    }

    handleCurrentPosition();
  }, [handleCurrentPosition]);

  return {
    location,
  };
}
