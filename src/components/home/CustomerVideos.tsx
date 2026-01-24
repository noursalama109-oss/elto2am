import { Play, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef } from 'react';

interface VideoItem {
  id: number;
  src: string;
  title: string;
  description: string;
}

const videos: VideoItem[] = [
  {
    id: 1,
    src: '/videos/customer-video-1.mp4',
    title: 'تجربة تركيب قطعة',
    description: 'قطعة غيار أصلية مركبة وتعمل بكفاءة عالية',
  },
  {
    id: 2,
    src: '/videos/customer-video-2.mp4',
    title: 'تجربة عميل',
    description: 'شاهد جودة القطع وأدائها الممتاز',
  },
];

const VideoCard = ({ video }: { video: VideoItem }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-card transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      {/* Video Container */}
      <div 
        className="relative aspect-[9/16] cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={video.src}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          onEnded={() => setIsPlaying(false)}
        />
        
        {/* Play Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-glow transition-transform group-hover:scale-110">
              <Play className="w-8 h-8 text-primary-foreground fill-current mr-[-2px]" />
            </div>
          </div>
        )}

        {/* Mute Button */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        )}

        {/* Video Badge */}
        <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
          فيديو حقيقي
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{video.title}</h3>
        <p className="text-muted-foreground text-sm">{video.description}</p>
      </div>
    </div>
  );
};

const CustomerVideos = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary text-sm font-medium">دليل اجتماعي</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">تجربة عملائنا</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            شاهد القطع وهي مركبة وتعمل بكفاءة عالية - دليل حقيقي على جودة منتجاتنا
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm">
            ✨ فيديوهات حقيقية من عملائنا - شاركنا تجربتك عبر الواتساب
          </p>
        </div>
      </div>
    </section>
  );
};

export default CustomerVideos;
