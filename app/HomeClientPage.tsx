"use client"

import useFile, { file2images } from "@/hooks/useFile";
import { useEffect, useState } from "react";


type PDFRenderProps = {
  file: File,
  onClear: () => void
}
const PDFRender = ({ file, onClear }: PDFRenderProps) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    file2images(file)?.then(files => {
      console.log(files)
    })
  }, [])

  return (
    <div>

    </div>
  )
}

const HomeClientPage = () => {
  const [open, file, setFile] = useFile({
    accept: ".pdf",
  });


  if (!!file) return <PDFRender file={file} onClear={() => setFile(null)} />
  return (
    <div onClick={open} className="w-80 h-96 flex justify-center items-center bg-white border border-dashed border-gray-400">
      <div className="flex flex-col gap-4  cursor-pointer">
        <div className="flex justify-center">icon</div>
        <div>单击上传或拖放</div>
      </div>
    </div>
  )
}
export default HomeClientPage
