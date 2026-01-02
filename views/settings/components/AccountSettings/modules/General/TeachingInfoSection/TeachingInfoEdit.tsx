import BaseInput from "@/components/base/BaseInput"
import BaseButton from "@/components/base/BaseButton"

interface TeachingInfoEditI {
  subject: string;
  setSubject: (value: string) => void;
  languages: string;
  setLanguages: (value: string) => void;
  onSave: () => void;
}

export default function TeachingInfoEdit({
  subject,
  setSubject,
  languages,
  setLanguages,
  onSave,
}: TeachingInfoEditI) {
  return (
    <div className="w-full flex flex-col gap-4">
      <BaseInput 
        title="Subject you teach"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Enter subject"
      />

      <BaseInput 
        title="Language"
        value={languages}
        onChange={(e) => setLanguages(e.target.value)}
        placeholder="Enter languages"
      />

      <BaseButton
        variant="primary"
        onClick={onSave}
        className="lg:hidden w-full"
      >
        Save Changes
      </BaseButton>
    </div>
  )
}

