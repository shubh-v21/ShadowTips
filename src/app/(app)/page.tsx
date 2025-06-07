'use client';


import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
import Logo from '@/components/Logo';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default function Home() {
  return (
    <>
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gradient-to-b from-slate-900 via-slate-900 to-gray-950 text-cyan-50">
        <section className="text-center mb-8 md:mb-12 max-w-3xl">
          <Logo size="lg" />
          <h1 className="text-3xl md:text-5xl font-bold mt-6 cyberpunk-glow text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Digital Anonymity Protocol
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-cyan-300">
            Where your identity remains encrypted in the shadows.
          </p>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card className="border-cyan-800/40 bg-slate-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0 text-cyan-500" />
                    <div>
                      <p className="text-cyan-100">{message.content}</p>
                      <p className="text-xs text-cyan-500/70 mt-2">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-gray-950 text-cyan-400 border-t border-cyan-900/30">
        © 2025 SHADOWTIPS. All digital rights secured.
      </footer>
    </>
  );
}