import PaymentMethod from "../modules/PaymentMethod"
import Notifications from "../modules/Notifications"
import General from "../modules/General"
import PaymentHistory from "../modules/PaymentHistory"
import BillingMethods from "../modules/BillingMethods"

export type SettingsContentType = "general" | "payment-method" | "payment-history" | "notifications" | "billing-methods"

interface SettingsContentProps {
  type: SettingsContentType
  // General props
  generalProps?: {
    fullName: string
    countryOfBirth: string
    nationality: string
    countryCode: number
    phoneNumber: string
    email: string
    avatarUrl: string
    teachingInfoProps?: {
      subject: string
      languages: string
    }
  }
  // Notifications props
  notificationsProps?: {
    isReceivedEmailNotification: boolean
    isReceivedSMSNotification: boolean
  }
}

export default function SettingsContent({ 
  type, 
  generalProps,
  notificationsProps 
}: SettingsContentProps) {
  switch (type) {
    case "general":
      if (!generalProps) {
        return <div>General settings - props required</div>
      }
      return <General {...generalProps} />
    
    case "payment-method":
      return <PaymentMethod />
    
    case "payment-history":
      return <PaymentHistory />
    
    case "billing-methods":
      return <BillingMethods />
    
    case "notifications":
      if (!notificationsProps) {
        return <div>Notifications settings - props required</div>
      }
      return <Notifications {...notificationsProps} />
    
    default:
      return null
  }
}
