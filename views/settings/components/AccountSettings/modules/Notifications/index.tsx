import SectionHeader from "../../fields/SectionHeader";
import NotificationToggleRow from "./NotificationToggleRow";
import { NotificationChannel } from "./types";
import NotificationsTitle from "./NotificationsTitle";

interface NotificationsI {
  isReceivedEmailNotification: boolean;
  isReceivedSMSNotification: boolean;
}
export default function Notifications({
  isReceivedEmailNotification,
  isReceivedSMSNotification
}: NotificationsI) {
  return (
    <div className="w-full flex flex-col gap-4 lg:py-8 lg:px-12 bg-white rounded-2xl ">
      <NotificationsTitle />

      <div className="w-full flex flex-col gap-3">
        <NotificationToggleRow 
          notificationChannel={NotificationChannel.EMAIL}
          isToggled={isReceivedEmailNotification}
        />

        <NotificationToggleRow 
          notificationChannel={NotificationChannel.SMS}
          isToggled={isReceivedSMSNotification}
        />
      </div>
    </div>
  )
}