import { useState } from "react";
import { z } from "zod";
import SignupBackground from "../assets/images/signup-background.png";

const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const emailSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .regex(emailRegex, "Please enter a valid email address")
    .nonempty("Email is required"),
});

const confirmationCodeSchema = z.object({
  confirmationCode: z.string().nonempty("Confirmation code is required").length(6, "Confirmation code must be 6 characters"),
});

const userDetailsSchema = z.object({
  name: z.string().nonempty("Full name is required"),
  password: z.string().min(6, "Password should be at least 6 characters").nonempty("Password is required"),
  phonenumber: z
    .string()
    .regex(/^\d{11}$/, "Phone number must be 11 digits")
    .nonempty("Phone number is required"),
});

const paymentDetailsSchema = z.object({
  nameOnCard: z.string().nonempty("Name on card is required"),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Card number must be 16 digits")
    .nonempty("Card number is required"),
  expiryDate: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, "Expiry date must be in MM/YY format")
    .nonempty("Expiry date is required"),
  cvv: z
    .string()
    .regex(/^\d{3}$/, "CVV must be 3 digits")
    .nonempty("CVV is required"),
});

const termsSchema = z.object({
  termsAccepted: z.boolean().refine((val) => val, "You must accept the terms and conditions"),
});

type FormData = {
  email: string;
  confirmationCode: string;
  userDetails: {
    name: string;
    password: string;
    phonenumber: string;
  };
  paymentDetails: {
    nameOnCard: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  termsAccepted: boolean;
};

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
  const [formData, setFormData] = useState<FormData>({
    email: "",
    confirmationCode: "",
    userDetails: { name: "", password: "", phonenumber: "" },
    paymentDetails: { nameOnCard: "", cardNumber: "", expiryDate: "", cvv: "" },
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleValidation = () => {
    try {
      setErrors({});
      switch (step) {
        case 1:
          emailSchema.parse({ email: formData.email });
          break;
        case 2:
          confirmationCodeSchema.parse({ confirmationCode: formData.confirmationCode });
          break;
        case 3:
          userDetailsSchema.parse(formData.userDetails);
          break;
        case 4:
          paymentDetailsSchema.parse(formData.paymentDetails);
          break;
        case 5:
          termsSchema.parse({ termsAccepted: formData.termsAccepted });
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

  const handleNext = () => {
    if (handleValidation()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log("Registration successful:", formData);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="mb-5 text-left">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        );
      case 2:
        return (
          <div className="mb-5 text-left">
            <label htmlFor="confirmationCode" className="block text-sm font-medium text-gray-700">
              Confirmation Code
            </label>
            <input
              type="text"
              id="confirmationCode"
              value={formData.confirmationCode}
              onChange={(e) => setFormData({ ...formData, confirmationCode: e.target.value })}
              placeholder="Enter the confirmation code"
              className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmationCode && <p className="text-red-500 text-sm">{errors.confirmationCode}</p>}
          </div>
        );
      case 3:
        return (
          <div className="mb-5 text-left">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.userDetails.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    userDetails: { ...formData.userDetails, name: e.target.value },
                  })
                }
                placeholder="Enter your full name"
                className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.userDetails.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    userDetails: { ...formData.userDetails, password: e.target.value },
                  })
                }
                placeholder="Enter your password"
                className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="phonenumber"
                value={formData.userDetails.phonenumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    userDetails: { ...formData.userDetails, phonenumber: e.target.value },
                  })
                }
                placeholder="Enter your phone number"
                className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phonenumber && <p className="text-red-500 text-sm">{errors.phonenumber}</p>}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="mb-5 text-left">
            <div className="mb-4">
              <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700">
                Name on Card
              </label>
              <input
                type="text"
                id="nameOnCard"
                value={formData.paymentDetails.nameOnCard}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentDetails: { ...formData.paymentDetails, nameOnCard: e.target.value },
                  })
                }
                placeholder="Enter the name on the card"
                className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.nameOnCard && <p className="text-red-500 text-sm">{errors.nameOnCard}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                value={formData.paymentDetails.cardNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentDetails: { ...formData.paymentDetails, cardNumber: e.target.value },
                  })
                }
                placeholder="Enter your 16-digit card number"
                className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date (MM/YY)
              </label>
              <input
                type="text"
                id="expiryDate"
                value={formData.paymentDetails.expiryDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentDetails: { ...formData.paymentDetails, expiryDate: e.target.value },
                  })
                }
                placeholder="MM/YY"
                className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                value={formData.paymentDetails.cvv}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentDetails: { ...formData.paymentDetails, cvv: e.target.value },
                  })
                }
                placeholder="3-digit CVV"
                className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="mb-5 text-left">
            <label htmlFor="terms" className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={formData.termsAccepted}
                onChange={() => setFormData({ ...formData, termsAccepted: !formData.termsAccepted })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">I accept the terms of service & privacy policy</span>
            </label>
            {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  const stepHeaders = ["Let's get started", "Email Verification", "User Details", "Payment Details", "Complete Registration"];

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="w-full max-w-md p-10 rounded-xl shadow-sm">
          <h1 className="text-3xl font-semibold mb-2 text-gray-800 text-center">{stepHeaders[step - 1]}</h1>

          <StepIndicator currentStep={step} totalSteps={5} />

          <form onSubmit={handleSubmit}>
            {renderStep()}
            <div className="flex justify-between items-center mt-6">
              {step > 1 && (
                <button type="button" onClick={handlePrevious} className="text-blue-500 hover:underline">
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
              {step < 5 ? (
                <button type="button" onClick={handleNext} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Next
                </button>
              ) : (
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
