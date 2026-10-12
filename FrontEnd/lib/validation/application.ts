import {
  isApplicationStatus,
  type CreateApplicationInput,
} from "@/types/application";

export const COMPANY_MAX_LENGTH = 100; //公司最多 100 字符
export const ROLE_MAX_LENGTH = 150; //岗位最多 150 字符

// 待校验的数据：状态可能是任意字符串
type ApplicationFormValues = {
  company: string;
  role: string;
  status: string;
};

// 每个字段都可能有错误，也可能没有
export type ApplicationFormErrors = {
  company?: string; //公司合法时，errors 里不需要有 company；不合法时，才放入错误提示
  role?: string;
  status?: string;
};

// 校验结果：成功返回数据，失败返回错误
type ValidationResult =
  | {
      success: true;
      data: CreateApplicationInput;
    }
  | {
      success: false;
      errors: ApplicationFormErrors;
    };
/**
 *
 * @param values ApplicationFormValues
 * @returns 包含处理后的新application数据(格式化)或错误信息
 */
export function validateApplication(
  values: ApplicationFormValues,
): ValidationResult {
  const company = values.company.trim();
  const role = values.role.trim();
  //先创建空对象，再根据校验结果逐项添加错误
  const errors: ApplicationFormErrors = {};

  if (!company) {
    errors.company = "Please enter a company.";
  } else if (company.length > COMPANY_MAX_LENGTH) {
    errors.company = `Company must be ${COMPANY_MAX_LENGTH} characters or fewer.`;
  }

  if (!role) {
    errors.role = "Please enter a role.";
  } else if (role.length > ROLE_MAX_LENGTH) {
    errors.role = `Role must be ${ROLE_MAX_LENGTH} characters or fewer.`;
  }

  const status = values.status;

  if (!isApplicationStatus(status)) {
    errors.status = "Please select a valid status.";

    return {
      success: false,
      errors,
    };
  }

  if (Object.keys(errors).length > 0) {
    //Object.keys(errors) 会取得对象自身的键名数组
    //如果长度大于 0，就说明至少有一个错误
    return {
      success: false,
      errors,
    };
  }

  return {
    success: true,
    data: {
      company,
      role,
      status,
    },
  };
}
