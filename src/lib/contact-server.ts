import { createServerFn } from "@tanstack/react-start";

const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/jpeg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator((formData: unknown) => {
    if (!(formData instanceof FormData)) {
      throw new Error("Invalid form data payload");
    }
    return formData;
  })
  .handler(async ({ data: formData }) => {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
      console.error("Missing EmailJS environment variables");
      return { success: false, error: "Email service is not properly configured." };
    }

    const name = (formData.get("name") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const projectType = (formData.get("projectType") as string || "Not specified").trim();
    const budget = (formData.get("budget") as string || "Not specified").trim();
    const details = (formData.get("details") as string || "").trim();
    const file = formData.get("file") as File | null;

    if (!name || !email) {
      return { success: false, error: "Name and email are required." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    let fileInfo = "";
    if (file && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) {
        return { success: false, error: "File size exceeds 5MB limit." };
      }

      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return {
          success: false,
          error: "Invalid file type. Allowed formats: PDF, DOC, DOCX, TXT, PNG, JPG, WEBP.",
        };
      }

      fileInfo = `File attached: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
    }

    try {
      // EmailJS template parameters - DO NOT include to_email, EmailJS handles that
      const templateParams = {
        from_name: name,
        from_email: email,
        project_type: projectType,
        budget: budget,
        details: details || "",
        file_info: fileInfo,
      };

      console.log("📧 Sending via EmailJS to uzairy099@gmail.com...");
      console.log("Template params:", JSON.stringify(templateParams, null, 2));

      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          accessToken: EMAILJS_PRIVATE_KEY,
          template_params: templateParams,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ EmailJS Error:", response.status, errorText);
        throw new Error(`EmailJS Error: ${response.status} - ${errorText}`);
      }

      console.log("✅ Email sent successfully via EmailJS!");
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Server error sending email.";
      console.error("Contact form submission failed:", err);
      return { success: false, error: message };
    }
  });
