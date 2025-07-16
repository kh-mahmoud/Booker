"use client";

import config from "@/lib/config";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  Image as KitImage,
  ImageKitProvider,
  Video,
} from "@imagekit/next";
import { useRef, useState } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  onchange: (url: string | undefined) => void;
  type: "video" | "image";
  folder: string
};

const FileUpload = ({ onchange, type,folder }: Props) => {
  const [progress, setProgress] = useState(0);
  const [hideProgress, setHideProgress] = useState(true);

  const [file, setFile] = useState<Record<string, string | undefined>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const abortController = new AbortController();

  /**
   * Authenticates and retrieves the necessary upload credentials from the server.
   *
   * This function calls the authentication API endpoint to receive upload parameters like signature,
   * expire time, token, and publicKey.
   *
   * @returns {Promise<{signature: string, expire: string, token: string, publicKey: string}>} The authentication parameters.
   * @throws {Error} Throws an error if the authentication request fails.
   */

  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch(`${config.env.apiEndpoint}/api/upload-auth`);
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      toast.error("File Upload Failed", {
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
      throw new Error("Authentication request failed");
    }
  };

  const onValidate = async (file: File) => {
    if (type == "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast.error(`File size is too large`, {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
        return false;
      }
    } else if (type == "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast.error(`File size is too large`, {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
        return false;
      }
    }

    return true;
  };

  const handleUpload = async () => {
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      toast.error(`You have to select  ${type} `, {
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
      return;
    }

    // Extract the first file from the file input
    const file = fileInput.files[0];

    //validate File
    const isValid = await onValidate(file);
    if (!isValid){
      setHideProgress(true)
      return
    }

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        folder: `/booker/${folder}`,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortController.signal,
      });

      setFile({
        path: uploadResponse?.filePath,
      });

      toast.success(`${type} Uploaded Succefully`, {
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });

      onchange(uploadResponse?.url);
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      toast.error(`${type} Upload Failed`, {
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });

      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };

  const handleImageChange = () => {
    handleUpload();
    setProgress(0);
    setFile({});
    setHideProgress(false);
  };

  return (
    <>
      {/* File input element using React ref */}
      <input
        hidden
        type="file"
        accept={type == "image" ? "image/*" : "video/*"}
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <button
        className="upload-btn"
        type="button"
        onClick={() => fileInputRef.current?.click()}
      >
        <Image
          src={"/icons/upload.svg"}
          height={20}
          width={20}
          alt="upload_icon"
          className="object-contain"
        />

        <p
          className={cn(
            "text-base",
            type == "image" ? "text-light-100" : "text-dark-500"
          )}
        >
          Upload File
        </p>
      </button>

      {!file.path && !hideProgress && (
        <Progress value={progress} max={100} className="w-[100%]" />
      )}

      {file?.path && (
        <ImageKitProvider urlEndpoint={config.env.imageKit.endpointUrl}>
          {type === "image" ? (
            <KitImage
              src={file?.path}
              width={500}
              height={500}
              alt="Card ID"
              loading="lazy"
            />
          ) : (
            <Video src={file?.path} controls width={500} height={500} />
          )}
        </ImageKitProvider>
      )}
    </>
  );
};

export default FileUpload;
