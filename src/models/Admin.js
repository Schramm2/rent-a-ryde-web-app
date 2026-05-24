import { User } from "./User"

export class Admin extends User {
  constructor(uid, email, username, dateCreated) {
    super(uid, email, username, "admin", dateCreated)
  }
}
