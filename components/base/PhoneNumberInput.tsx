import { cn } from "@/lib/utils"
import { CountryOption, countryOptions } from "@/data/countryOptions"
import Typography from "./Typography"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "../ui/dropdown-menu"
import Image from "next/image"
import { ChevronDown, X } from "lucide-react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
export default function PhoneNumberInput({
  required = false,
  phoneNumber,
  setPhoneNumber,
  country,
  setCountry

}: {
  required?: boolean
  phoneNumber: string
  setPhoneNumber: (phoneNumber: string) => void;
  country: CountryOption;
  setCountry: (country: CountryOption) => void;
}) {
  const defaultCountry = countryOptions.find(country => country.code === "TH") || countryOptions[0];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="mb-1  w-full flex flex-col gap-1">
      <div className="flex justify-start items-center gap-1">
          <Typography variant={{ base: "label-3", lg: "label-2" }} color="neutral-800">
              Phone Number
          </Typography>

          { required && (
              <Typography variant={{ base: "label-3", lg: "label-2" }} className="text-[#D9534F]">
                  *
              </Typography>
          )}
      </div>

      <div className="w-full flex justify-start items-center gap-1 py-[10.5px] px-4 rounded-[12px] border border-neutral-50">
        <DropdownMenu>
          <DropdownMenuTrigger className="hidden lg:flex justify-center items-center gap-1">

              {country?.flag ? (
                <Image 
                  src={country.flag}
                  alt={`${country.name} Flag`}
                  width={24}
                  height={24}
                />
              ) : null}
              <div className="w-6 h-6 flex justify-center items-center">
                <ChevronDown size={15} className="text-neutral-800"/>
              </div>

          </DropdownMenuTrigger>

          <DropdownMenuContent align="start">
            {countryOptions.map((mappedCountry) => (
              <DropdownMenuItem
                key={country.code}
                onClick={() => setCountry(mappedCountry)}
                className="flex items-center gap-3 px-3 py-2 cursor-pointer"
              >
                <img src={mappedCountry.flag} alt={mappedCountry.name} className="w-4 h-3 rounded-sm shrink-0" />
                <Typography variant="body-3" color="neutral-800">{mappedCountry.dialCode}</Typography>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button className="lg:hidden flex justify-center items-center gap-1"
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          {country?.flag ? (
                <Image 
                  src={country.flag}
                  alt={`${country.name} Flag`}
                  width={24}
                  height={24}
                />
              ) : null}
              <div className="w-6 h-6 flex justify-center items-center">
                <ChevronDown size={15} className="text-neutral-800"/>
              </div>
        </button>
        
        <Typography variant="body-3" color="neutral-300">
          { country.dialCode }
        </Typography>

        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder=""
          className={cn(
            "flex-1 outline-none text-body-3 text-neutral-700 placeholder:text-neutral-300 bg-transparent placeholder:text-body-3"
          )}
        />

      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white flex flex-col"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-neutral-100">
              <Typography variant={{ base: "headline-4", lg: "headline-3" }} color="neutral-800">
                Select Country
              </Typography>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-neutral-50 rounded-md transition-colors"
              >
                <X size={20} className="text-neutral-600" />
              </button>
            </div>

            {/* Country List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {countryOptions.map((mappedCountry) => (
                  <button
                    key={mappedCountry.code}
                    onClick={() => {
                      setCountry(country);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-lg border transition-colors",
                      country.code === mappedCountry.code
                        ? "border-blue-500 bg-blue-50"
                        : "border-neutral-100 hover:bg-neutral-50"
                    )}
                  >
                    <img src={mappedCountry.flag} alt={mappedCountry.name} className="w-8 h-6 rounded-sm" />
                    <div className="flex flex-col items-start">
                      <Typography variant={{ base: "body-2", lg: "body-1" }} color="neutral-800">
                        {mappedCountry.name}
                      </Typography>
                      <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-500">
                        {mappedCountry.dialCode}
                      </Typography>
                    </div>
                    {country.code === mappedCountry.code && (
                      <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}