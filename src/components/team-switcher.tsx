"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className="h-auto hover:bg-transparent flex justify-center" 
        >
          <Link to="/admin" className="flex items-center justify-center w-full">
            <div className="relative group">
              {/* 
                1. Fixed size container (size-20 is 80px). 
                2. overflow-hidden is key to "capturing" only the middle.
              */}
              <div className="size-20 w-[220px] overflow-hidden rounded-xl  transition-all duration-300 border-white/50">
                <img
                  src="/tk-image/tk-logo2.png"
                  alt="Logo"
                  /* 
                    object-cover: Fills the box and crops the edges.
                    object-center: Keeps the middle of the logo visible.
                    scale-150: Optional - increase this to "zoom in" more on the center.
                  */
                  className="size-full object-cover object-center scale-110"
                />
              </div>
              
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 -z-10 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}