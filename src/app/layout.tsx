import "./globals.css";
import { Figtree } from "next/font/google";
import localFont from "next/font/local";
import Header from "./_components/header/header";
import Footer from "./_components/footer/footer";

// before web font is downloaded application use default fonts whit swap property
const figtree = Figtree({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-figtree",
});

const yekanbakh = localFont({
  src: [
    {
      path: "../../public/fonts/yekanbakh/YekanBakhFaNum-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/yekanbakh/YekanBakhFaNum-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/yekanbakh/YekanBakhFaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/yekanbakh/YekanBakhFaNum-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/yekanbakh/YekanBakhFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/yekanbakh/YekanBakhFaNum-Black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/yekanbakh/YekanBakhFaNum-ExtraBlack.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-yekanbakh",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      dir="rtl"
      className={`dark ${figtree.variable} ${yekanbakh.variable}`}
    >
      {/* [80px_1fr_auto] mins header be 80px and all space for children be 1fr and footer be auto base on it's content */}
      <body className="min-h-screen grid grid-rows-[80px_1fr_auto] bg-white text-base-100 dark:bg-base-100 dark:text-base-content">
        <Header />
        <div className="flex-1 flex">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
