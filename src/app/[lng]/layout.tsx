import "./globals.css";
import { Figtree } from "next/font/google";
import localFont from "next/font/local";
import Footer from "./_components/footer";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import Header from "./_components/header";
import QueryProvider from "@/providers/react-query-provider";
import  NextTopLoader  from "nextjs-toploader";
import { Notifications } from "./_components/notification/notification";
import AuthProvider from "@/providers/auth-provider";

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
      path: "../../../public/fonts/yekanbakh/YekanBakhFaNum-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/fonts/yekanbakh/YekanBakhFaNum-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/yekanbakh/YekanBakhFaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/yekanbakh/YekanBakhFaNum-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/yekanbakh/YekanBakhFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/yekanbakh/YekanBakhFaNum-Black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/fonts/yekanbakh/YekanBakhFaNum-ExtraBlack.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-yekanbakh",
});

interface LayoutProps {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <html
      lang={lng}
      dir={dir(lng)}
      className={`dark ${figtree.variable} ${yekanbakh.variable}`}
    >
      {/* [80px_1fr_auto] mins header be 80px and all space for children be 1fr and footer be auto base on it's content */}
      <body className="min-h-screen grid grid-rows-[80px_1fr_auto] bg-white text-base-100 dark:bg-base-100 dark:text-base-content">
        <NextTopLoader showSpinner={false} color="var(--color-primary)" />
        <Notifications />
        <AuthProvider>
          <QueryProvider>
            <Header lng={lng} />
            <main>{children}</main>
            <Footer lng={lng} />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
