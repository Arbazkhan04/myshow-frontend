// components/ui/simple-uploader.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUploadFilesMutation } from "@/api/storage";
import { Loader2 } from "lucide-react";

interface SimpleUploaderProps {
  value: string;
  setValue: (url: string) => void;
  showPreview: boolean;
}

export const SimpleUploader: React.FC<SimpleUploaderProps> = ({ value, setValue, showPreview = true }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [uploadFile] = useUploadFilesMutation();

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("files", file);
      formData.append("folder", "uploads");

      const res = await uploadFile(formData).unwrap();
      const uploadedFile = res.body.files[0];
      if (uploadedFile?.url) setValue(uploadedFile.url);
    } catch {
      // ignore for simplicity
    } finally {
      setIsUploading(false);
      setFile(null);
    }
  };

  const isFilled = Boolean(value);

  return (
    <div className="flex gap-2 items-center w-full">
      {value ? (
        showPreview && <img src={value} alt="" className="w-full h-60 object-contain" />
      ) : (
        <>
        <Input
          type="file"
          disabled={isFilled || isUploading}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full"
        />
        <Button
          onClick={handleUpload}
          disabled={isFilled || !file || isUploading}
        >
          {isFilled ? "Uploaded" : isUploading ? <Loader2 className="animate-spin h-4 w-4 mr-2 inline" /> : "Upload"}
        </Button>
        </>
      )}
    </div>
  );
};
