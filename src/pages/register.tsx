import { useState } from "react";
import SignupBackground from "../assets/images/signup-background.png";

const Register = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    password: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering with details:", {
      email,
      confirmationCode,
      userDetails,
      termsAccepted,
    });
  };

  const getHeaderText = () => {
    switch (step) {
      case 1:
        return "Let's get started";
      case 2:
        return "Email Verification";
      case 3:
        return "User Details";

      // You can add more cases for future steps
      default:
        return "Complete Registration";
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex justify-center items-center bg-white p-6">
        <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-sm">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800 text-center">
            {getHeaderText()}
          </h1>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="mb-5 text-left">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
            {step === 2 && (
              <div className="mb-5 text-left">
                <label
                  htmlFor="confirmationCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmation Code
                </label>
                <input
                  type="text"
                  id="confirmationCode"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  placeholder="Enter the confirmation code"
                  required
                  className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
            {step === 3 && (
              <div>
                <div className="mb-5 text-left">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={userDetails.name}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, name: e.target.value })
                    }
                    placeholder="Enter your full name"
                    required
                    className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="mb-5 text-left">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={userDetails.password}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      })
                    }
                    placeholder="Enter your password"
                    required
                    className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="mb-5 text-left">
                <label
                  htmlFor="paymentMethod"
                  className="block text-sm font-medium text-gray-700"
                >
                  Payment Method
                </label>
                <input
                  type="text"
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  placeholder="Enter your card details"
                  className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
            {step === 5 && (
              <div className="mb-5 text-left">
                <label htmlFor="terms" className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                    required
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    I accept the terms of service & privary policy
                  </span>
                </label>
              </div>
            )}

            <div className="flex justify-between items-center">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="text-blue-500 hover:underline"
                >
                  Previous
                </button>
              )}
              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="bg-blue-500 text-white py-2 px-2 rounded"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded"
                >
                  Complete Registration
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="flex-1 relative h-screen">
        <img
          src={SignupBackground}
          alt="Signup Background"
          className="w-full h-full object-cover opacity-90"
        />
      </div>
    </div>
  );
};

export default Register;
