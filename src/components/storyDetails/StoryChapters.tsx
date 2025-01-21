import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type StoryChaptersProps = {
  chapters?: number;
  isLoggedIn: boolean;
  onReadChapter: (chapterNumber: number) => void;
};

export default function StoryChapters({
  chapters,
  isLoggedIn,
  onReadChapter,
}: StoryChaptersProps) {
  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold mb-4">Chapters</h2>
      {Array.from({ length: chapters }, (_, i) => i + 1).map((chapterNum) => (
        <Button
          className="w-full justify-start mb-2"
          key={chapterNum}
          onClick={() => onReadChapter(chapterNum)}
          variant="ghost"
        >
          Chapter {chapterNum}
          {isLoggedIn && chapterNum <= 2 && (
            <Badge className="ml-2" variant="secondary">
              Read
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
}
