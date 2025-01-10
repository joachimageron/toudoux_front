

export default function Layout({children}: Readonly<{children: React.ReactNode;}>) {
  console.log("Layout");
  return (
    <>
      {children}
    </>
  );
}