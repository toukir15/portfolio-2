"use client"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@nextui-org/react";
import { useState } from "react";
import dynamic from "next/dynamic"; // For dynamic import of next/image

// Dynamically import next/image to prevent SSR issues
const Image = dynamic(() => import("next/image"), { ssr: false });

type FormField = {
    name: string;
    label?: string;
    type: "input" | "textarea" | "file";
    validation: object;
};

interface ReusableModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    title: string;
    fields: FormField[];
    hookFormValues: any;
}

export const CustomModal = ({ isOpen, onClose, onSubmit, title, fields, hookFormValues }: ReusableModalProps) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageError, setImageError] = useState<string>("");

    const { register, handleSubmit, errors, setValue, reset, clearErrors } = hookFormValues;

    // Handle image preview and validation
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileType = file.type.split("/")[0];
            const fileSize = file.size / 1024 / 1024; // size in MB

            if (fileType !== "image") {
                setImageError("Only image files are allowed.");
                setImagePreview(null);
                return;
            }

            if (fileSize > 5) {
                setImageError("File size should be less than 5MB.");
                setImagePreview(null);
                return;
            }

            setImageError("");
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setValue("image", file, { shouldValidate: true });
            };
            reader.readAsDataURL(file);
        }
    };

    // Reset form and image preview when modal is closed
    const handleModalClose = () => {
        onClose();
        reset();
        setImagePreview(null);
        setImageError("");
        clearErrors("image");
    };

    return (
        <Modal isOpen={isOpen} size="3xl" onClose={handleModalClose}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col text-2xl text-gray-700 gap-1">{title}</ModalHeader>
                        <ModalBody>
                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                {fields.map(({ name, label, type, validation }) => (
                                    <div key={name}>
                                        {type === "input" ? (
                                            <Input label={label} {...register(name, validation)} />
                                        ) : type === "textarea" ? (
                                            <Textarea label={label} {...register(name, validation)} />
                                        ) : type === "file" ? (
                                            <div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    required
                                                    onChange={handleImageChange}
                                                    aria-label={`Upload ${label}`}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-indigo-600 file:text-gray-700 hover:file:border-indigo-700 cursor-pointer"
                                                />
                                                {imagePreview && (
                                                    <div className="mt-2">
                                                        <Image
                                                            src={imagePreview}
                                                            alt="Image Preview"
                                                            width={70}
                                                            height={70}
                                                            className="rounded"
                                                        />
                                                    </div>
                                                )}
                                                {imageError && (
                                                    <p className="text-red-500 text-sm mt-1">{imageError}</p>
                                                )}
                                                {errors[name] && (
                                                    <p className="text-red-500 text-sm">
                                                        {(errors[name]?.message as string) || `${label} is required`}
                                                    </p>
                                                )}
                                            </div>
                                        ) : null}
                                    </div>
                                ))}
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="faded" radius="sm" onPress={handleModalClose}>
                                Close
                            </Button>
                            <Button
                                onClick={handleSubmit(onSubmit)}
                                radius="sm"
                                className="bg-indigo-500 text-white font-medium"
                                disabled={!!imageError}
                            >
                                Submit
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
