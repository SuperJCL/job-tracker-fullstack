"use client";

import { useState } from "react";
import type {
  ApplicationStatus,
  CreateApplicationInput,
} from "@/types/application";
import { isApplicationStatus } from "@/types/application";

type Props = {
  onAdd: (input: CreateApplicationInput) => void;
};

export default function ApplicationForm({ onAdd }: Props) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("Applied");
  const isFormValid = company.trim().length > 0 && role.trim().length > 0; //表单验证：公司和职位不能为空（去掉前后空格）

  const handleSubmit = () => {
    if (!isFormValid) return;

    onAdd({
      company: company.trim(),
      role: role.trim(),
      status,
    });

    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  return (
    <div className="application-form mb-6 space-y-4 rounded-lg border p-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Company</label>

        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="e.g. Amazon"
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Role</label>

        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g. Frontend Intern"
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Status</label>

        <select
          value={status}
          onChange={(e) => {
            const value = e.target.value;

            if (isApplicationStatus(value)) {
              setStatus(value);
            }
          }}
          className="w-full rounded border p-2"
        >
          <option value="Wishlist">Wishlist</option>
          <option value="Applied">Applied</option>
          <option value="OA">OA</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {!isFormValid && (
        <p className="text-sm text-gray-500">
          Please enter both company and role.
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className="
                    rounded bg-black px-4 py-2 text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
      >
        Add Application
      </button>
    </div>
  );
}
