import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type StoryChaptersProps = {
  chapters: number;
  onReadChapter: (chapterNumber: number) => void;
  isLoggedIn: boolean;
};

export default function StoryChapters({
  chapters,
  onReadChapter,
  isLoggedIn,
}: StoryChaptersProps) {
  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold mb-4">Chapters</h2>
      {Array.from({ length: chapters }, (_, i) => i + 1).map((chapterNum) => (
        <Button
          key={chapterNum}
          variant="ghost"
          className="w-full justify-start mb-2"
          onClick={() => onReadChapter(chapterNum)}
        >
          Chapter {chapterNum}
          {isLoggedIn && chapterNum <= 2 && (
            <Badge variant="secondary" className="ml-2">
              Read
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
}
