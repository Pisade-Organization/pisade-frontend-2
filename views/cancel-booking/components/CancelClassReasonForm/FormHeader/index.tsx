import Title from "./Title";
import Subtitle from "./Subtitle";

export default function FormHeader({
  title, 
  subtitle
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="w-full flex flex-col gap-1">
      <Title title={title} />
      <Subtitle subtitle={subtitle}/>      
    </div>
  )
}