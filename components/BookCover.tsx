import { cn } from "@/lib/utils";
import BookCoverSvg from "./BookCoverSvg";
import { ImageKitProvider, Image as KitImage } from "@imagekit/next";
import config from "@/lib/config";

type BookVariant =
  | "small"
  | "medium"
  | "large"
  | "extraSmall"
  | "wide"
  | "regular";

type Props = {
  coverColor: string;
  coverUrl: string;
  classes?: string;
  variant?: BookVariant;
};

const BookCover = ({
  coverColor = "#012B48",
  coverUrl = "https://placehold.co/400x600.png",
  classes,
  variant = "regular",
}: Props) => {
  const variantStyle = {
    extraSmall: "book-cover_extra_small",
    small: "book-cover_small",
    medium: "book-cover_medium",
    large: "book-cover_large",
    wide: "book-cover_wide",
    regular: "book-cover_regular",
  };

  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyle[variant],
        classes
      )}
    >
      <BookCoverSvg coverColor={coverColor} />

      <div className="absolute overflow-hidden z-10 left-[12%] w-[87.1%] h-[87.3%] ">

        <ImageKitProvider urlEndpoint={config.env.imageKit.endpointUrl}>
          <KitImage
            src={coverUrl}
            width={500}
            className="object-fill rounded-sm"
            height={500}
            alt="Book cover"
            loading="lazy"
          />
        </ImageKitProvider>
      </div>
    </div>
  );
};

export default BookCover;
