import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'easymde/dist/easymde.min.css'

const workSans = localFont({
  src : [
    {
        path : './font/WorkSans-Black.ttf',
        weight : "900",
      style : "normal",
    },
    {
      path : './font/WorkSans-ExtraBold.ttf',
      weight : "800",
      style : "normal",
    },
    {
      path : './font/WorkSans-Bold.ttf',
      weight : "700",
      style : "normal",
    },
    {
      path : './font/WorkSans-SemiBold.ttf',
      weight : "600",
      style : "normal",
    },
    {
      path : './font/WorkSans-Medium.ttf',
      weight : "500",
      style : "normal",
    },
    {
      path : './font/WorkSans-Regular.ttf',
      weight : "400",
      style : "normal",
    },
    {
      path : './font/WorkSans-Thin.ttf',
      weight : "300",
      style : "normal",
    },
    {
      path : './font/WorkSans-Light.ttf',
      weight : "200",
      style : "normal",
    },
    {
      path : './font/WorkSans-ExtraLight.ttf',
      weight : "100",
      style : "normal",
    }
  ],
  variable : '--font-work-sans' ,
})

export const metadata: Metadata = {
  title: "STARTHUB",
  description: "Pitch , Vote & Grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={workSans.variable}
      >
        {children}
      </body>
    </html>
  );
}
