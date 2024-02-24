import { useQuery, useMutation, useQueryClient } from 'react-query';

export function useRequestProcessor() {
  const queryClient = useQueryClient();

  function query<TData, TError>(key: string, queryFunction: () => Promise<TData>, options = {}) {
    return useQuery<TData, TError>({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    });
  }

  function mutate<TData, TError>(key: string, mutationFunction: () => Promise<TData>, options = {}) {
    return useMutation<TData, TError>({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () => queryClient.invalidateQueries(key),
      ...options,
    });
  }

  return { query, mutate };
}
