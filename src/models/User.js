export class User {
    constructor(uid, email, fullName, role, age, phoneNumber, createdAt) {
      this.uid = uid
      this.email = email
      this.fullName = fullName
      this.createdAt = createdAt
      this.role = role // Admin or Client
      this.age = age
      this.phone = phoneNumber
    }
  }
  