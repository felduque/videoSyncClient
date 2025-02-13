import type React from "react";
import { BadgeInfo, CheckCircle, XCircle } from "lucide-react";
import { useMemo } from "react";
import { passwordRequirements } from "./user-validation.ts";

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password,
}) => {
  const meetsRequirement = (requirement: { regex: RegExp }) =>
    requirement.regex.test(password);

  const { metRequirements, strength, unmetRequirement } = useMemo(() => {
    const metReqs = passwordRequirements.filter(meetsRequirement);
    const strength = (metReqs.length / passwordRequirements.length) * 100;
    const unmetReq = passwordRequirements.find((req) => !meetsRequirement(req)) || null;
    return { metRequirements: metReqs, strength, unmetRequirement: unmetReq };
  }, [password, passwordRequirements, meetsRequirement]);
  return (
    <div className="mt-2">
      {unmetRequirement ? (
        <div className="flex justify-end space-y-1 mt-2">
          <p className="flex items-center text-sm">
            <BadgeInfo className="mr-2 w-4 h-4 text-red-500" />
            {unmetRequirement.label}
          </p>
        </div>
      ) : (
        <div className="flex justify-end space-y-1 mt-2">
          <p className="flex items-center text-sm">
            <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
            Password meets requirements
          </p>
        </div>
      )}
      <div className="bg-gray-200 rounded-full w-full h-2.5">
        <div
          className="bg-blue-600 rounded-full h-2.5 transition-all duration-300 ease-in-out"
          style={{ width: `${strength}%` }}
        ></div>
      </div>
    </div>
  );
};
