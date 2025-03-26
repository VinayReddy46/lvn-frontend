import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";

const UserRoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const { user, updateUserRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (!selectedRole) {
      toast.error("Please select a role to continue");
      return;
    }

    // Update the user's role
    updateUserRole(selectedRole);

    // Navigate based on role
    if (selectedRole === "org_admin") {
      toast.success(`You've selected Organization Admin role`);
      navigate("/create-organization");
    } else {
      toast.success(`You've selected Volunteer role`);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-orange-500 mb-10">POINT</h1>

        <h2 className="text-3xl font-bold mb-4">Who are you?</h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          You're almost signed up. Let us know who you are so we can create the
          right account for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
          {/* Volunteer or Employee Option */}
          <div
            className={`border rounded-lg p-6 text-center cursor-pointer transition-all hover:shadow-md 
              ${
                selectedRole === "user"
                  ? "border-orange-500 ring-2 ring-orange-200"
                  : "border-gray-200"
              }`}
            onClick={() => handleRoleSelect("user")}
          >
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-orange-500 w-8 h-8"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">
              I'm a Volunteer or Employee
            </h3>
            <p className="text-gray-600 text-sm">
              Ready to volunteer + give personally or with an organization
            </p>
            {selectedRole === "user" && (
              <div className="absolute top-4 left-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Admin of an Organization Option */}
          <div
            className={`border rounded-lg p-6 text-center cursor-pointer transition-all hover:shadow-md 
              ${
                selectedRole === "org_admin"
                  ? "border-orange-500 ring-2 ring-orange-200"
                  : "border-gray-200"
              }`}
            onClick={() => handleRoleSelect("org_admin")}
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-indigo-500 w-8 h-8"
              >
                <path d="M20 7h-9"></path>
                <path d="M14 17H5"></path>
                <circle cx="17" cy="17" r="3"></circle>
                <circle cx="7" cy="7" r="3"></circle>
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">
              I'm an Admin of an Organization
            </h3>
            <p className="text-gray-600 text-sm">
              Nonprofit, Company, School or Religious Congregation
            </p>
            {selectedRole === "org_admin" && (
              <div className="absolute top-4 left-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={handleContinue}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-md font-medium w-full max-w-xs"
          disabled={!selectedRole}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default UserRoleSelection;
