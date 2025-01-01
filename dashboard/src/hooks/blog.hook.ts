import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProject, deleteProject, editProject, getProjects } from "../services/project";
import { FieldValues } from "react-hook-form";
import { createBlog, deleteBlog, editBlog, getBlogs } from "../services/blog";


export const useGetBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationFn: async (data) => await createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });
};

export const useEditBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: any) => await editBlog(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationFn: async (id) => {
      return await deleteBlog(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });
};
