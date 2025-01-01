import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createSkill, deleteSkill, editSkill, getSkills } from "../services/skill";


export const useGetSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationFn: async (data) => await createSkill(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skills"],
      });
    },
  });
};

export const useEditSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: any) => await editSkill(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skills"],
      });
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationFn: async (id) => {
      return await deleteSkill(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skills"],
      });
    },
  });
};
