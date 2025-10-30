import Typography from "@/components/base/Typography"



export default function Title({
  step
}: {
  step: number
}) {
  const data: any = {
    1: {
      title: "Tell Us About Yourself",
      description: "Just a few details to get started!"
    },
    
    2: {
      title: "Set Up Your Avatar",
      description: "Choose a photo that will help learners get to know you."
    },

    3: {
      title: "Certification",
      description: "Add your teaching certificates to strengthen your profile."
    },

    4: {
      title: "Education",
      description: "Add your higher education that you've completed or are working on."
    },

    5: {
      title: "Add Your Bio",
      description: "This info will go on your public profile. Write it in the language you'll be teaching."
    },

    6: {
      title: "Upload Your Video Introduction",
      description: "Introduce yourself to students in the same language as your written description."
    },

    7: {
      title: "Set Your Availability",
      description: "A correct timezone is essential to coordinate lessons with international students."
    },

    8: {
      title: "Pricing",
      description: "Make your classes worth your time."
    },
    
    9: {
      title: "Verify your identity",
      description: "Almost done! Just verify your ID or passport to complete your profile"
    }
  }
  return (
    <div className="flex flex-col justify-center items-start gap-1">
      <Typography variant="label-3" color="electric-violet-300">
        STEP {step}/9
      </Typography>

      <h4 className="text-headline-4 text-neutral-900">
        {data[step].title}
      </h4>

      <p className="text-body-2 text-neutral-500">
        {data[step].description}
      </p>

    </div>
  )
}