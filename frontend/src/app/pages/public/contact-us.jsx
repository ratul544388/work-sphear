import { FormWrapper } from "@/components/form-wrapper";
import { FormInput } from "@/components/form/form-input";
import { Textarea } from "@/components/ui/textarea";
import Title from "@/components/title";
import { contactMessageSchema } from "@/validations";

const ContactUs = () => {
  const defaultValues = {
    email: "",
    message: "",
  };

  return (
    <>
      <Title>Contact Us</Title>
      <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            We&apos;d love to hear from you
          </h2>
          <p className="mt-2 text-gray-600">
            Please fill out the form below and we&apos;ll get back to you shortly.
          </p>
        </div>
        <FormWrapper
          defaultValues={defaultValues}
          title="Send us a message"
          description="Whether you have a question, feedback, or just want to say hi—our team is here to listen."
          actionLabel="Send Message"
          schema={contactMessageSchema}
          api="/contact"
          className="mx-auto"
          formResetAfterSuccess
        >
          {({ form, isPending }) => (
            <>
              <FormInput
                control={form.control}
                name="email"
                placeholder="Your Email Address"
                disabled={isPending}
              />
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  rows={6}
                  {...form.register("message")}
                  disabled={isPending}
                  className="w-full mt-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-500"
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>
            </>
          )}
        </FormWrapper>
      </div>
    </>
  );
};

export default ContactUs;
