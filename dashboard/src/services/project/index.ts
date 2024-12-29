"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { FieldValues } from "react-hook-form";

export const getProjects = async () => {
  try {
    const { data } = await axiosInstance.get("/project");
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createProject = async (projectData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/project", projectData);
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const editProject = async (projectData: FieldValues, id: string) => {
  try {
    const { data } = await axiosInstance.patch(`/project/${id}`, projectData);
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteProject = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/project/${id}`);
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};


