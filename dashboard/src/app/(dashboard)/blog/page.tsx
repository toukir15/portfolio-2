"use client";

import { CustomTable } from "@/src/components/table/table";
import { blogColumns } from "@/src/components/table/table.const";
import { useGetBlogs, useCreateBlog, useEditBlog, useDeleteBlog } from "@/src/hooks/blog.hook";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { DynamicModal } from "@/src/components/blog/CustomBlogModal";
import { toast } from "sonner";

interface BlogFormData {
    _id?: string;
    title: string;
    category: { value: string; label: string }[];
    content: string;
    image: File | null;
}

export default function BlogManagement() {
    const { data: blogsData, isLoading: isBlogsDataLoading } = useGetBlogs();
    const { mutate: handleCreateBlog, isSuccess: createBlogSuccess } = useCreateBlog();
    const { mutate: handleEditBlog, isSuccess: editBlogSuccess } = useEditBlog();
    const { mutate: handleDeleteBlog, isSuccess: deleteBlogSuccess } = useDeleteBlog();
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentBlog, setCurrentBlog] = useState<BlogFormData | null>(null);
    const [isLoading, setIsLoading] = useState(false)

    const openCreateModal = () => {
        setCurrentBlog(null);
        setModalOpen(true);
    };

    const openEditModal = (blog: any) => {
        setCurrentBlog({
            _id: blog._id,
            title: blog.title,
            category: blog.category.map((c: string) => ({ value: c, label: c })),
            content: blog.content,
            image: null,
        });
        setModalOpen(true);
    };

    const onSubmit = (data: BlogFormData) => {
        setIsLoading(true)
        const categories = data.category.map((c) => c.label);
        const blogData = {
            title: data.title,
            category: categories,
            content: data.content,
        };
        const formData = new FormData();
        formData.append("data", JSON.stringify(blogData));
        if (data.image) {
            formData.append("file", data.image);
        }
        currentBlog ? handleEditBlog({ data: formData, id: currentBlog._id }) : handleCreateBlog(formData);
    };

    useEffect(() => {
        if (createBlogSuccess) {
            toast.success(`Created blog successfully`, { duration: 2000 })
        }
        if (editBlogSuccess) {
            toast.success(`Edited blog successfully`, { duration: 2000 })
        }
        if (deleteBlogSuccess) {
            toast.success(`Deleted blog successfully`, { duration: 2000 })
        }
        setIsLoading(false)
        setModalOpen(false);
    }, [createBlogSuccess, editBlogSuccess, deleteBlogSuccess])

    const handleDelete = (id: string) => {
        handleDeleteBlog(id)
    }

    const actions = [
        {
            label: "Edit",
            onClick: openEditModal,
            className: "bg-yellow-500 hover:bg-yellow-600 transition duration-150 py-1 px-3 rounded text-white",
        },
        {
            label: "Delete",
            onClick: (data: any) => handleDelete(data._id),
            className: "bg-red-500 hover:bg-red-600 transition duration-150 py-1 px-3 rounded text-white",
        },
    ];

    return (
        <div className="xl:px-4 lg:px-32 mt-8 lg:mt-16">
            <div className="flex justify-end mb-4 mr-4">
                <Button
                    radius="sm"
                    className="px-8 mt-8 lg:mt-0 bg-indigo-500 text-white font-medium"
                    onClick={openCreateModal}
                >
                    Add Blog
                </Button>
            </div>

            {/* Loading State for Blog Data */}
            {isBlogsDataLoading ? (
                <div className="flex justify-center items-center mt-10">
                    <span className="text-gray-500">Loading blogs...</span>
                </div>
            ) : (
                <CustomTable
                    columns={blogColumns}
                    data={blogsData?.data.data || []}
                    loading={isBlogsDataLoading}
                    actions={actions}
                    pageSize={12}
                />
            )}

            {/* Blog Modal */}
            <DynamicModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                title="Create Blog"
                isLoading={isLoading}
                onSubmit={onSubmit}
                fields={[
                    { name: "title", label: "Title", type: "text", rules: { required: "Title is required" } },
                    {
                        name: "category",
                        label: "Category",
                        type: "tagSelect",
                        options: [
                            { value: "html", label: "HTML" },
                            { value: "css", label: "CSS" },
                            { value: "javascript", label: "JavaScript" },
                            { value: "react", label: "React" },
                            { value: "nodejs", label: "Node.js" },
                            { value: "express", label: "Express" },
                            { value: "mongodb", label: "MongoDB" },
                            { value: "graphql", label: "GraphQL" },
                            { value: "typescript", label: "TypeScript" },
                            { value: "tailwindcss", label: "Tailwind CSS" },
                            { value: "webpack", label: "Webpack" },
                            { value: "api", label: "API Development" },
                            { value: "frontend", label: "Frontend Development" },
                            { value: "backend", label: "Backend Development" },
                            { value: "fullstack", label: "Fullstack Development" },
                            { value: "webperformance", label: "Web Performance" },
                            { value: "seo", label: "SEO" },
                            { value: "testing", label: "Testing" },
                            { value: "devops", label: "DevOps" },
                        ],
                        isMulti: true,
                    },
                    { name: "image", label: "Image", type: "file" },
                    { name: "content", label: "Content", type: "editor" },
                ]}
                initialValues={{
                    title: "",
                    category: [],
                    content: "",
                    image: null,
                }}
            />
        </div>
    );
}

