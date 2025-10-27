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