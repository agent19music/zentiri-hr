"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Clock, Users, Building, CheckCircle } from "lucide-react"

interface DemoDialogProps {
  children: React.ReactNode
}

export function DemoDialog({ children }: DemoDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setIsOpen(false)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Demo Scheduled!</h3>
            <p className="text-muted-foreground">
              We'll be in touch within 24 hours to confirm your demo time.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Schedule Your Demo
          </DialogTitle>
          <DialogDescription>
            See Zentiri HR in action with a personalized demo tailored to your needs.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" placeholder="John" required />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" placeholder="Doe" required />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Work Email *</Label>
            <Input id="email" type="email" placeholder="john@company.com" required />
          </div>
          
          <div>
            <Label htmlFor="company">Company Name *</Label>
            <Input id="company" placeholder="Your Company" required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input id="jobTitle" placeholder="HR Manager" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="companySize">Company Size *</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    1-10 employees
                  </div>
                </SelectItem>
                <SelectItem value="11-50">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    11-50 employees
                  </div>
                </SelectItem>
                <SelectItem value="51-200">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    51-200 employees
                  </div>
                </SelectItem>
                <SelectItem value="201-1000">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    201-1000 employees
                  </div>
                </SelectItem>
                <SelectItem value="1000+">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    1000+ employees
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="preferredTime">Preferred Demo Time</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select preferred time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Morning (9 AM - 12 PM EAT)
                  </div>
                </SelectItem>
                <SelectItem value="afternoon">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Afternoon (12 PM - 5 PM EAT)
                  </div>
                </SelectItem>
                <SelectItem value="evening">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Evening (5 PM - 8 PM EAT)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="message">Tell us about your HR needs</Label>
            <Textarea 
              id="message" 
              placeholder="What HR challenges are you looking to solve? What features are most important to you?"
              rows={3}
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Schedule Demo
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
