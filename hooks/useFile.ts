import { useCallback, useState } from "react"
import { pdfjs } from "react-pdf"
export const file2images = (file: File) => {
  return new Promise((resolve, rejects) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = async () => {
      const pdfData = fileReader.result;
      if (!pdfData) return;
      const loadingTask = pdfjs.getDocument(pdfData);

      const pdf = await loadingTask.promise;
      const imagesArray = [];

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        const scale = 1.5; // 控制图片质量
        const viewport = page.getViewport({ scale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        if (!context) return;
        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        const imgDataUrl = canvas.toDataURL();
        imagesArray.push(imgDataUrl);
      }
      resolve(imagesArray);
    };
  })
};
const useFile = ({
  accept = ""
} = {}) => {
  const [file, setFile] = useState<File | null>(null)
  const open = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = accept
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      setFile(file)
    }
    input.click()
  }, [])
  return [open, file, setFile] as const
}
export default useFile