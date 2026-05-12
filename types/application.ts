export type ApplicationStatus =
  | "Wishlist"
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Unknown"
  | "OA";

export type Application = {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
};