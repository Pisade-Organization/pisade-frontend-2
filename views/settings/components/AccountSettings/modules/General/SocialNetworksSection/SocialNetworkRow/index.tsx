import BaseButton from "@/components/base/BaseButton"
import type { SocialNetworkRowProps } from "./types"
import { GoogleIcon, FacebookSolidIcon } from "@/components/icons";
import Typography from "@/components/base/Typography";

const PROVIDER_ICONS: Record<SocialNetworkRowProps["provider"], React.ElementType> = {
  google: GoogleIcon,
  facebook: FacebookSolidIcon,
};

export default function SocialNetworkRow({
  provider,
  connected,
  displayName,
  loading,
  onConnect,
  onDisconnect,
}: SocialNetworkRowProps) {
  const Icon = PROVIDER_ICONS[provider];

  return (
    <div className="w-full flex justify-start items-center gap-4">

      <Icon width={24} height={24} className="w-6 h-6 lg:w-[30px] lg:h-[30px]" />
      
      <div className="w-full text-left">
        <Typography variant={{ base: "body-3" }} color="neutral-700">
          {connected ? displayName : "Not connected"}
        </Typography>
      </div>

      <BaseButton variant="secondary" typeStyle="outline">
        {connected ? "Disconnect" : "Connect"}
      </BaseButton>

    </div>
  );
}