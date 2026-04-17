import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { PORTFOLIO_ABI, type Project } from '@/lib/abi';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}` | undefined;

export function useProjects() {
  const { data, isLoading, isError, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: PORTFOLIO_ABI,
    functionName: 'getAllProjects',
  });

  return {
    projects: (data as Project[] | undefined) ?? [],
    isLoading,
    isError,
    refetch,
  };
}

export function useContractOwner() {
  const { data } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: PORTFOLIO_ABI,
    functionName: 'owner',
  });
  return data as `0x${string}` | undefined;
}

export function useIsOwner() {
  const { address } = useAccount();
  const owner = useContractOwner();
  if (!address || !owner) return false;
  return address.toLowerCase() === owner.toLowerCase();
}

export function useAddProject() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  function addProject(name: string, description: string, url: string) {
    writeContract({
      address: CONTRACT_ADDRESS!,
      abi: PORTFOLIO_ABI,
      functionName: 'addProject',
      args: [name, description, url],
    });
  }

  return { addProject, isPending, isConfirming, isSuccess, error };
}

export function useRemoveProject() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  function removeProject(id: bigint) {
    writeContract({
      address: CONTRACT_ADDRESS!,
      abi: PORTFOLIO_ABI,
      functionName: 'removeProject',
      args: [id],
    });
  }

  return { removeProject, isPending, isConfirming, isSuccess, error };
}
