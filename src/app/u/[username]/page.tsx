"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SendMessage = () => {
  const { username } = useParams<{ username: string }>();
  const { toast } = useToast();
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);
  const [sendLoading, setSendLoading] = useState(false);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const disabledUntil = localStorage.getItem("buttonDisabledUntil");
    if (disabledUntil && Date.now() < Number(disabledUntil)) {
      setDisabled(true);
    }
  }, []);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      setSendLoading(true);
      const response = await axios.post(`/api/send-message`, {
        username,
        content: data.content,
      });

      toast({
        title: "Message sent successfully",
        description: response.data.message,
      });

      form.reset(); // Clear input after sending
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error sending message",
        description: axiosError.response?.data.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setSendLoading(false);
    }
  };

  const greet = useCallback(async () => {
    try {
      setSuggestLoading(true);
      const response = await axios.post("/api/suggest-messages");
      console.log(response);

      const message = response.data.message;
      const messageArray = message.split("||");
      setSuggestedMessages(messageArray);

      if (response.data.disabled) {
        setDisabled(true);
        localStorage.setItem(
          "buttonDisabledUntil",
          (Date.now() + 60 * 60 * 1000).toString()
        );
      }
    } catch (error) {
      console.log(error);

      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error fetching suggestions",
        description: axiosError.response?.data.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setSuggestLoading(false);
    }
  }, []);

  const copyToMessageArea = (message: string) => {
    form.setValue("content", message); // Set clicked message in the input field
  };

  return (
    <div className="p-6 md:p-8 bg-slate-900/80 rounded-lg shadow-lg border border-cyan-800/40 max-w-lg mx-auto my-8 backdrop-blur-sm">
      <p className="text-lg font-semibold mb-4 text-cyan-300">
        Send message to{" "}
        <span className="text-cyan-400 font-bold">{username}</span>:
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="Write your anonymous message"
                  {...field}
                  disabled={sendLoading}
                  className="border-cyan-700/40"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={sendLoading}
            variant="cyberpunk"
            className="w-full"
          >
            {sendLoading ? "Transmitting..." : "Send Message"}
          </Button>
        </form>
      </Form>

      {/* Suggest Messages Button */}
      {disabled ? (
        <Button
          className="mt-4 bg-red-900/30 text-red-300 border border-red-500/50 w-full"
          disabled
        >
          Transmission Limit Reached
        </Button>
      ) : (
        <Button
          onClick={greet}
          className="mt-4 w-full"
          disabled={suggestLoading}
          variant="outline"
        >
          {suggestLoading ? "Processing..." : "Generate Suggestions"}
        </Button>
      )}

      {/* Suggested Messages */}
      <div className="border-cyan-800/40 border rounded-md mt-4 p-3 bg-slate-800/40">
        <h3 className="text-cyan-400 mb-2 font-medium">Suggestion Matrix</h3>
        {suggestedMessages.length > 0 ? (
          suggestedMessages.map((message, index) => (
            <div
              key={index}
              onClick={() => copyToMessageArea(message)}
              className="border border-cyan-800/30 rounded-md p-2 m-2 bg-slate-900/60 cursor-pointer hover:bg-slate-800/60 transition text-cyan-100 hover:border-cyan-600/50"
            >
              {message}
            </div>
          ))
        ) : (
          <p className="text-slate-400 px-2 py-1">
            No suggestions available. Generate some first.
          </p>
        )}
      </div>
    </div>
  );
};

export default SendMessage;
