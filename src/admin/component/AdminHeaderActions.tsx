import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AdminHeaderActions() {
  return (
    <div className="flex items-center gap-4 ml-auto">
      {/* Search Box */}
      <div className="relative hidden md:block">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          disabled
          placeholder="Search Treekoff..."
          className="w-[200px] lg:w-[300px] pl-9 bg-muted/40 border-none shadow-none focus-visible:ring-1 focus-visible:ring-white/20 transition-all rounded-lg"
        />
      </div>

      {/* Notification Button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            disabled
            size="icon"
            className="relative hover:bg-muted/50 rounded-full"
          >
            <Bell className="h-5 w-5" />
            {/* Notification Indicator Dot */}
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 rounded-xl p-2">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
            <span className="font-medium text-sm">Low Stock Alert</span>
            <span className="text-xs text-muted-foreground line-clamp-2">
              Coffee beans at Branch A are below 10%. Please restock soon.
            </span>
            <span className="text-[10px] opacity-50 mt-1">2 mins ago</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
            <span className="font-medium text-sm">New Order</span>
            <span className="text-xs text-muted-foreground">
              A new franchise inquiry was received from the website.
            </span>
            <span className="text-[10px] opacity-50 mt-1">1 hour ago</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
