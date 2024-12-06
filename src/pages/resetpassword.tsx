import { useState } from "react";
import LoginBackground from "../assets/images/login-background.png";

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
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setStep(2);
  };

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Code submitted:", code);
    setStep(3);
  };

  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New password submitted:", newPassword);
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
            <form onSubmit={handleSubmitEmail}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter the email you registered with"
                  required
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
              </div>
              <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white rounded">
                Reset Password
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmitCode}>
              <div className="mb-4">
                <p className="text-sm text-gray-500 text-center mt-4">A code was sent to your email.</p>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mt-6">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter the verification code"
                  required
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
              </div>
              <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white rounded">
                Continue
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmitPassword}>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
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
