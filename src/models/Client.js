import { User } from "./User"
export class Client extends User {
  constructor(uid, email, fullName, age, phoneNumber, createdAt, bookings, documents) {
    super(uid, email, fullName, "client", age, phoneNumber, createdAt)
    this.bookings = bookings || []
    this.documents = documents || []
  }
}
