"use client";

import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BookOutlined,
  CalendarOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, message } from "antd";
import Image from "next/image";
import logo from "../../../../public/aws.jpg";
import { useRouter, usePathname } from "next/navigation";
import { userLocalStorage } from "@/services/LocalService";
import { authServices } from "@/services/authApi";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

interface SidebarProps {
  setLoading: (value: boolean) => void;
}

export default function Sidebar({ setLoading }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState<string>(pathname);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = userLocalStorage.get();
        if (!token) {
          router.push("/");
          return;
        }

        const response = await authServices.getUserInfo(token); 
        setRole(response.data.role);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
        message.error("Không thể lấy thông tin người dùng");
      }
    };
    fetchUserRole();
  }, []);

  const handleLogout = () => {
    userLocalStorage.remove();
    message.success("Đăng xuất thành công!");
    router.push("/");
  };

  const handleSecuritySettingsClick = () => {
    message.warning("Tính năng chưa phát triển");
  };

  const adminMenu: MenuItem[] = [
    { key: "/admin/dashboard", label: "Bảng điều khiển", icon: <DashboardOutlined /> },
    { key: "/admin/users", label: "Quản lý Users", icon: <UserOutlined /> },
    { key: "/admin/courses", label: "Quản lý Courses", icon: <BookOutlined /> },
    { key: "/admin/events", label: "Quản lý Events", icon: <CalendarOutlined /> },
    {
      key: "sub_admin",
      label: "Cài đặt",
      icon: <SettingOutlined />,
      children: [
        { key: "/admin/profile", label: "Thông tin cá nhân" },
        { key: "/admin/settings", label: "Cài đặt hệ thống" },
      ],
    },
    { key: "/auth/logout", label: "Đăng xuất", icon: <LogoutOutlined />, onClick: handleLogout, danger: true },
  ];

  const userMenu: MenuItem[] = [
    { key: "/dashboard", label: "Trang chủ", icon: <DashboardOutlined /> },
    { key: "dashboard/courses", label: "Khóa học", icon: <BookOutlined /> },
    { key: "/dashboard/events", label: "Sự kiện", icon: <CalendarOutlined /> },
    {
      key: "sub_user",
      label: "Tài khoản",
      icon: <UserOutlined />,
      children: [
        { key: "/dashboard/profile", label: "Thông tin cá nhân" },
        {
          key: "/dashboard/settings",
          label: "Cài đặt bảo mật",
          onClick: handleSecuritySettingsClick, 
        },
      ],
    },
    { key: "/auth/logout", label: "Đăng xuất", icon: <LogoutOutlined />, onClick: handleLogout, danger: true },
  ];

  const items = role === "admin" ? adminMenu : role === "user" ? userMenu : [];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      style={{ background: "#2C334D" }} // Màu nền theo logo AWS
    >   

<div className="relative px-5">
  <div className="h-16 flex items-center justify-between">
    {/* Logo - chỉ hiển thị khi sidebar mở */}
    {!collapsed && (
      <Image src={logo} alt="Logo" width={200} height={100} className="h-16" />
    )} 
    {/* Button Menu */}
    <Button
      className="transition-all duration-200"
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
      style={{
        fontSize: "16px",
        color: "#FFB500",
      }}
    />
  </div>

   {/* Khoảng cách giữa logo và menu */}
   <div className="h-8" />
</div>

      <div style={{ maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ background: "#2C334D", color: "#FFFFFF" }} // Màu menu, chữ trắng
          items={items}
          onClick={({ key }) => {
            if (key !== "/auth/logout") {
              setLoading(true);
              setSelectedKey(key);
              router.push(key);
              setTimeout(() => setLoading(false), 1000);
            }
          }}
        />
      </div>
    </Sider>
  );
}
