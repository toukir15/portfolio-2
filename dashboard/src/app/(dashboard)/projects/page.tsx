"use client";
import { useEffect, useState } from "react";
import { CustomModal } from "@/src/components/modal/CustomModal";
import { CustomTable } from "@/src/components/table/table";
import { projectColumns } from "@/src/components/table/table.const";
import {
    useCreateProject,
    useDeleteProject,
    useEditProject,
    useGetProjects,
} from "@/src/hooks/project.hook";
import { Button, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormField {
    name: string;
    label?: string;
    type: "input" | "textarea" | "file";
    validation: { required: string };
}

export default function PostManagement() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        clearErrors,
    } = useForm();

    const hookFormValues = {
        register,
        handleSubmit,
        errors,
        setValue,
        reset,
        clearErrors,
    };

    const fields: FormField[] = [
        {
            name: "name",
            label: "Name",
            type: "input",
            validation: { required: "Name is required" },
        },
        {
            name: "description",
            label: "Description",
            type: "textarea",
            validation: { required: "Description is required" },
        },
        {
            name: "live",
            label: "Live Link",
            type: "input",
            validation: { required: "Live link is required" },
        },
        {
            name: "source",
            label: "Source Code",
            type: "input",
            validation: { required: "Source code is required" },
        },
        {
            name: "image",
            type: "file",
            validation: { required: "Image is required" },
        },
    ];

    const { mutate: handleCreateProject, isSuccess } = useCreateProject();
    const { mutate: handleEditProject, isSuccess: isEditedProject } = useEditProject();
    const { mutate: handleDeleteProject, isSuccess: isDeleteProject } = useDeleteProject();

    const [editData, setEditData] = useState<any>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const onSubmit = (data: any) => {
        const formData = new FormData();
        const projectData = {
            name: data.name,
            description: data.description,
            live: data.live,
            source: data.source,
        };
        formData.append("data", JSON.stringify(projectData));
        formData.append("file", data.image);

        if (isEditMode) {
            handleEditProject({ data: formData, id: editData._id });
        } else {
            handleCreateProject(formData);
        }
    };

    useEffect(() => {
        if (isSuccess || isEditedProject) {
            onClose();
            reset();
            toast.success(
                `Project ${isEditMode ? "edited" : "created"} successfully`,
                { duration: 2000 }
            );
        }
    }, [isSuccess, isEditedProject]);

    useEffect(() => {
        if (isDeleteProject) {
            onClose();
            reset();
            toast.success(
                `Project deleted successfully`,
                { duration: 2000 }
            );
        }
    }, [isDeleteProject]);

    const { data: projectsData, isLoading: isProjectsDataLoading } =
        useGetProjects();

    const handleDelete = (data: any) => {
        handleDeleteProject(data._id)
    };

    const handleEdit = (data: any) => {
        setEditData(data);
        setIsEditMode(true);
        setValue("name", data.name);
        setValue("description", data.description);
        setValue("live", data.live);
        setValue("source", data.source);
        onOpen();
    };

    const actions = [
        {
            label: "Edit",
            onClick: handleEdit,
            className:
                "bg-green-500 hover:bg-green-600 transition duration-150 py-1 px-3 rounded text-white",
        },
        {
            label: "Delete",
            onClick: handleDelete,
            className:
                "bg-red-500 hover:bg-red-600 transition duration-150 py-1 px-3 rounded text-white",
        },
    ];

    return (
        <div className="xl:px-4 lg:px-32 mt-8 lg:mt-16">
            <div className="flex justify-end mb-4 mr-4">
                <Button
                    onPress={() => {
                        onOpen();
                        setIsEditMode(false);
                    }}
                    radius="sm"
                    className="px-8 bg-indigo-500 text-white font-medium"
                >
                    Add Project
                </Button>
            </div>
            <CustomTable
                columns={projectColumns}
                data={projectsData?.data.data || []}
                loading={isProjectsDataLoading}
                actions={actions}
                pageSize={12}
            />
            <CustomModal
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={onSubmit}
                title={isEditMode ? "Edit Project" : "Add Project"}
                fields={fields}
                hookFormValues={hookFormValues}
            />
        </div>
    );
}
