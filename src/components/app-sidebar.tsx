"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  Home,
  Settings,
  Store,
  Users,
  ContactRoundIcon,
} from "lucide-react";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "ພາບລວມ",
      url: "/admin",
      icon: <Home />,
      isActive: true,
      items: [
        {
          title: "ລາຍງານພາບລວມທັງໝົດ",
          url: "/admin",
        },
        {
          title: "ຈັດການ USER",
          url: "/admin/manageuser",
        },
      ],
    },
    {
      title: "Home",
      url: "/admin/managehomecover",
      icon: <Settings />,
      isActive: true,
      items: [
        {
          title: "ແກ້ໄຂຮູບພາບໜ້າປົກ Home",
          url: "/admin/managehomecover",
        },
        // {
        //   title: "ແກ້ໄຂຂໍ້ມູນ Discover",
        //   url: "#",
        // },
        // {
        //   title: "ແກ້ໄຂຂໍ້ມູນ Our Services",
        //   url: "/admin/manageourservices",
        // },
        {
          title: "ແກ້ໄຂເມນູແນະນຳ",
          url: "/admin/managemenurecommend",
        },
        {
          title: "ແກ້ໄຂຂໍ້ມູນ Board",
          url: "/admin/manageboarddetail",
        },
        {
          title: "ແກ້ໄຂຂໍ້ມູນ announcement",
          url: "/admin/manageannouncement",
        },
      ],
    },
    {
      title: "Branches",
      isActive: true,
      url: "#",
      icon: <Store />,
      items: [
        {
          title: "ສາຂາທັງໝົດ",
          url: "/admin/managebranches",
        },
      ],
    },
    // {
    //   title: "About Us",
    //   url: "#",
    //   isActive:true,
    //   icon: <BookOpenIcon />,
    //   items: [
    //     {
    //       title: "ແກ້ໄຂຂໍ້ມູນ",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Franchise",
    //   url: "#",
    //   isActive:true,
    //   icon: <Handshake />,
    //   items: [
    //     {
    //       title: "ແກ້ໄຂຂໍ້ມູນ",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Menu",
    //   url: "#",
    //   isActive:true,
    //   icon: <Coffee />,
    //   items: [
    //     {
    //       title: "ຈັດການເມນູທັງໝົດ",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "Join Our Teams",
      url: "#",
      isActive:true,
      icon: <Users />,
      items: [
        // {
        //   title: "ພາບລວມທັງໝົດ",
        //   url: "#",
        // },
        {
          title: "ຈັດການຕຳແໜ່ງສະໝັກງານ",
          url: "/admin/managejobrequire",
        },
      ],
    },
    {
      title: "Contract",
      url: "#",
      isActive:true,
      icon: <ContactRoundIcon />,
      items: [
        {
          title: "ຈັດການເມນູທັງໝົດ",
          url: "/admin/managecontact",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const user = JSON.parse(localStorage.getItem("user_detail") ?? "null");
  return (
    <Sidebar collapsible="icon" {...props} className="font-lao ">
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
