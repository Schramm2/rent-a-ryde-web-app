export class Booking {
    constructor(id, vehicleId, userId, startDate, endDate, extras, specialRequest, totalPrice, status, createdAt, updatedAt) {
        this.id = id
        this.vehicleId = vehicleId
        this.userId = userId
        this.startDate = startDate
        this.endDate = endDate
        this.extras = extras
        this.specialRequest = specialRequest
        this.totalPrice = totalPrice
        this.status = status
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}