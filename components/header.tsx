"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, User, Heart, Bell, Search, Menu, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CartDrawer } from "@/components/cart-drawer"
import { WishlistDrawer } from "@/components/wishlist-drawer"
import { NotificationsDrawer } from "@/components/notifications-drawer"
import { AuthDialog } from "@/components/auth-dialog"
import { SearchDialog } from "@/components/search-dialog"
import { MegaMenu } from "@/components/mega-menu"
import { useCart } from "@/components/cart-provider"
import { useHasMounted } from "@/hooks/use-has-mounted"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const { items } = useCart()
  const hasMounted = useHasMounted()
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Mock login state

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const unreadNotifications = 3 // Mock unread count
  const wishlistCount = 5 // Mock wishlist count

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/bulk-orders", label: "Bulk Orders" },
    { href: "/blog", label: "Blog" },
  ]

  const handleLogin = () => {
    setIsLoggedIn(true)
    setAuthOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        {/* Top Bar */}
        <div className="gradient-primary text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-2 text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>📍 Darbhanga, Bihar</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>📞 +91 91220 85387</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline">✨ Free shipping on orders above ₹500</span>
                <div className="flex items-center gap-2">
                  <span>🚚 Fast Delivery</span>
                  <span>•</span>
                  <span>🌟 Premium Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/krishanova-logo.png"
                  alt="Krishanova FPC"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-black text-gradient-primary">
                  Krishanova FPC
                </div>
                <div className="text-xs text-gray-600 -mt-1">Premium Makhana</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              {hasMounted && (
                <>
                  {/* Search */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchOpen(true)}
                    className="relative h-10 w-10 rounded-full hover:bg-gray-100"
                  >
                    <Search className="h-5 w-5" />
                  </Button>

                  {/* Notifications */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNotificationsOpen(true)}
                    className="relative h-10 w-10 rounded-full hover:bg-gray-100"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                        {unreadNotifications}
                      </Badge>
                    )}
                  </Button>

                  {/* Wishlist */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setWishlistOpen(true)}
                    className="relative h-10 w-10 rounded-full hover:bg-gray-100"
                  >
                    <Heart className="h-5 w-5" />
                    {wishlistCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                        {wishlistCount}
                      </Badge>
                    )}
                  </Button>

                  {/* Cart */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCartOpen(true)}
                    className="relative h-10 w-10 rounded-full hover:bg-gray-100"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-purple-600 text-white rounded-full flex items-center justify-center">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>

                  {/* User Account */}
                  {isLoggedIn ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="relative h-10 w-10 rounded-full hover:bg-gray-100">
                          <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-purple-600">S</span>
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">Shivam Raj</p>
                            <p className="text-xs leading-none text-muted-foreground">
                              shivam@krishanova.com
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/profile">My Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/orders">My Orders</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/addresses">Addresses</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/settings">Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button
                      onClick={() => setAuthOpen(true)}
                      className="btn-primary text-white font-semibold px-6 rounded-full"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-2">
              {hasMounted && (
                <>
                  {/* Search */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchOpen(true)}
                    className="h-9 w-9 rounded-full"
                  >
                    <Search className="h-4 w-4" />
                  </Button>

                  {/* Cart */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCartOpen(true)}
                    className="relative h-9 w-9 rounded-full"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-purple-600 text-white rounded-full flex items-center justify-center">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </>
              )}

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {/* User Section */}
                    {isLoggedIn ? (
                      <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                        <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-purple-600">S</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Shivam Raj</div>
                          <div className="text-sm text-gray-600">Premium Member</div>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setAuthOpen(true)
                        }}
                        className="w-full btn-primary rounded-xl h-12"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Login / Sign Up
                      </Button>
                    )}

                    {/* Quick Actions */}
                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setNotificationsOpen(true)
                        }}
                        className="h-16 flex-col rounded-xl"
                      >
                        <Bell className="h-5 w-5 mb-1" />
                        <span className="text-xs">Notifications</span>
                        {unreadNotifications > 0 && (
                          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">
                            {unreadNotifications}
                          </Badge>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setWishlistOpen(true)
                        }}
                        className="h-16 flex-col rounded-xl"
                      >
                        <Heart className="h-5 w-5 mb-1" />
                        <span className="text-xs">Wishlist</span>
                        {wishlistCount > 0 && (
                          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">
                            {wishlistCount}
                          </Badge>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setCartOpen(true)
                        }}
                        className="h-16 flex-col rounded-xl"
                      >
                        <ShoppingCart className="h-5 w-5 mb-1" />
                        <span className="text-xs">Cart</span>
                                                 {totalItems > 0 && (
                           <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-purple-600">
                             {totalItems}
                           </Badge>
                         )}
                      </Button>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-2">
                      {navigationLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    {/* User Menu for Mobile */}
                    {isLoggedIn && (
                      <div className="pt-4 border-t space-y-2">
                        <Link
                          href="/profile"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl"
                        >
                          My Profile
                        </Link>
                        <Link
                          href="/orders"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl"
                        >
                          My Orders
                        </Link>
                        <Button
                          onClick={() => {
                            handleLogout()
                            setMobileMenuOpen(false)
                          }}
                          variant="ghost"
                          className="w-full justify-start px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl"
                        >
                          Log out
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Dialogs and Drawers */}
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <WishlistDrawer open={wishlistOpen} onOpenChange={setWishlistOpen} />
      <NotificationsDrawer open={notificationsOpen} onOpenChange={setNotificationsOpen} />
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
