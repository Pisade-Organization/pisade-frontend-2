import SocialNetworkRow from "./SocialNetworkRow"
import SectionHeader from "../../../fields/SectionHeader";

export default function SocialNetworkSection() {
  const handleFacebookConnect = () => {
    console.log("Connecting Facebook...");
  };

  const handleFacebookDisconnect = () => {
    console.log("Disconnecting Facebook...");
  };

  const handleGoogleConnect = () => {
    console.log("Connecting Google...");
  };

  const handleGoogleDisconnect = () => {
    console.log("Disconnecting Google...");
  };

  return (
    <div className="w-full flex flex-col gap-2 lg:gap-4 lg:py-8 lg:px-12 bg-white">

      <SectionHeader title="Social networks"/>

      <div className="w-full flex flex-col gap-3 lg:gap-4">
        <SocialNetworkRow
          provider="facebook"
          connected={false}
          onConnect={handleFacebookConnect}
          onDisconnect={handleFacebookDisconnect}
        />
        <SocialNetworkRow
          provider="google"
          connected={true}
          displayName="Somchai Degrey"
          onConnect={handleGoogleConnect}
          onDisconnect={handleGoogleDisconnect}
        />
      </div>
    </div>
  )
}