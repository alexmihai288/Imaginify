"use client";
import React, { Dispatch } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface MediaUploaderProps {
  onValueChange: (value: string) => void;
  setImage: Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
}

export const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {
  const { toast } = useToast();

  const onUploadSuccessHandler = (result: any) => {
    toast({
      title: "Image uploaded successfully",
      description: "1 credit was deducted from your account",
      duration: 500,
      className: "success-toast",
    });
  };
  const onUploadErrorHandler = (result: any) => {
    toast({
      title: "Something went wrong while uploading",
      description: "Please try again",
      duration: 500,
      className: "error-toast",
    });
  };

  return (
    <CldUploadWidget
      uploadPreset="jsm_imaginify"
      options={{ multiple: false, resourceType: "image" }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="h3-bold text-dark-600">Original</h3>
          {publicId ? (
            <>HERE IMAGE</>
          ) : (
            <div className="media-uploader_cta" onClick={() => open()}>
              <div className="media-uploader_cta-image">
                <Image
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={24}
                  height={24}
                />
              </div>
              <p className="p-14-medium">Click here to upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};
