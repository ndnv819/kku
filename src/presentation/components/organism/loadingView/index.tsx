import { DefaultLoader } from '@presentation/components/atoms/loader';

export function LoadingView(): JSX.Element {
  return (
    <div className="flex h-screen items-center justify-center">
      <DefaultLoader />
    </div>
  );
}
