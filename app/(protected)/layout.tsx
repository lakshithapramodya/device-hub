import Navbar from "@/components/common/navbar/Navbar";
import MobileSidebar from "@/components/common/sidebar/MobileSidebar";
import Sidebar from "@/components/common/sidebar/Sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full lg:h-screen max-lg:overflow-y-auto overflow-x-hidden lg:overflow-hidden z-0">
      <Sidebar />
      <div className="flex flex-col w-full lg:w-[calc(100vw-240px)] bg-gray-100 lg:h-screen overflow-y-auto">
        <Navbar />
        <div className="px-4 py-2 lg:px-6 lg:py-4 w-full h-full">
          {children}
        </div>
        <MobileSidebar />
      </div>
    </div>
  );
}
