"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  tagline: string;
  description: string;
}

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form Data Submitted:", data);
    // Perform your API call or any logic here
    onClose(); // Close the modal after submission
    reset(); // Reset the form
  };

  return (
    <>
      <div className="flex justify-center items-center h-[calc(100vh-300px)] flex-wrap gap-3">
        <Button
          radius="sm"
          color="primary"
          className=" font-medium text-lg text-white"
          onPress={() => onOpen()}
        >
          Add your profile details
        </Button>
      </div>
      <Modal isOpen={isOpen} size={"3xl"} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-2xl text-gray-700 gap-1 ">
                Add Profile Details
              </ModalHeader>
              <ModalBody>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  {/* Name Field */}
                  <div>
                    <Input
                      label="Name"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Tagline Field */}
                  <div>
                    <Input
                      label="Tagline"
                      {...register("tagline", { required: "Tagline is required" })}
                    />
                    {errors.tagline && (
                      <p className="text-red-500 text-sm">{errors.tagline.message}</p>
                    )}
                  </div>

                  {/* Description Field */}
                  <div>
                    <Textarea
                      label="Description"
                      {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onPress={() => handleSubmit(onSubmit)()}
                  radius="sm"
                  color="primary"
                >
                  Submit
                </Button>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
