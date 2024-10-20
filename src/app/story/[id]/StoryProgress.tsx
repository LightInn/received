import { Progress } from "@/components/ui/progress";

type StoryProgressProps = {
  currentChapter: number;
  totalChapters: number;
};

export default function StoryProgress({
  currentChapter,
  totalChapters,
}: StoryProgressProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span>Your Progress</span>
        <span>
          {currentChapter} / {totalChapters} chapters
        </span>
      </div>
      <Progress value={(currentChapter / totalChapters) * 100} />
    </div>
  );
}
