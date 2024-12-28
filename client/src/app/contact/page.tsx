import ContactForm from "@/src/components/contact/ContactForm";
import SocialLink from "@/src/components/contact/SocialLink";

export default async function Contact() {
    return (
        <section className="min-h-[calc(100vh-100px)] bg-gradient-to-b from-[#1F1F1F] to-[#2D2D2D] text-gray-200 px-6 sm:px-8 py-8 lg:py-16 font-mono">
            <div className="mx-auto flex flex-col sm:flex-row items-center sm:items-start space-y-8 sm:space-y-0 sm:space-x-16">
                {/* Social Links Section */}
                <SocialLink />

                {/* Contact Form Section */}
                <ContactForm />
            </div>
        </section>
    );
}
