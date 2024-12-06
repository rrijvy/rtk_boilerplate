import { useState } from "react";
import SignupBackground from "../assets/images/signup-background.png";

const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="flex justify-center mb-3">
      {[...Array(totalSteps)].map((_, index) => (
        <div key={index} className={`h-2 w-4 mx-2 rounded-full ${index < currentStep ? "bg-green-500" : "bg-gray-300"}`}></div>
      ))}
    </div>
  );
};

const Register = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    password: "",
    phonenumber: "",
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
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
      case 4:
        return "Payment Details";
      default:
        return "Complete Registration";
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md p-10 rounded-xl shadow-sm">
          <h1 className="text-3xl font-semibold mb-2 text-gray-800 text-center">{getHeaderText()}</h1>

          <StepIndicator currentStep={step} totalSteps={5} />

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="mb-5 text-left">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="confirmationCode" className="block text-sm font-medium text-gray-700">
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                    placeholder="Enter your full name"
                    required
                    className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="mb-5 text-left">
                  <label htmlFor="Phone Number" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="phonenumber"
                    id="phonenumber"
                    value={userDetails.phonenumber}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        phonenumber: e.target.value,
                      })
                    }
                    placeholder="Enter your Phone Number"
                    required
                    className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="mb-5 text-left">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
              <div>
                <div className="mb-5 text-left">
                  <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="nameOnCard"
                    value={userDetails.nameOnCard || ""}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        nameOnCard: e.target.value,
                      })
                    }
                    placeholder="Enter the name of the cardholder"
                    className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="mb-5 text-left">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={userDetails.cardNumber || ""}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        cardNumber: e.target.value,
                      })
                    }
                    placeholder="Enter the card number"
                    className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="mb-5">
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      value={userDetails.expiryDate || ""}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          expiryDate: e.target.value,
                        })
                      }
                      placeholder="MM/YY"
                      className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      value={userDetails.cvv || ""}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          cvv: e.target.value,
                        })
                      }
                      placeholder="Enter CVV"
                      className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
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
                  <span className="text-sm text-gray-700">I accept the terms of service & privacy policy</span>
                </label>
              </div>
            )}
            <div className="flex justify-between items-center">
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} className="text-blue-500 hover:underline">
                  Previous
                </button>
              )}

              {step === 4 && (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mx-2"
                >
                  Skip
                </button>
              )}

              {step < 5 && (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Next
                </button>
              )}

              {step === 5 && (
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                  Complete Registration
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="flex-1 relative h-screen">
        <img src={SignupBackground} alt="Signup Background" className="w-full h-full object-cover opacity-90" />
      </div>
    </div>
  );
};

export default Register;
