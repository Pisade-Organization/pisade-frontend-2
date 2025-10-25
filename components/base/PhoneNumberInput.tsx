"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Typography from "./Typography";
import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { countryOptions, CountryOption } from "@/data/countryOptions";

export default function PhoneNumberInput({ required }: { required?: boolean }) {
  // Default to Thailand (TH) or first country if Thailand not found
  const defaultCountry = countryOptions.find(country => country.code === "TH") || countryOptions[0];
  const [selected, setSelected] = useState<CountryOption>(defaultCountry);
  const [phone, setPhone] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full flex flex-col justify-center items-start gap-1">
      {/* Label */}
      <div className="flex justify-start items-center gap-1">
        <Typography variant={{ base: "label-3", lg: "label-2" }} color="neutral-800">
          Phone Number
        </Typography>
        {required && (
          <Typography variant={{ base: "label-3", lg: "label-2" }} className="text-[#D9534F]">
            *
          </Typography>
        )}
      </div>

      {/* Input container */}
      <div className="w-full flex items-center gap-[10px] border border-neutral-50 rounded-[12px] py-3 px-4">
        {/* Country selector */}
        {/* Desktop Dropdown */}
        <div className="hidden lg:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1 transition-colors shrink-0"
              >
                <img src={selected.flag} alt={selected.name} className="w-4 h-3 rounded-sm shrink-0" />
                <Typography variant="body-3" color="neutral-800">{selected.dialCode}</Typography>
                <ChevronDown size={10} className="text-neutral-600 shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-full">
              {countryOptions.map((country) => (
                <DropdownMenuItem
                  key={country.code}
                  onClick={() => setSelected(country)}
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                >
                  <img src={country.flag} alt={country.name} className="w-5 h-4 rounded-sm" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-neutral-800">{country.name}</span>
                    <span className="text-xs text-neutral-500">{country.dialCode}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Button */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex items-center gap-1 transition-colors shrink-0"
          >
            <img src={selected.flag} alt={selected.name} className="w-4 h-3 rounded-sm shrink-0" />
            <Typography variant="body-3" color="neutral-800">{selected.dialCode}</Typography>
            <ChevronDown size={10} className="text-neutral-600 shrink-0" />
          </button>
        </div>

        {/* Phone input */}
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
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
                {countryOptions.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setSelected(country);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-lg border transition-colors ",
                      selected.code === country.code
                        ? "border-blue-500 bg-blue-50"
                        : "border-neutral-100 hover:bg-neutral-50"
                    )}
                  >
                    <img src={country.flag} alt={country.name} className="w-8 h-6 rounded-sm" />
                    <div className="flex flex-col items-start">
                      <Typography variant={{ base: "body-2", lg: "body-1" }} color="neutral-800">
                        {country.name}
                      </Typography>
                      <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-500">
                        {country.dialCode}
                      </Typography>
                    </div>
                    {selected.code === country.code && (
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
  );
}
