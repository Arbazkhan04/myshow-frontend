export type User = {
    "_id": string,
    "fullName": string,
    "email": string,
    "gender": "male" | "female" | "other",
    "role": "admin" | "user",
    "status": "active" | "inactive",
    "profilePic": null | string,
    "createdAt": string,
    "updatedAt": string,
}

export enum PlanTier {
  STARTER = 'STARTER',
  CREATOR = 'CREATOR',
  PRO = 'PRO',
  AGENCY = 'AGENCY',
}

export enum PlanInterval {
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL',
}