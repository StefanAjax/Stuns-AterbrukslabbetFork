import { useState } from "react";

type DeleteFn<T> = () => Promise<T>;
type SuccessCallback = () => void;
type ErrorCallback = (error: { message: string }) => void;

export function useDeleteHandler<T>(deleteFn: DeleteFn<T>, onSuccess: SuccessCallback, onError: ErrorCallback) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await deleteFn();
      onSuccess();
      return result;
    } catch (error) {
      onError(error as { message: string });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleDelete, isLoading };
}
