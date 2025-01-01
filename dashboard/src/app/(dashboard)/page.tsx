"use client";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { IUserProviderValues, UserContext } from "@/src/context/user.provider";
import { useEditProfile } from "@/src/hooks/auth.hook";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { CustomModal } from "@/src/components/modal/CustomModal";
import ProfileHeader from "@/src/components/profile/ProfileHeader";
import AboutMeSection from "@/src/components/profile/AboutMeSection";

// Form Fields
interface FormField {
  name: string;
  label?: string;
  type: "input" | "textarea" | "file";
  validation: { required: string };
}

const fields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "input",
    validation: { required: "Name is required" },
  },
  {
    name: "designation",
    label: "Designation",
    type: "input",
    validation: { required: "Designation is required" },
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    validation: { required: "Description is required" },
  },
  {
    name: "address",
    label: "Address",
    type: "input",
    validation: { required: "Address is required" },
  },
  {
    name: "image",
    type: "file",
    validation: { required: "Image is required" },
  },
];

const ProfileView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, formState: { errors }, setValue, reset, clearErrors, control } = useForm();
  const { user } = useContext(UserContext) as IUserProviderValues;
  const { mutate: handleEditProfile, isSuccess: isEditProfileSuccess, isError: isEditProfileError, data } = useEditProfile();
  // Decoded user state


  const [decodedUser, setDecodedUser] = useState<{} | null>(null);


  useEffect(() => {
    if (data?.accessToken) {
      const decodedData = jwtDecode(data?.accessToken);
      setDecodedUser(decodedData);
    }
  }, [data?.accessToken]);

  // Memoized profile data
  const profileData: any = useMemo(() => decodedUser ?? user, [decodedUser, user]);

  // Handle profile form submission
  const onSubmit = (data: any) => {
    const formData = new FormData();
    const profileData = {
      name: data.name,
      description: data.description,
      designation: data.designation,
      address: data.address,
    };
    formData.append("data", JSON.stringify(profileData));
    formData.append("file", data.image);
    handleEditProfile(formData);
  };

  useEffect(() => {
    if (isEditProfileSuccess) {
      onClose();
      toast.success("Profile edited successfully!");
    }
    if (isEditProfileError) {
      toast.error("Error updating profile. Please try again.");
    }
  }, [isEditProfileSuccess, isEditProfileError]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  // Handle profile edit modal
  const handleEdit = (data: any) => {
    setValue("name", data.name);
    setValue("description", data.description);
    setValue("designation", data.designation);
    setValue("address", data.address);
    onOpen();
  };

  return (
    <div className="w-full bg-gray-100">
      {/* Profile Header */}
      <ProfileHeader
        profilePhoto={profileData?.profilePhoto}
        name={profileData?.name}
        designation={profileData?.designation}
        description={profileData?.description}
        onEdit={() => handleEdit(profileData)}
      />
      <AboutMeSection />


      {/* Profile Edit Modal */}
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        title={"Edit Profile"}
        fields={fields}
        hookFormValues={{ register, handleSubmit, errors, setValue, reset, clearErrors, control }}
      />
    </div>
  );
};

export default ProfileView;
