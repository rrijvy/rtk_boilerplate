import { useState } from "react";
import { z } from "zod";
import LoginBackground from "../assets/images/login-background.png";

type FormData = {
  email: string;
  confirmationCode: string;
  newPassword: string;
  confirmPassword: string;
};

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address").nonempty("Email is required"),
});

const verificationCodeSchema = z.object({
  confirmationCode: z.string().length(6, "Verification code must be 6 characters long").nonempty("Verification code is required"),
});

const passwordSchema = z
  .object({
    newPassword: z.string().min(6, "Password should be at least 6 characters").nonempty("New password is required"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="flex justify-center mb-3">
      {[...Array(totalSteps)].map((_, index) => (
        <div key={index} className={`h-2 w-4 mx-2 rounded-full ${index < currentStep ? "bg-green-500" : "bg-gray-300"}`}></div>
      ))}
    </div>
  );
};

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    confirmationCode: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleValidation = () => {
    try {
      setErrors({});
      switch (step) {
        case 1:
          emailSchema.parse({ email: formData.email });
          break;
        case 2:
          verificationCodeSchema.parse({ confirmationCode: formData.confirmationCode });
          break;
        case 3:
          passwordSchema.parse({
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
          });
          break;
        default:
          break;
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages: Record<string, string> = {};
        error.errors.forEach((err) => {
          errorMessages[err.path[0] as string] = err.message;
        });
        setErrors(errorMessages);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidation()) {
      if (step === 3) {
        console.log("Form Submitted:", formData);
      } else {
        setStep((prev) => prev + 1);
      }
    }
  };

  const getHeaderText = () => {
    switch (step) {
      case 1:
        return "Forgot Password?";
      case 2:
        return "Enter the verification code";
      case 3:
        return "Set a new password";
      default:
        return "";
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 relative h-screen">
        <img src={LoginBackground} alt="Recovery Background" className="w-full h-full object-cover opacity-90" />
      </div>

      <div className="flex-1 flex justify-center items-center bg-white p-6">
        <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-sm">
          <StepIndicator currentStep={step} totalSteps={3} />

          <h1 className="text-3xl font-semibold mb-4 text-gray-800 text-center">{getHeaderText()}</h1>

          {step === 1 && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter the email you registered with"
                  required
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white rounded">
                Reset Password
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <p className="text-sm text-gray-500 text-center mt-4">A code was sent to your email.</p>
                <label htmlFor="confirmationCode" className="block text-sm font-medium text-gray-700 mt-6">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="confirmationCode"
                  value={formData.confirmationCode}
                  onChange={(e) => handleInputChange("confirmationCode", e.target.value)}
                  placeholder="Enter the verification code"
                  required
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
                {errors.confirmationCode && <p className="text-red-500 text-sm">{errors.confirmationCode}</p>}
              </div>
              <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white rounded">
                Continue
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange("newPassword", e.target.value)}
                  placeholder="Enter new password"
                  required
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
                {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Confirm new password"
                  required
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
              <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white rounded">
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
