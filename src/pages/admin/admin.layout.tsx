import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  FiLayout,
  FiUsers,
  FiMenu,
  FiX,
  FiLogOut,
  FiHome,
  FiUserCheck
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { logout } from "@/store/auth-slice";
import { FaClipboardList, FaCoins } from "react-icons/fa";

export function AdminLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
  { icon: FiHome, label: "Dashboard", to: "/admin/dashboard" },
  { icon: FiUsers, label: "Users Management", to: "/admin/users-management" },
  { icon: FaClipboardList, label: "Plans Management", to: "/admin/plans-management" },
  { icon: FaCoins, label: "Token Packs Management", to: "/admin/token-packs-management" },
];

  const Sidebar = (
    <aside
      className={clsx(
        "flex flex-col justify-between bg-card shadow-lg border-r border-border transition-all duration-300 z-40",
        collapsed ? "w-20" : "w-64",
        "h-screen fixed md:relative"
      )}
    >
      {/* Header */}
      <div className={clsx("flex items-center p-4 border-b border-border", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <div className="flex items-center gap-3 min-w-0">
            <div className="rounded-lg flex items-center justify-center flex-shrink-0">
              <img src="/logo.png" alt="myshow.ai logo" className="w-8 h-8" />
            </div>
            <span className="text-lg font-semibold text-card-foreground truncate">
              Admin Panel
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground hover:bg-accent/20 hidden md:flex flex-shrink-0"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FiMenu size={20} />
        </Button>
        {/* Mobile Close */}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground hover:bg-accent/20 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <FiX size={20} />
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {menuItems.map(({ icon: Icon, label, to }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-primary/5 text-muted-foreground hover:text-foreground hover:bg-accent/5",
                collapsed && "justify-center"
              )}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={20} className={clsx("flex-shrink-0", isActive ? "text-white" : "text-current")} />
              {!collapsed && <span className={clsx("truncate", isActive ? "text-white" : "text-current")}>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-border">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className={clsx(
                "w-full px-3 py-2 flex justify-center gap-2 border-border text-muted-foreground hover:text-foreground hover:bg-accent/20",
                collapsed ? "px-2" : "px-3"
              )}
            >
              <FiLogOut className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>Logout</span>}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-foreground">Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                Are you sure you want to log out from the admin panel?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-border text-foreground hover:bg-muted">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => { dispatch(logout()); navigate("/"); }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">{Sidebar}</div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-30 transition-opacity duration-300 md:hidden",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setMobileOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full bg-card z-40 w-64 shadow-xl border-r border-border transform transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {Sidebar}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden px-6 py-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FiLayout className="text-primary-foreground" size={18} />
              </div>
              <span className="text-lg font-semibold text-foreground">Admin Panel</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground hover:bg-accent/20"
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu size={20} />
            </Button>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}