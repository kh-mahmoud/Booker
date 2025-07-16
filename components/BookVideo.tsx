import config from "@/lib/config";
import { ImageKitProvider, Video } from "@imagekit/next";

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl">
      <ImageKitProvider urlEndpoint={config.env.imageKit.endpointUrl}>
          <Video src={videoUrl} controls />
      </ImageKitProvider>
    </div>
  );
};

export default BookVideo;
