// app/providers.jsx
"use client";

import {NextUIProvider} from "@nextui-org/system";
import {Toaster} from "react-hot-toast";

export default function Providers({children}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
      <NextUIProvider>
          {children}
        <Toaster />
      </NextUIProvider>
  );
}
