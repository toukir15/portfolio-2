import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "../services/social/mutation";
import { FormValues } from "../components/contact/ContactForm";

export const useSendEmail = () => {
    return useMutation({
        mutationFn: (data: FormValues) => sendEmail(data),
    });
};
