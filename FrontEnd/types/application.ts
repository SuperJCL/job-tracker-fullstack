export type ApplicationStatus =
  | "Wishlist"
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Unknown"
  | "OA";

/**
 * 使用位置：card、list、mock data
 */
export type Application = {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
};

// 新增申请时的输入，不需要提供 id
export type CreateApplicationInput = Omit<Application, "id">;

// 筛选条件可以是具体状态，也可以是全部
export type ApplicationStatusFilter = ApplicationStatus | "All";

// 类型检查函数
export function isApplicationStatus(value: string): value is ApplicationStatus {
  return (
    value === "Wishlist" ||
    value === "Applied" ||
    value === "Interview" ||
    value === "Offer" ||
    value === "Rejected" ||
    value === "Unknown" ||
    value === "OA"
  );
}
