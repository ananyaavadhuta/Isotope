import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Video, Mic, StopCircle, Play, Save, Loader2, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface VideoResumeRecorderProps {
    currentVideoUrl?: string | null;
    onVideoSaved: (url: string) => void;
}

const VideoResumeRecorder = ({ currentVideoUrl, onVideoSaved }: VideoResumeRecorderProps) => {
    const { toast } = useToast();
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(currentVideoUrl || null);
    const [isUploading, setIsUploading] = useState(false);
    const [timer, setTimer] = useState(0);
    const [uploadFile, setUploadFile] = useState<File | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const videoPreviewRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            if (mediaBlobUrl && mediaBlobUrl.startsWith('blob:')) {
                URL.revokeObjectURL(mediaBlobUrl);
            }
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            streamRef.current = stream;

            if (videoPreviewRef.current) {
                videoPreviewRef.current.srcObject = stream;
            }

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            const chunks: Blob[] = [];
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: "video/webm" });
                const url = URL.createObjectURL(blob);
                setMediaBlobUrl(url);
                setRecordedChunks(chunks);
                setUploadFile(null); // Clear manual upload

                stream.getTracks().forEach(track => track.stop());
                if (videoPreviewRef.current) {
                    videoPreviewRef.current.srcObject = null;
                }
            };

            mediaRecorder.start();
            setIsRecording(true);
            setTimer(0);

            timerRef.current = window.setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);

        } catch (error) {
            console.error("Error accessing media devices:", error);
            toast({
                title: "Permission Denied",
                description: "Could not access camera/microphone. Please check permissions.",
                variant: "destructive"
            });
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    };

    const resetRecording = () => {
        setMediaBlobUrl(null);
        setRecordedChunks([]);
        setUploadFile(null);
        if (currentVideoUrl) {
            setMediaBlobUrl(currentVideoUrl);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 50 * 1024 * 1024) { // 50MB limit
                toast({
                    title: "File too large",
                    description: "Please upload a video smaller than 50MB.",
                    variant: "destructive"
                });
                return;
            }
            const url = URL.createObjectURL(file);
            setMediaBlobUrl(url);
            setUploadFile(file);
            setRecordedChunks([]); // Clear recording
        }
    };

    const saveRecording = async () => {
        if (!recordedChunks.length && !uploadFile) return;

        setIsUploading(true);
        try {
            let fileToUpload: File;

            if (uploadFile) {
                fileToUpload = uploadFile;
            } else {
                const blob = new Blob(recordedChunks, { type: "video/webm" });
                fileToUpload = new File([blob], "resume.webm", { type: "video/webm" });
            }

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("User not found");

            const fileName = `${user.id}/${Date.now()}_resume.${fileToUpload.name.split('.').pop() || 'webm'}`;

            const { error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(fileName, fileToUpload, {
                    upsert: true
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('resumes')
                .getPublicUrl(fileName);

            const { error: dbError } = await supabase
                .from('profiles')
                .update({ video_resume_url: publicUrl } as any)
                .eq('id', user.id);

            if (dbError) throw dbError;

            toast({
                title: "Video Resume Saved",
                description: "Your video introduction has been uploaded successfully.",
            });

            onVideoSaved(publicUrl);

        } catch (error: any) {
            console.error(error);
            toast({
                title: "Error saving video",
                description: error.message || "Failed to upload video.",
                variant: "destructive"
            });
        } finally {
            setIsUploading(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl border border-border bg-black/50 aspect-video flex items-center justify-center group">
                {isRecording ? (
                    <video ref={videoPreviewRef} autoPlay muted className="h-full w-full object-cover" />
                ) : mediaBlobUrl ? (
                    <video src={mediaBlobUrl} controls className="h-full w-full object-cover" />
                ) : (
                    <div className="text-center p-6">
                        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <Video className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">Record a Video Intro</h3>
                        <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">
                            Stand out to employers with a 60-second personal pitch.
                        </p>
                    </div>
                )}

                {isRecording && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-destructive/90 px-3 py-1 text-xs font-medium text-white animate-pulse">
                        <div className="h-2 w-2 rounded-full bg-white" />
                        REC {formatTime(timer)}
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {!isRecording && !mediaBlobUrl && (
                        <>
                            <Button onClick={startRecording} className="gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500" />
                                Start Recording
                            </Button>
                            <span className="text-sm text-muted-foreground">or</span>
                            <div className="relative">
                                <Button variant="outline" className="gap-2 cursor-pointer">
                                    <Upload className="h-4 w-4" />
                                    Upload Video
                                </Button>
                                <Input
                                    type="file"
                                    accept="video/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleFileUpload}
                                />
                            </div>
                        </>
                    )}

                    {isRecording && (
                        <Button onClick={stopRecording} variant="destructive" className="gap-2">
                            <StopCircle className="h-4 w-4" />
                            Stop Recording
                        </Button>
                    )}

                    {!isRecording && mediaBlobUrl && (
                        <>
                            <Button onClick={resetRecording} variant="outline" className="gap-2" disabled={isUploading}>
                                <Trash2 className="h-4 w-4" />
                                Retake
                            </Button>
                            <Button onClick={saveRecording} className="gap-2 glow-primary" disabled={isUploading}>
                                {isUploading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Save className="h-4 w-4" />
                                )}
                                {isUploading ? "Uploading..." : "Save Video"}
                            </Button>
                        </>
                    )}
                </div>
                {uploadFile && (
                    <p className="text-xs text-muted-foreground">
                        Ready to upload: {uploadFile.name}
                    </p>
                )}
            </div>

            <div className="text-center text-xs text-muted-foreground mt-4">
                <p>Tips: Good lighting, clear audio, keep it under 60 seconds.</p>
            </div>
        </div>
    );
};

export default VideoResumeRecorder;
