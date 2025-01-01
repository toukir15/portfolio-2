"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import { IoClose } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import ReactSelect from "../ReactSelect";

interface FieldConfig {
    name: string;
    label: string;
    type: "text" | "tagSelect" | "select" | "textarea" | "file" | "editor";
    options?: { value?: string; key?: string; label: string }[];
    isMulti?: boolean;
    rules?: any;
}

interface DynamicModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    isLoading: boolean;
    onSubmit: (data: any) => void;
    fields: FieldConfig[];
    initialValues: any;
}

export const DynamicModal = ({
    isOpen,
    onClose,
    title,
    isLoading,
    onSubmit,
    fields,
    initialValues,
}: DynamicModalProps) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });

    return isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
            <div
                className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-0 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 p-[3px] hover:bg-gray-200 transition duration-200 rounded-full text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    <IoClose className="text-[20px]" />
                </button>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="border-b">
                        <h2 className="text-[22px] text-center font-semibold py-2.5 px-6">{title}</h2>
                    </div>
                    <div className="p-5">
                        {fields.map((field) => {
                            if (field.type === "text") {
                                return (
                                    <div key={field.name} className="mt-4">
                                        <Controller
                                            name={field.name}
                                            control={control}
                                            rules={field.rules}
                                            render={({ field: controllerField }) => (
                                                <Input
                                                    {...controllerField}
                                                    label={field.label}
                                                    isInvalid={!!errors[field.name]}
                                                />
                                            )}
                                        />
                                    </div>
                                );
                            }

                            if (field.type === "tagSelect") {
                                return (
                                    <div key={field.name} className="mt-4">
                                        <Controller
                                            name={field.name}
                                            control={control}
                                            rules={field.rules}
                                            render={({ field: controllerField }) => (
                                                <ReactSelect controllerField={controllerField} field={field} />
                                            )}
                                        />
                                    </div>
                                );
                            }

                            if (field.type === "select") {
                                return (
                                    <div key={field.name} className="mt-4">
                                        <Controller
                                            name={field.name}
                                            control={control}
                                            render={({ field: controllerField }) => (
                                                <Select
                                                    label={field.label}
                                                    defaultSelectedKeys={controllerField.value}
                                                    value={controllerField.value}
                                                    onChange={controllerField.onChange}
                                                    required
                                                >
                                                    {(field.options || []).map((option) => (
                                                        <SelectItem
                                                            style={{ color: "black" }}
                                                            key={option.label}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                            )}
                                        />
                                    </div>
                                );
                            }

                            if (field.type === "file") {
                                return (
                                    <div key={field.name} className="mt-5">
                                        <label
                                            htmlFor={`${field.name}-upload`}
                                            className="cursor-pointer text-center border border-indigo-500 text-indigo-500 font-medium py-2 px-4 rounded-full"
                                        >
                                            Add {field.label}
                                        </label>
                                        <input
                                            type="file"
                                            id={`${field.name}-upload`}
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setPreviewUrl(URL.createObjectURL(file));
                                                    setValue(field.name, file);
                                                }
                                            }}
                                        />
                                        {previewUrl && (
                                            <div className="mt-4">
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="w-20 h-20 object-cover rounded-md"
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            if (field.type === "editor") {
                                return (
                                    <div key={field.name} className="mt-5">
                                        <Controller
                                            name={field.name}
                                            control={control}
                                            render={({ field: controllerField }) => (
                                                <JoditEditor
                                                    ref={null}
                                                    value={controllerField.value}
                                                    onBlur={(newContent) => controllerField.onChange(newContent)}
                                                />
                                            )}
                                        />
                                    </div>
                                );
                            }

                            return null;
                        })}

                        <div className="flex justify-end mt-10 gap-4">
                            <Button
                                radius="sm"
                                className="px-8 font-medium"
                                type="button"
                                disabled={isLoading}
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                radius="sm"
                                className="px-8 bg-indigo-500 text-white font-medium"
                                type="submit"
                                isLoading={isLoading}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
};
