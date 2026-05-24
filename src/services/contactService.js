import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  // Base URL will be handled by your proxy configuration
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * Send contact email using the backend API
 * @param {Object} contactData - The contact form data
 * @param {string} contactData.name - Full name of the sender
 * @param {string} contactData.email - Email address of the sender
 * @param {string} contactData.subject - Subject of the email
 * @param {string} contactData.message - Message content
 * @returns {Promise} Response from the backend
 */
export const sendContactEmail = async (contactData) => {
  try {
    // Use the correct route based on your server.js mounting
    const response = await api.post('/api/contact/send-email', contactData)
    return response.data
  } catch (error) {
    // Log the full error for debugging
    console.error('Contact service error:', error.response?.data || error.message)
    
    // Throw a more user-friendly error
    if (error.response?.status === 500) {
      throw new Error('Server error occurred while sending email')
    } else if (error.response?.status === 400) {
      throw new Error('Invalid form data provided')
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - please try again')
    } else {
      throw new Error('Failed to send email - please try again')
    }
  }
}

/**
 * Send booking summary email to user after successful booking
 * @param {Object} bookingData - The booking data
 * @param {string} bookingData.name - Full name of the customer
 * @param {string} bookingData.email - Email address of the customer
 * @param {string} bookingData.vehicleName - Name of the booked vehicle
 * @param {string} bookingData.pickupDate - Pickup date
 * @param {string} bookingData.dropoffDate - Dropoff date
 * @param {number} bookingData.rentalDays - Number of rental days
 * @param {Array} bookingData.extras - Selected extras
 * @param {string} bookingData.totalPrice - Total price
 * @param {string} bookingData.specialRequests - Special requests
 * @param {boolean} bookingData.emailNotificationsEnabled - Whether user has email notifications enabled
 * @returns {Promise} Response from the backend
 */
export const sendBookingSummaryEmail = async (bookingData) => {
  try {
    // Check if user has email notifications enabled
    if (bookingData.emailNotificationsEnabled === false) {
      return { message: 'Email notifications disabled by user preference' }
    }

    // Format the booking summary message
    const extrasList = bookingData.extras && bookingData.extras.length > 0 
      ? bookingData.extras.map(extra => `• ${extra.name} - ${extra.price}`).join('\n')
      : 'None selected'
    
    const message = `Dear ${bookingData.name},

Thank you for choosing Rent A Ryde for your adventure! Your booking has been successfully submitted and is currently being processed.

BOOKING SUMMARY:
Vehicle: ${bookingData.vehicleName}
Pickup Date: ${bookingData.pickupDate}
Dropoff Date: ${bookingData.dropoffDate}
Rental Period: ${bookingData.rentalDays} day(s)
Total Price: ${bookingData.totalPrice}

SELECTED EXTRAS:
${extrasList}

${bookingData.specialRequests ? `SPECIAL REQUESTS:\n${bookingData.specialRequests}\n` : ''}

WHAT'S NEXT:
1. Our team will review your booking within 24 hours
2. You'll receive a confirmation email with final details
3. Payment instructions will be provided
4. We'll contact you to arrange pickup details

If you have any questions, please don't hesitate to contact us:
• Email: enquiries@rentaryde.co.za
• Phone: +27 72 130 1912

We're excited to be part of your adventure!

Best regards,
The Rent A Ryde Team`

    const emailData = {
      name: bookingData.name,
      email: bookingData.email,
      subject: `Booking Confirmation - ${bookingData.vehicleName}`,
      message: message
    }

    // Use the same contact email endpoint
    const response = await api.post('/api/contact/send-booking-summary', emailData)
    return response.data
  } catch (error) {
    // Log the full error for debugging
    console.error('Booking summary email error:', error.response?.data || error.message)
    
    // Throw a more user-friendly error
    if (error.response?.status === 500) {
      throw new Error('Server error occurred while sending booking summary')
    } else if (error.response?.status === 400) {
      throw new Error('Invalid booking data provided')
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - please try again')
    } else {
      throw new Error('Failed to send booking summary - please try again')
    }
  }
}

/**
 * Send cancellation email to user when booking is cancelled
 * @param {Object} cancellationData - The cancellation data
 * @param {string} cancellationData.name - Full name of the customer
 * @param {string} cancellationData.email - Email address of the customer
 * @param {string} cancellationData.bookingId - Booking ID
 * @param {string} cancellationData.vehicleName - Name of the cancelled vehicle
 * @param {string} cancellationData.startDate - Start date of cancelled booking
 * @param {string} cancellationData.endDate - End date of cancelled booking
 * @param {string} cancellationData.totalPrice - Total price of cancelled booking
 * @param {string} cancellationData.cancellationReason - Reason for cancellation
 * @param {string} cancellationData.cancelledBy - Who cancelled the booking (admin/user/system)
 * @param {string} cancellationData.cancelledAt - When the booking was cancelled
 * @param {boolean} cancellationData.emailNotificationsEnabled - Whether user has email notifications enabled
 * @returns {Promise} Response from the backend
 */
export const sendCancellationEmail = async (cancellationData) => {
  try {
    // Check if user has email notifications enabled
    if (cancellationData.emailNotificationsEnabled === false) {
      return { message: 'Email notifications disabled by user preference' }
    }

    // Format the cancellation message
    const message = `Dear ${cancellationData.name},

We hope this email finds you well.

This is to inform you that your booking has been cancelled.

BOOKING DETAILS:
- Booking ID: #${cancellationData.bookingId}
- Vehicle: ${cancellationData.vehicleName}
- Start Date: ${cancellationData.startDate}
- End Date: ${cancellationData.endDate}
- Total Amount: R${cancellationData.totalPrice}

CANCELLATION INFORMATION:
- Cancelled By: ${cancellationData.cancelledBy === 'admin' ? 'our administration team' : 
                 cancellationData.cancelledBy === 'user' ? 'you' : 'our system'}
- Cancellation Date: ${cancellationData.cancelledAt}
- Reason: ${cancellationData.cancellationReason || 'No specific reason provided'}

If you have any questions about this cancellation or would like to make a new booking, please don't hesitate to contact us:
• Email: enquiries@rentaryde.co.za
• Phone: +27 72 130 1912

We apologize for any inconvenience this may have caused.

Best regards,
The Rent A Ryde Team

---
This is an automated message regarding booking #${cancellationData.bookingId}.`

    const emailData = {
      name: cancellationData.name,
      email: cancellationData.email,
      subject: `Booking #${cancellationData.bookingId} Cancellation - RentARyde`,
      message: message
    }

    // Use the same contact email endpoint
    const response = await api.post('/api/contact/send-cancellation', emailData)
    return response.data
  } catch (error) {
    // Log the full error for debugging
    console.error('Cancellation email error:', error.response?.data || error.message)
    
    // Throw a more user-friendly error
    if (error.response?.status === 500) {
      throw new Error('Server error occurred while sending cancellation email')
    } else if (error.response?.status === 400) {
      throw new Error('Invalid cancellation data provided')
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - please try again')
    } else {
      throw new Error('Failed to send cancellation email - please try again')
    }
  }
}
