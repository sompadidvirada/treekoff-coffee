import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";
import { AdminHeaderActions } from "./component/AdminHeaderActions";

const AdminMain = () => {
  return (
    <SidebarProvider>
      {/* 1. The actual Sidebar component */}
      <AppSidebar />

      <SidebarInset>
        {/* 2. The Header bar */}
        <header className="flex h-16 shrink-0 items-center px-4 border-b justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
          </div>

          {/* The new component */}
          <AdminHeaderActions />
        </header>

        {/* 3. The Content Area */}
        <main className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminMain;
