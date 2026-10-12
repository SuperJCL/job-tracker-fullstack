"use client";

import { useState } from "react";

import {
  validateApplication,
  type ApplicationFormErrors,
} from "@/lib/validation/application";
import {
  isApplicationStatus,
  type ApplicationStatus,
  type CreateApplicationInput,
} from "@/types/application";
import type { SubmitEvent } from "react";
import "./ApplicationForm.scss";

type Props = {
  onAdd: (input: CreateApplicationInput) => void;
};

export default function ApplicationForm({ onAdd }: Props) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("Applied");
  const [errors, setErrors] = useState<ApplicationFormErrors>({});

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    //SubmitEvent：React 的表单提交事件类型。
    //<HTMLFormElement>：说明处理事件的元素是 <form></form>
    event.preventDefault(); //阻止浏览器默认的表单提交行为，让 React 处理添加操作

    const result = validateApplication({
      company,
      role,
      status,
    });

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    onAdd(result.data);

    setErrors({});
    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  return (
    <form
      className="application-form"
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate //禁用浏览器默认的表单验证，使用自定义验证
    >
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
          autoComplete="off"
          onChange={(e) => {
            const value = e.target.value;
            setCompany(value);

            if (errors.company) {
              const result = validateApplication({
                company: value,
                role,
                status,
              });
              setErrors(result.success ? {} : result.errors);
            }
          }}
          placeholder="e.g. Amazon"
          required //浏览器的必填检查
          autoFocus //弹窗打开后，让用户直接填写公司
          aria-invalid={Boolean(errors.company)} //如果有错误，aria-invalid 为 true
          aria-describedby={
            errors.company ? "application-company-error" : undefined
          } //如果有错误，aria-describedby 指向错误提示的 id
        />
        {errors.company && (
          <p id="application-company-error" className="application-form__error">
            {errors.company}
          </p>
        )}
      </div>

      <div className="application-form__field">
        <label htmlFor="application-role" className="application-form__label">
          Role
        </label>
        <input
          id="application-role"
          className="application-form__input"
          value={role}
          autoComplete="off"
          onChange={(e) => {
            const value = e.target.value;
            setRole(value);

            if (errors.role) {
              const result = validateApplication({
                company,
                role: value,
                status,
              });

              setErrors(result.success ? {} : result.errors);
            }
          }}
          placeholder="e.g. Frontend Intern"
          required
          aria-invalid={Boolean(errors.role)}
          aria-describedby={errors.role ? "application-role-error" : undefined}
        />

        {errors.role && (
          <p id="application-role-error" className="application-form__error">
            {errors.role}
          </p>
        )}
      </div>

      <div className="application-form__field">
        <label htmlFor="application-status" className="application-form__label">
          Status
        </label>
        <select
          id="application-status"
          className="application-form__input"
          value={status}
          aria-invalid={Boolean(errors.status)}
          aria-describedby={
            errors.status ? "application-status-error" : undefined
          }
          onChange={(e) => {
            const value = e.target.value;

            if (isApplicationStatus(value)) {
              setStatus(value);

              if (errors.status) {
                const result = validateApplication({
                  company,
                  role,
                  status: value,
                });

                setErrors(result.success ? {} : result.errors);
              }
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
        {errors.status && (
          <p id="application-status-error" className="application-form__error">
            {errors.status}
          </p>
        )}
      </div>

      <div className="application-form__actions">
        <button
          type="submit" //按钮提交表单，不再需要 onClick
          className="application-form__submit"
        >
          Add application
        </button>
      </div>
    </form>
  );
}
