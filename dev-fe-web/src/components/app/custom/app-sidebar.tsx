"use client";

import * as React from "react";
import {
  CalendarCheck,
  Clock,
  Users,
  Bell,
  User,
  Settings,
} from "lucide-react";

import { NavMain } from "@/components/app/custom/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/app/custom/nav-user";
import { useAuth } from "@/context/AuthProvider";
import { useTranslation } from "react-i18next";

export function UserSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { getUserInfo } = useAuth();
  const { t } = useTranslation();

  const data = {
    navMain: [
      {
        title: t("menu_lich_cua_toi"),
        url: "/user/schedule",
        icon: CalendarCheck,
      },
      {
        title: t("menu_dat_lich"),
        url: "/user/booking",
        icon: Clock,
      },
      {
        title: t("menu_ho_so"),
        url: "/user/profile",
        icon: User,
      },
      {
        title: t("menu_nhom"),
        url: "/user/groups",
        icon: Users,
      },
      {
        title: t("menu_goi_y_dat_lich"),
        url: "/user/suggestions",
        icon: Bell,
      },
      {
        title: t("menu_cai_dat"),
        url: "/user/settings",
        icon: Settings,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: getUserInfo()?.username + "",
            email: getUserInfo()?.email + "",
            avatar: "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
