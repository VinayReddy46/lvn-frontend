import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const ProfileUpdate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [errors, setErrors] = useState({});

  const toggleVisibility = (field) =>
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const resetForm = () => setPasswords({ current: "", new: "", confirm: "" });

  const validatePasswords = () => {
    const newErrors = {};
    if (
      !passwords.new.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    )
      newErrors.new =
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character.";
    if (passwords.new !== passwords.confirm)
      newErrors.confirm = "Passwords do not match.";
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSave = () => {
    if (validatePasswords()) {
      alert("Password updated successfully!");
      setIsOpen(false);
      resetForm();
    }
  };

  const InputField = ({ label, name }) => (
    <div className="mt-4 relative">
      <label className="block text-sm font-medium text-black dark:text-white">
        {label} *
      </label>
      <input
        type={showPassword[name] ? "text" : "password"}
        name={name}
        value={passwords[name]}
        onChange={handleChange}
        className="w-full px-3 py-2 border dark:border-gray-600 rounded-md mt-1 bg-white dark:bg-gray-700 text-black dark:text-white"
      />
      <span
        className="absolute right-3 top-9 cursor-pointer text-black dark:text-white"
        onClick={() => toggleVisibility(name)}
      >
        {showPassword[name] ? <FaEyeSlash /> : <FaEye />}
      </span>
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
    </div>
  );

  return (
    <Card className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your account password
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <FaLock /> <span>********</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Last updated at Mar 26, 2025
        </p>
        <div className="w-full flex justify-start mt-4">
          <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogTrigger asChild>
              <button className="px-4 py-2 border dark:border-gray-700 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
                Update Password
              </button>
            </DialogTrigger>
            <DialogContent className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-md w-[350px]">
              <DialogTitle className="text-black dark:text-white">
                Update Your Password
              </DialogTitle>
              <DialogDescription className="text-gray-500 dark:text-gray-400">
                Securely update your account credentials
              </DialogDescription>
              <InputField label="Current Password" name="current" />
              <InputField label="New Password" name="new" />
              <InputField label="Confirm New Password" name="confirm" />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded-md"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileUpdate;
