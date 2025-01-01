"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { FieldValues } from "react-hook-form";

export const getBlogs = async () => {
  try {
    const { data } = await axiosInstance.get("/blog");
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createBlog = async (blogData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/blog", blogData);
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const editBlog = async (blogData: FieldValues, id?: string) => {
  try {
    const { data } = await axiosInstance.patch(`/blog/${id}`, blogData);
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/blog/${id}`);
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};


