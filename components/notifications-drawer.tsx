"use client"

import { useState } from "react"
import { Bell, Package, Gift, AlertCircle, CheckCircle, X, Trash2, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface Notification {
  id: string
  type: "order" | "offer" | "system" | "delivery"
  title: string
  message: string
  time: string
  read: boolean
  actionUrl?: string
  icon: React.ReactNode
  color: string
}

interface NotificationsDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationsDrawer({ open, onOpenChange }: NotificationsDrawerProps) {
  const { toast } = useToast()

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "order",
      title: "Order Shipped! 📦",
      message: "Your Premium Roasted Makhana order #KFP2024001 has been shipped and will arrive by tomorrow.",
      time: "2 hours ago",
      read: false,
      actionUrl: "/orders/KFP2024001",
      icon: <Package className="h-5 w-5" />,
      color: "text-blue-600"
    },
    {
      id: "2",
      type: "offer",
      title: "Special Offer! 🎉",
      message: "Get 25% off on your next makhana order. Limited time offer ending soon!",
      time: "4 hours ago",
      read: false,
      actionUrl: "/shop?offer=25OFF",
      icon: <Gift className="h-5 w-5" />,
      color: "text-green-600"
    },
    {
      id: "3",
      type: "delivery",
      title: "Out for Delivery 🚚",
      message: "Your Tangy Masala Makhana is out for delivery. Track your package in real-time.",
      time: "6 hours ago",
      read: true,
      actionUrl: "/track/KFP2024002",
      icon: <Package className="h-5 w-5" />,
      color: "text-orange-600"
    },
    {
      id: "4",
      type: "system",
      title: "Account Verified ✅",
      message: "Your email has been successfully verified. You can now enjoy all premium features.",
      time: "1 day ago",
      read: true,
      actionUrl: "/profile",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-green-600"
    }
  ])

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
    toast({
      title: "All notifications marked as read",
    })
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
    toast({
      title: "Notification deleted",
    })
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center relative">
                <Bell className="h-5 w-5 text-blue-600" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <div>
                <SheetTitle className="text-xl font-bold text-gray-800">Notifications</SheetTitle>
                <SheetDescription className="text-gray-600">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </SheetDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={markAllAsRead} className="rounded-xl">
              Mark All Read
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-8 flex-1 overflow-y-auto space-y-3">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
              <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center">
                <Bell className="h-10 w-10 text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">No notifications</h3>
                <p className="text-gray-600 text-sm">
                  You're all caught up! Check back later for updates.
                </p>
              </div>
            </div>
          ) : (
            notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-all duration-200 hover:shadow-md border-l-4 ${
                  !notification.read 
                    ? "bg-blue-50 border-l-blue-500 border-r border-t border-b border-blue-200" 
                    : "border-l-gray-300 hover:border-l-green-400"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className={`flex-shrink-0 ${notification.color}`}>
                      {notification.icon}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className={`font-semibold text-sm ${!notification.read ? "text-gray-800" : "text-gray-600"}`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        {notification.actionUrl && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 text-xs rounded-md"
                            onClick={() => {
                              markAsRead(notification.id)
                              window.location.href = notification.actionUrl!
                            }}
                          >
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}