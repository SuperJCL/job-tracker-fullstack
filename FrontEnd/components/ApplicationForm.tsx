"use client";

import { useState } from "react";
import type {
  ApplicationStatus,
  CreateApplicationInput,
} from "@/types/application";
import { isApplicationStatus } from "@/types/application";
import type { SubmitEvent } from "react";
import "./ApplicationForm.scss";

type Props = {
  onAdd: (input: CreateApplicationInput) => void;
};

export default function ApplicationForm({ onAdd }: Props) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("Applied");
  const isFormValid = company.trim().length > 0 && role.trim().length > 0; //表单验证：公司和职位不能为空（去掉前后空格）

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    //SubmitEvent：React 的表单提交事件类型。
    //<HTMLFormElement>：说明处理事件的元素是 <form></form>
    event.preventDefault(); //阻止浏览器默认的表单提交行为，让 React 处理添加操作

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
    <form className="application-form" onSubmit={handleSubmit}>
      <div className="application-form__field">
        <label
          htmlFor="application-company"
          className="application-form__label"
        >
          Company
        </label>
        <input
          id="application-company"
          className="application-form__input"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="e.g. Amazon"
          required //浏览器的必填检查
          autoFocus //弹窗打开后，让用户直接填写公司
        />
      </div>

      <div className="application-form__field">
        <label htmlFor="application-role" className="application-form__label">
          Role
        </label>
        <input
          id="application-role"
          className="application-form__input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g. Frontend Intern"
          required
        />
      </div>

      <div className="application-form__field">
        <label htmlFor="application-status" className="application-form__label">
          Status
        </label>
        <select
          id="application-status"
          className="application-form__input"
          value={status}
          onChange={(e) => {
            const value = e.target.value;

            if (isApplicationStatus(value)) {
              setStatus(value);
            }
          }}
        >
          <option value="Wishlist">Wishlist</option>
          <option value="Applied">Applied</option>
          <option value="OA">OA</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>

      {!isFormValid && (
        <p className="application-form__hint">
          Please enter both company and role.
        </p>
      )}

      <div className="application-form__actions">
        <button
          type="submit" //按钮提交表单，不再需要 onClick
          disabled={!isFormValid}
          className="application-form__submit"
        >
          Add application
        </button>
      </div>
    </form>
  );
}
