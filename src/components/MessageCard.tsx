"use client";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Message } from "@/model/User";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { formatDistanceToNow } from "date-fns";


type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);
      onMessageDelete(message._id as string);
      toast({
        title: "Message deleted",
        description: "The message has been removed from your inbox.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-cyan-800/40 bg-slate-900/80 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-4 pt-4">
        <div className="border-l-4 border-cyan-500 pl-3 mb-3">
          <div className="text-xs text-cyan-400">
            {message.createdAt
              ? formatDistanceToNow(new Date(message.createdAt), {
                  addSuffix: true,
                })
              : "Time unknown"}
          </div>
        </div>
        <p className="text-cyan-100 font-medium mb-2">{message.content}</p>
      </CardContent>
      <CardFooter className="bg-slate-800/40 p-3 flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-slate-900 border-cyan-800/40">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-cyan-300">Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription className="text-cyan-100">
                Are you sure you want to delete this message? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border border-cyan-700/40 text-cyan-300 hover:bg-cyan-900/30">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-900/50 text-red-200 border border-red-700/50 hover:bg-red-800/60"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default MessageCard;
