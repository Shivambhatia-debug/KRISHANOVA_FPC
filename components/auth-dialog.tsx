"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, User, Phone, Chrome } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import GoogleSheetsService from "@/lib/google-sheets"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Login Successful! 🎉",
        description: "Welcome back to Krishanova FPC!",
      })
      onOpenChange(false)
      // Reset form
      setLoginData({ email: "", password: "" })
    }, 1500)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)

    try {
      // Save user data to Google Sheets
      await GoogleSheetsService.registerUser({
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        email: signupData.email,
        phone: signupData.phone,
        timestamp: new Date().toISOString()
      })

      toast({
        title: "Account Created! 🎉",
        description: "Welcome to Krishanova FPC! Please verify your email.",
      })
      
      onOpenChange(false)
      
      // Reset form
      setSignupData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
      })
    } catch (error) {
      console.error('Error creating account:', error)
      toast({
        title: "Error Creating Account",
        description: "Please try again or contact support.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: `Redirecting to ${provider} authentication...`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gradient-primary">
            Welcome to Krishanova FPC
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100">
            <TabsTrigger value="login" className="font-semibold">Login</TabsTrigger>
            <TabsTrigger value="signup" className="font-semibold">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-purple-400 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-green-400 rounded-xl"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">Remember me</Label>
                </div>
                <Button variant="link" className="text-sm text-green-600 p-0 h-auto">
                  Forgot password?
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Google")}
                className="h-12 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
              >
                <Chrome className="h-4 w-4 mr-2" />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Facebook")}
                className="h-12 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
              >
                <span className="text-blue-600 font-bold text-lg mr-2">f</span>
                Facebook
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="space-y-6">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      value={signupData.firstName}
                      onChange={(e) => setSignupData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-green-400 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    value={signupData.lastName}
                    onChange={(e) => setSignupData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="h-12 border-2 border-gray-200 focus:border-green-400 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signupEmail" className="text-sm font-semibold text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="your.email@example.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-green-400 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={signupData.phone}
                    onChange={(e) => setSignupData(prev => ({ ...prev, phone: e.target.value }))}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-green-400 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signupPassword" className="text-sm font-semibold text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="signupPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={signupData.password}
                    onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-green-400 rounded-xl"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-green-400 rounded-xl"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  required
                />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Button variant="link" className="p-0 h-auto text-sm text-green-600">
                    Terms of Service
                  </Button>{" "}
                  and{" "}
                  <Button variant="link" className="p-0 h-auto text-sm text-green-600">
                    Privacy Policy
                  </Button>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Google")}
                className="h-12 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
              >
                <Chrome className="h-4 w-4 mr-2" />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Facebook")}
                className="h-12 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
              >
                <span className="text-blue-600 font-bold text-lg mr-2">f</span>
                Facebook
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 