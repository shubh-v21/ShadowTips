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
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <p className="text-lg font-semibold mb-4">
        Enter your message for <span className="text-red-600">{username}</span>:
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="Write your message here"
                  {...field}
                  disabled={sendLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={sendLoading}>
            {sendLoading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>

      {/* Suggest Messages Button */}
      {disabled ? (
        <Button className="mt-4 bg-red-500 text-white" disabled>
          Limit Reached
        </Button>
      ) : (
        <Button onClick={greet} className="mt-4" disabled={suggestLoading}>
          {suggestLoading ? "Loading..." : "Suggest Messages"}
        </Button>
      )}

      {/* Suggested Messages */}
      <div className="border-gray-700 border-solid border-2 rounded-md mt-4 p-3 bg-slate-100">
        {suggestedMessages.length > 0 ? (
          suggestedMessages.map((message, index) => (
            <div
              key={index}
              onClick={() => copyToMessageArea(message)} // Pass the clicked message
              className="border border-gray-400 rounded-md p-2 m-2 bg-white cursor-pointer hover:bg-gray-200 transition"
            >
              {message}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No suggestions available.</p>
        )}
      </div>
    </div>
  );
};

export default SendMessage;
