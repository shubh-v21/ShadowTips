import React from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CustomSelect } from "@/components/ui/custom-select";

export type MessageTone = "neutral" | "mysterious" | "cryptic" | "friendly" | "philosophical";
export type MessageTopic = "digital" | "future" | "society" | "personal" | "abstract";
export type MessageNiche = "cybersecurity" | "ai" | "digital-identity" | "virtual-reality" | "tech-ethics";

interface MessageGeneratorParamsProps {
  tone: MessageTone;
  setTone: (tone: MessageTone) => void;
  topic: MessageTopic;
  setTopic: (topic: MessageTopic) => void;
  niche: MessageNiche;
  setNiche: (niche: MessageNiche) => void;
  showParams: boolean;
  setShowParams: (show: boolean) => void;
}

const MessageGeneratorParams: React.FC<MessageGeneratorParamsProps> = ({
  tone,
  setTone,
  topic,
  setTopic,
  niche,
  setNiche,
  showParams,
  setShowParams
}) => {
  // Map of tone options
  const toneOptions: { value: MessageTone; label: string }[] = [
    { value: "neutral", label: "Neutral" },
    { value: "mysterious", label: "Mysterious" },
    { value: "cryptic", label: "Cryptic" },
    { value: "friendly", label: "Friendly" },
    { value: "philosophical", label: "Philosophical" }
  ];

  // Topic options
  const topicOptions = [
    { value: "digital", label: "Digital World" },
    { value: "future", label: "Future Vision" },
    { value: "society", label: "Network Society" },
    { value: "personal", label: "Digital Self" },
    { value: "abstract", label: "Abstract Concepts" }
  ];

  // Niche options
  const nicheOptions = [
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "ai", label: "Artificial Intelligence" },
    { value: "digital-identity", label: "Digital Identity" },
    { value: "virtual-reality", label: "Virtual Reality" },
    { value: "tech-ethics", label: "Tech Ethics" }
  ];

  return (
    <Card className="bg-slate-900/90 border-cyan-800/50 mb-4">
      <CardContent className="p-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-cyan-300 font-medium">Message Parameters</h3>
          <button
            onClick={() => setShowParams(!showParams)}
            className="text-xs text-cyan-400 hover:text-cyan-300"
          >
            {showParams ? "Hide Options" : "Show Options"}
          </button>
        </div>
        
        {showParams && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div>
              <Label className="text-cyan-400 mb-2 block">Transmission Tone</Label>
              <div className="flex flex-wrap gap-2">
                {toneOptions.map((option) => (
                  <Badge
                    key={option.value}
                    variant="cyberpunk"
                    active={tone === option.value}
                    clickable
                    onClick={() => setTone(option.value as MessageTone)}
                    className="text-sm py-1"
                  >
                    {option.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <CustomSelect
                label="Topic Domain"
                options={topicOptions}
                value={topic}
                onChange={(e) => setTopic(e.target.value as MessageTopic)}
              />
            </div>

            <div>
              <CustomSelect
                label="Tech Niche"
                options={nicheOptions}
                value={niche}
                onChange={(e) => setNiche(e.target.value as MessageNiche)}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MessageGeneratorParams;
