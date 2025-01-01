"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { FieldValues } from "react-hook-form";

export const getSkills = async () => {
  try {
    const { data } = await axiosInstance.get("/skill");
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createSkill = async (skillData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/skill", skillData);
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const editSkill = async (skillData: FieldValues, id?: string) => {
  try {
    const { data } = await axiosInstance.patch(`/skill/${id}`, skillData);
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteSkill = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/skill/${id}`);
    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};


