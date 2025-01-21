import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export default function StoryComments() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((commentId) => (
            <div className="flex space-x-4" key={commentId}>
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=User${commentId}`}
                />
                <AvatarFallback>U{commentId}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">User{commentId}</p>
                <p className="text-sm text-muted-foreground">
                  Great story! Can't wait for the next chapter.
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <MessageCircle className="mr-2 h-4 w-4" /> Add Comment
        </Button>
      </CardFooter>
    </Card>
  );
}
