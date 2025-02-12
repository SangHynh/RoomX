"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  House,
} from "lucide-react";

import { NavMain } from "@/components/custom/nav-main";
import { TeamSwitcher } from "@/components/custom/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/custom/nav-user";
import { useAuth } from "@/context/AuthProvider";
// import { useAuth } from "@/context/AuthProvider";


// const {getUserInfo} = useAuth();

// console.log(getUserInfo());

const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: House,
      isActive: false,
      items: [
        {
          title: "Tổng quan",
          url: "#",
        },
        {
          title: "Thống kê đặt phòng",
          url: "#",
        },
        {
          title: "Biểu đồ doanh thu",
          url: "#",
        },
      ],
    },
    {
      title: "Quản lý người dùng",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Danh sách người dùng",
          url: "#",
        },
        {
          title: "Cấu hình quyền",
          url: "#",
        },
        {
          title: "Nhóm người dùng",
          url: "#",
        }
      ],
    },
    {
      title: "Quản lý cơ sở",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Danh sách chi nhánh",
          url: "#",
        },
        {
          title: "Danh sách phòng ban",
          url: "#",
        },
        {
          title: "Phân bổ ngân sách",
          url: "#",
        },
      ],
    },
    {
      title: "Quản lý cuộc họp",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Phê duyệt phòng",
          url: "#",
        },
        {
          title: "Thay đổi phòng",
          url: "#",
        },
        {
          title: "Yêu cầu dịch vụ",
          url: "#",
        },
        {
          title: "Phản hồi nhanh",
          url: "#",
        },
      ],
    },
    {
      title: "Quản lý tài nguyên",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Danh sách phòng họp",
          url: "#",
        },
        {
          title: "Danh sách thiết bị",
          url: "#",
        },
        {
          title: "Cấu hình dịch vụ",
          url: "#",
        },
      ],
    },
    {
      title: "Thông tin",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Hướng dẫn sử dụng",
          url: "#",
        },
        {
          title: "Về chúng tôi",
          url: "#",
        },
        {
          title: "Phiên bản",
          url: "#",
        },
        {
          title: "Mã nguồn",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { getUserInfo } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
      <NavUser user={{ name: getUserInfo()?.username+"", email: getUserInfo()?.email+"", avatar: "aa" }} />
      </SidebarFooter>
    </Sidebar>
  );
}
