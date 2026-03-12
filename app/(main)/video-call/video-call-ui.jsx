"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Loader2, PhoneOff } from "lucide-react";
import { toast } from "sonner";

export default function VideoCall({ roomName, userName, appointmentId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const jitsiContainerRef = useRef(null);
  const jitsiApiRef = useRef(null);
  const router = useRouter();

  // Handle script load
  const handleScriptLoad = () => {
    setScriptLoaded(true);
    initializeJitsi();
  };

  // Initialize Jitsi Meet
  const initializeJitsi = () => {
    if (!roomName) {
      toast.error("Missing room name for the video call");
      router.push("/appointments");
      return;
    }

    try {
      const domain = "meet.jit.si";
      const options = {
        roomName: roomName,
        width: "100%",
        height: "100%",
        parentNode: jitsiContainerRef.current,
        userInfo: {
          displayName: userName || "Participant",
        },
        configOverwrite: {
          startWithAudioMuted: false,
          disableModeratorIndicator: true,
          startScreenSharing: false,
          enableEmailInStats: false,
        },
        interfaceConfigOverwrite: {
          // You can customize the buttons here
          TOOLBAR_BUTTONS: [
            "microphone",
            "camera",
            "closedcaptions",
            "desktop",
            "fullscreen",
            "fodeviceselection",
            "hangup",
            "profile",
            "chat",
            "recording",
            "livestreaming",
            "etherpad",
            "sharedvideo",
            "settings",
            "raisehand",
            "videoquality",
            "filmstrip",
            "invite",
            "feedback",
            "stats",
            "shortcuts",
            "tileview",
            "videobackgroundblur",
            "download",
            "help",
            "mute-everyone",
            "security",
          ],
        },
      };

      jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);

      jitsiApiRef.current.addEventListeners({
        readyToClose: () => {
          handleEndCall();
        },
        videoConferenceLeft: () => {
          handleEndCall();
        },
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Jitsi initialization error:", error);
      toast.error("Failed to initialize video call");
      setIsLoading(false);
    }
  };

  const handleEndCall = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.dispose();
    }
    router.push("/appointments");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
      }
    };
  }, []);

  return (
    <>
      <Script
        src="https://meet.jit.si/external_api.js"
        onLoad={handleScriptLoad}
        onError={() => {
          toast.error("Failed to load video call script");
          setIsLoading(false);
        }}
      />

      <div className="container mx-auto px-4 py-8 h-[calc(100vh-120px)] flex flex-col">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            Video Consultation
          </h1>
          <p className="text-muted-foreground">
            {isLoading ? "Preparing secure connection..." : "Secure Consultation in Progress"}
          </p>
        </div>

        <div className="flex-1 w-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-emerald-900/20 relative">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-50">
              <Loader2 className="h-12 w-12 text-emerald-400 animate-spin mb-4" />
              <p className="text-white text-lg">Connecting to consultation room...</p>
            </div>
          )}
          
          <div ref={jitsiContainerRef} className="w-full h-full" />
        </div>

        <div className="mt-6 flex justify-center">
            <Button 
                variant="destructive" 
                size="lg" 
                onClick={handleEndCall}
                className="bg-red-600 hover:bg-red-700 font-semibold px-8"
            >
                <PhoneOff className="mr-2 h-5 w-5" />
                End Consultation
            </Button>
        </div>
      </div>
    </>
  );
}
