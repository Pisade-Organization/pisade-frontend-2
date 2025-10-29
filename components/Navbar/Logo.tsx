import { PisadeLogo, PisadeDarkLogo } from "../icons"

export default function Logo({ dark, onClick }: { dark?: boolean; onClick: () => void }) {
  const Comp = dark ? PisadeDarkLogo : PisadeLogo
  return (
    <Comp
      onClick={onClick}
      width={109}
      height={36}
      className="cursor-pointer"
      alt="Pisade Logo"
    />
  )
}


