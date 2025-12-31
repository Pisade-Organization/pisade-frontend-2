"use client"
import { useState } from "react"
import SectionHeader from "../../../fields/SectionHeader"
import BaseButton from "@/components/base/BaseButton"
import BaseInput from "@/components/base/BaseInput"
import { Pencil } from "lucide-react"
import InfoRow from "../../../fields/InfoRow"

interface TeachingInfoSectionI {
  subject: string;
  languages: string;
}

export default function TeachingInfoSection({
  subject,
  languages,
}: TeachingInfoSectionI) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [subjectValue, setSubjectValue] = useState<string>(subject);
  const [languagesValue, setLanguagesValue] = useState<string>(languages);

  const handleSave = () => {
    // Mock save function - replace with actual API call
    console.log("Saving teaching info:", {
      subject: subjectValue,
      languages: languagesValue,
    });

    // Here you would typically call an API to save the data
    // Example:
    // await updateTeachingInfo({
    //   subject: subjectValue,
    //   languages: languagesValue,
    // });

    // For now, just toggle editing mode off
    setIsEditing(false);
  };

  return (
    <div className="w-full flex flex-col gap-5 lg:gap-4 lg:px-12 lg:py-8">
      <SectionHeader
          title="Teaching Info"
          action={
            isEditing ? (
              <BaseButton variant="primary" onClick={handleSave}>
                Save Changes
              </BaseButton>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-full flex justify-center items-center bg-white w-10 h-10 border-[1.5px] border-neutral-50"
              >
                <Pencil className="w-5 h-5 text-neutral-600" />
              </button>
            )
          }
        />

        {isEditing ? (
          <BaseInput 
            title="Subject you teach"
            value={subjectValue}
            onChange={(e) => setSubjectValue(e.target.value)}
            placeholder="Enter subject"
          />
        ) : (
          <InfoRow 
            label="Subject you teach"
            value={subjectValue}
          />
        )}

        {isEditing ? (
          <BaseInput 
            title="Language"
            value={languagesValue}
            onChange={(e) => setLanguagesValue(e.target.value)}
            placeholder="Enter languages"
          />
        ) : (
          <InfoRow 
            label="Language"
            value={languagesValue}
          />
        )}
    </div>
  )
}