"use client"
import { useState } from "react"
import TeachingInfoHeader from "./TeachingInfoHeader"
import TeachingInfoView from "./TeachingInfoView"
import TeachingInfoEdit from "./TeachingInfoEdit"

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
    <div className="bg-white w-full flex flex-col gap-5 lg:gap-4 lg:px-12 lg:py-8 rounded-t-2xl">
      <TeachingInfoHeader 
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onSave={handleSave}
      />

      {isEditing ? (
        <TeachingInfoEdit
          subject={subjectValue}
          setSubject={setSubjectValue}
          languages={languagesValue}
          setLanguages={setLanguagesValue}
          onSave={handleSave}
        />
      ) : (
        <TeachingInfoView
          subject={subjectValue}
          languages={languagesValue}
        />
      )}
    </div>
  )
}