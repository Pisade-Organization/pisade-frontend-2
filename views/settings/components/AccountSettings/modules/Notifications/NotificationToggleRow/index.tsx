import { NotificationChannel } from "../types"
import { Mail, MessageSquareMore } from "lucide-react";
import Typography from "@/components/base/Typography";
import { BaseSwitch } from "@/components/base/Switch";

interface NotificationToggleRowI {
  notificationChannel: NotificationChannel;
  isToggled: boolean;
}

export default function NotificationToggleRow({
  notificationChannel,
  isToggled
}: NotificationToggleRowI) {
  return (
    <div className="w-full flex justify-between items-center gap-4">

      { notificationChannel === NotificationChannel.EMAIL && (
        <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-neutral-300"/>
      )}

      { notificationChannel === NotificationChannel.SMS && (
        <MessageSquareMore className="w-5 h-5 lg:w-6 lg:h-6 text-neutral-300" />
      )}

      <div className="w-full flex flex-col">
        <Typography variant={{ base: "label-3", lg: "label-2" }} color="neutral-500">
          { notificationChannel === NotificationChannel.EMAIL ? "Email" : "SMS"} notifications
        </Typography>

        <Typography variant={{ base: "body-4", lg: "body-3" }} color="neutral-400">
          Receive updates via { notificationChannel === NotificationChannel.EMAIL ? "Email" : "text messages" }
        </Typography>
      </div>

      <BaseSwitch defaultChecked={isToggled} />




    </div>
  )
}