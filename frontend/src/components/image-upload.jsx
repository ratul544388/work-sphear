import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { cn } from "@/lib/utils";
import { request } from "@/lib/request";
import { ImagePlus, X } from "lucide-react";
import { Button } from "./ui/button";

const ImageUpload = ({
  value = "",
  onChange,
  label = "Upload Image",
  disabled,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // <-- new state for progress
  const [imageUrl, setImageUrl] = useState(value);

  const handleUpload = useCallback(
    async (file) => {
      try {
        setUploading(true);
        setUploadProgress(0); // reset progress

        const { apiKey, timestamp, signature, folder, cloudName } =
          await request({
            url: "/cloudinary/signature",
          });

        const formData = new FormData();

        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", folder);

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          }
        );

        setImageUrl(res.data.secure_url);
        onChange(res.data.secure_url);
      } catch (err) {
        console.error("Upload failed", err);
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    },
    [onChange]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    disabled,
  });

  return (
    <div className="space-y-2">
      <label className="block font-medium text-sm text-muted-foreground">
        {label}
      </label>
      <div
        {...getRootProps()}
        className={cn(
          "group border flex items-center justify-center border-dashed rounded-xl w-32 aspect-[5/6] text-center cursor-pointer transition",
          isDragActive ? "bg-muted" : "bg-background",
          disabled && "opacity-50 pointer-events-none"
        )}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            Uploading...
            <span>{uploadProgress}%</span>
          </div>
        ) : imageUrl ? (
          <div className="size-full relative">
            <img
              src={imageUrl}
              alt="Uploaded"
              className="mx-auto bg-accent size-full object-cover rounded-md"
            />
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange("");
                setImageUrl("");
              }}
              size="icon"
              type="button"
              className="absolute size-7 top-0 right-0 rounded-full"
            >
              <X className="size-4 text-destructive" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <div className="p-3 rounded-full bg-accent/50 group-hover:bg-accent transition-colors">
              <ImagePlus className="size-4" />
            </div>
            <p className="text-sm text-muted-foreground text-balance">
              Click or drag & drop to upload
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
