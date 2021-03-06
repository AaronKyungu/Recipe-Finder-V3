
import { Dropzone, FileItem, FileValidated, FullScreenPreview } from "@dropzone-ui/react";
import { useState } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  uuid: string
  setImageUploaded: (uploaded: boolean) => void
}

export const ImageUpload = ({ uuid, setImageUploaded }: Props) => {

  const [files, setFiles] = useState<FileValidated[]>([]);
  const [imageSrc, setImageSrc] = useState(undefined);

  const updateFiles = (incommingFiles: any) => {
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
  };
  const onDelete = (id: number | string | undefined) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource: any) => {
    setImageSrc(imageSource);
  };
  const handleClean = (files: any) => {
    console.log("list cleaned", files);
  };
  const onUploadFinish = () => {
    setImageUploaded(true)
  }

  return (
    <Dropzone
      style={{ width: "100%", height: "100%" }}
      view={"list"}
      onChange={updateFiles}
      minHeight="195px"
      onClean={handleClean}
      onUploadFinish={onUploadFinish}
      value={files}
      maxFiles={1}
      // header={false}
      uploadOnDrop={true}
      footer={false}
      maxFileSize={2998000}
      label="Drag'n drop files here or click to browse"
      accept=".png,image/*"
      uploadingMessage={"Uploading..."}
      url={`http://localhost:4000/image-upload/${uuid}`}
      // fakeUploading // Only for development
      disableScroll
    >
      {
        files.map((file: FileValidated) => (
          <FileItem
            {...file}
            key={file.id}
            onDelete={onDelete}
            onSee={handleSee}
            resultOnTooltip
            preview
            info
            hd
          />
        ))
      }
      <FullScreenPreview
        imgSource={imageSrc}
        openImage={imageSrc}
        onClose={(e: Event) => handleSee(undefined)}
      />
    </Dropzone>
  );
};