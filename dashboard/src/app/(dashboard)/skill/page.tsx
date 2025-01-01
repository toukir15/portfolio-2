"use client";

import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { DynamicModal } from "@/src/components/blog/CustomBlogModal";
import { toast } from "sonner";
import {
    useCreateSkill,
    useDeleteSkill,
    useEditSkill,
    useGetSkills,
} from "@/src/hooks/skill.hook";
import { showConfirmation } from "@/src/utils/showConfirmation";

interface skillFormData {
    _id?: string;
    name: string;
    category: { value?: string; key?: string; label: string }[];
    image: File | null;
}

export default function BlogManagement() {
    const { data: skillsData, isLoading: isSkillsDataLoading } = useGetSkills();
    const { mutate: handleCreateSkill, isSuccess: createSkillSuccess, isError: createSkillError } = useCreateSkill();
    const { mutate: handleEditSkill, isSuccess: editSkillSuccess, isError: editSkillError } = useEditSkill();
    const { mutate: handleDeleteSkill, isSuccess: deleteSkillSuccess, isError: deleteSkillError } = useDeleteSkill();

    const [isModalOpen, setModalOpen] = useState(false);
    const [currentSkill, setCurrentSkill] = useState<skillFormData | null>(null);
    const [isSubmitting, setSubmitting] = useState(false);

    const openCreateModal = () => {
        setCurrentSkill(null); // Reset skill data for create mode
        setModalOpen(true);
    };
    const openEditModal = (data: skillFormData) => {
        setCurrentSkill({
            _id: data._id,
            name: data.name,
            category: data.category,
            image: null, // If you don't want to prefill the image field
        });
        setModalOpen(true);
    };

    const onSubmit = async (data: skillFormData) => {
        setSubmitting(true);
        const skillData = {
            name: data.name,
            category: data.category,
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(skillData));
        if (data.image) formData.append("file", data.image);

        currentSkill
            ? handleEditSkill({ data: formData, id: currentSkill._id })
            : handleCreateSkill(formData);

        setSubmitting(false);
    };

    useEffect(() => {
        if (createSkillSuccess || editSkillSuccess || deleteSkillSuccess) {
            toast.success("Operation completed successfully!");
            setModalOpen(false);
        }

        if (createSkillError || editSkillError || deleteSkillError) {
            toast.error("An error occurred. Please try again.");
        }
    }, [createSkillSuccess, editSkillSuccess, deleteSkillSuccess, createSkillError, editSkillError, deleteSkillError]);

    const handleDelete = (id: string) => {
        showConfirmation(
            "Delete",
            "Are you sure you want to delete this skill?",
            () => handleDeleteSkill(id)
        );
    };

    const RSkillData = skillsData?.data?.data;

    return (
        <div className="xl:px-4 lg:px-32 mt-8 lg:mt-16">
            <div className="flex justify-end mb-4 mr-4">
                <Button
                    radius="sm"
                    className="px-8 mt-8 lg:mt-0 bg-indigo-500 text-white font-medium"
                    onClick={openCreateModal}
                >
                    Add Skill
                </Button>
            </div>

            <div className="container mx-auto p-6">
                {RSkillData ? (
                    Object.keys(RSkillData).map((category) => (
                        <div key={category} className="my-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                {category}
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {RSkillData[category]?.map((item: any) => (
                                    <div
                                        key={item._id}
                                        className="bg-white p-3 rounded-lg shadow-sm transition-all duration-200 ease-in-out w-fit"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-lg mb-3"
                                        />
                                        <div className="text-center">
                                            <h3 className="text-sm font-medium text-gray-800 mb-2">
                                                {item.name}
                                            </h3>
                                            <div className="flex justify-center gap-2 mt-3">
                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className="bg-gray-200 text-gray-700 px-3 py-1 text-xs rounded-md hover:bg-gray-300 transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="bg-red-100 text-red-600 px-3 py-1 text-xs rounded-md hover:bg-red-200 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">Loading skills data...</div>
                )}
            </div>

            <DynamicModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                title={currentSkill ? "Edit Skill" : "Create Skill"}
                isLoading={isSubmitting}
                onSubmit={onSubmit}
                fields={[
                    { name: "name", label: "Name", type: "text", rules: { required: "Name is required" } },
                    {
                        name: "category",
                        label: "Category",
                        type: "select",
                        options: [
                            { key: "Languages", label: "Languages" },
                            { key: "Frontend", label: "Frontend" },
                            { key: "Backend", label: "Backend" },
                            { key: "Database", label: "Database" },
                            { key: "Authentication", label: "Authentication" },
                            { key: "Api", label: "Api" },
                            { key: "Devops", label: "Devops" },
                            { key: "Payment", label: "Payment" },
                        ],
                        rules: { required: "Category is required" },
                    },
                    { name: "image", label: "Image", type: "file" },
                ]}
                initialValues={
                    currentSkill || {
                        name: "",
                        category: [],
                        content: "",
                        image: null,
                    }
                }
            />

        </div>
    );
}
