import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProject, deleteProject, editProject, getProjects } from "../services/project";
import { FieldValues } from "react-hook-form";


export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationFn: async (data) => await createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};

export const useEditProject = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { data: FieldValues; id: string }>({
    mutationFn: async ({ data, id }) => await editProject(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationFn: async (id) => {
      console.log(id)
      return await deleteProject(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};
