import { useState } from "react";
import { MonitorArrowUp } from "@phosphor-icons/react/dist/ssr";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useUsers from "@/hooks/useUsers";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";

export default function AddVideoButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const { addVideoForUser } = useUsers();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="transition-colors text-xs h-6 rounded-full flex items-center justify-center bg-neutrals-13 hover:bg-neutrals-11 px-3 text-primary-foreground">
          <MonitorArrowUp
            weight="bold"
            size={12}
            className="mr-0 sm:mr-1.5 text-white"
          />
          <span className="hidden sm:block">Add video link</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add a video</DialogTitle>
        <Input
          placeholder="https://youtube.com..."
          value={videoLink}
          onChange={async (e) => {
            setVideoLink(e.target.value);
          }}
        />
        <DialogFooter>
          <Button
            fullWidth={true}
            animated={true}
            className="w-full"
            onClick={async () => {
              setLoading(true);

              // validate that it is a valid video link

              // make a request
              const response = await addVideoForUser(videoLink);

              // invalidate a query for the user's videos
              await queryClient.invalidateQueries({ queryKey: ["videos"] });

              // close the dialog
              setOpen(false);

              // show a success toast
              toast({
                title: "Video clipped",
                description: "Your video is being processed now.",
              });

              setLoading(false);
            }}
          >
            {loading ? "Clipping..." : "Clip video"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
