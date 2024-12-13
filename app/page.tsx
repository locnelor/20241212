import { Metadata } from "next";
import Header from "./Header";
import Footer from "./Footer";
import HomeClientPage from "./HomeClientPage";


export const metadata: Metadata = {
  title: "免费 PDF 页面旋转器 - 旋转单个或所有页面",
  description: "Rotate individual or all pages in your PDF effortlessly. No downloads or sign-ups. Fast, secure, and user-friendly. Try now!",
};

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center p-20 gap-8" style={{ background: "#F7F5EE" }}>
        <h1 className="text-5xl">旋转PDF页面</h1>
        <div className="text-gray-700">只需单击页面即可旋转。然后，您可以下载修改后的 PDF。</div>
        <HomeClientPage />
      </div>
      <Footer />
    </div>
  )
}
