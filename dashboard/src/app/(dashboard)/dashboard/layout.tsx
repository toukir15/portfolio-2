"use client"
import "@/src/styles/globals.css";
import clsx from "clsx";

import { fontMono } from "@/src/config/fonts";

import "@/src/styles/globals.css";
import { Layout, Menu, Breadcrumb, theme } from "antd";
import { useState } from "react";
import { FaChartPie, FaRegUser } from "react-icons/fa";
import Link from "next/link";
import { MdPayment } from "react-icons/md";
import { GrAppsRounded } from "react-icons/gr";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";

const { Header, Content, Sider } = Layout;
const items = [
    {
        label: "Profile",
        key: "1",
        icon: <FaUser size={20} />,
        link: "/",
    },
    {
        label: "Projects",
        key: "5",
        icon: <GrAppsRounded size={20} />,
        link: "/projects",
    },
    {
        label: "Users",
        key: "3",
        icon: <FaRegUser size={20} />,
        link: "/admin/users",
    },
    {
        label: "Payments",
        key: "4",
        icon: <MdPayment size={20} />,
        link: "/admin/payments",
    },
];

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const currentPath = usePathname();
    const path = currentPath.split("/")[2];
    return (

        <div>
            <Layout style={{ minHeight: "100vh" }}>
                {/* Sidebar for larger screens */}
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    style={{
                        height: "100vh",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        backgroundColor: "#000",
                    }}
                >
                    {/* Logo Section */}
                    <Link
                        href={"/"}
                        className="flex justify-center items-center gap-1 px-2 py-4"
                    >
                        <div>
                            {/* <Image
              src={logo}
              className="xl:h-[30px] h-[25px] w-[25px] xl:w-[30px]"
              alt="logo"
            /> */}
                        </div>
                        {/* Conditionally render text based on the collapsed state */}
                        {!collapsed && (
                            <span className="text-xl font-medium relative top-1 text-white">
                                Garden-Wise
                            </span>
                        )}
                    </Link>

                    <Menu
                        theme="dark"
                        defaultSelectedKeys={["1"]}
                        mode="inline"
                        items={items.map((item) => ({
                            key: item.key,
                            icon: item.icon,
                            label: (
                                <Link className="font-medium" href={item.link}>
                                    {item.label}
                                </Link>
                            ),
                        }))}
                    />

                </Sider>

                <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
                    {/* Header */}
                    <Header style={{ padding: 0, background: colorBgContainer }} >
                        hello
                    </Header>

                    {/* Main content area */}
                    <Content style={{ margin: "0 16px" }}>
                        <Breadcrumb
                            style={{ margin: "16px 0" }}
                            items={[
                                { title: "Dashboard" },
                                { title: <span className="text-green-500 font-medium">{path}</span> },
                            ]}
                        />


                        {/* Main content */}
                        <div className="xl:p-6 min-h-[360px] bg-white rounded-lg">
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}
