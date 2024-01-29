import { useCallback, useEffect, useState } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState<{
    isLoading: boolean;
    errorMessage: string;
    coords?: {
      latitude: number;
      longitude: number;
    };
  }>({ isLoading: false, errorMessage: '', coords: undefined });

  // only success
  const handleSuccess = useCallback((position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setLocation({
      isLoading: false,
      errorMessage: '',
      coords: { latitude, longitude },
    });
  }, []);

  // only failure
  const handleError = useCallback((positionError: GeolocationPositionError) => {
    setLocation({
      isLoading: false,
      errorMessage: positionError.message,
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
        isLoading: false,
        errorMessage: 'no navigator',
        coords: undefined,
      });
    }

    handleCurrentPosition();
  }, [handleCurrentPosition]);

  return {
    location,
  };
}
