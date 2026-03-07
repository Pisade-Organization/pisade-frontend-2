import SectionHeader from "../../fields/SectionHeader";
import NotificationToggleRow from "./NotificationToggleRow";
import { NotificationChannel } from "./types";
import NotificationsTitle from "./NotificationsTitle";

interface NotificationsI {
  isReceivedEmailNotification: boolean;
  isReceivedSMSNotification: boolean;
  isUpdating?: boolean;
  onEmailToggle: (checked: boolean) => void;
  onSMSToggle: (checked: boolean) => void;
}
export default function Notifications({
  isReceivedEmailNotification,
  isReceivedSMSNotification,
  isUpdating,
  onEmailToggle,
  onSMSToggle,
}: NotificationsI) {
  return (
    <div className="w-full flex flex-col gap-4 lg:py-8 lg:px-12 bg-white rounded-2xl ">
      <NotificationsTitle />

      <div className="w-full flex flex-col gap-3">
        <NotificationToggleRow 
          notificationChannel={NotificationChannel.EMAIL}
          isToggled={isReceivedEmailNotification}
          isLoading={isUpdating}
          onToggle={onEmailToggle}
        />

        <NotificationToggleRow 
          notificationChannel={NotificationChannel.SMS}
          isToggled={isReceivedSMSNotification}
          isLoading={isUpdating}
          onToggle={onSMSToggle}
        />
      </div>
    </div>
  )
}
