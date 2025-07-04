"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Building2, 
  Users, 
  Calendar as CalendarIcon, 
  Clock,
  MapPin,
  BookOpen,
  CheckCircle2,
  Star,
  Heart
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

// Mock data for available spaces
const mockSpaces = [
  {
    id: "1",
    name: "Conference Room A",
    type: "Meeting Room",
    capacity: 12,
    floor: "2nd Floor",
    location: "East Wing",
    amenities: ["Projector", "Whiteboard", "Video Conferencing", "WiFi"],
    rating: 4.8,
    image: "/openoffice2.webp",
    description: "Large conference room perfect for team meetings and presentations",
    availability: {
      "9:00": true,
      "10:00": false,
      "11:00": true,
      "12:00": true,
      "13:00": false,
      "14:00": true,
      "15:00": true,
      "16:00": false,
      "17:00": true
    }
  },
  {
    id: "2", 
    name: "Creative Hub",
    type: "Collaboration Space",
    capacity: 8,
    floor: "1st Floor",
    location: "Central Area",
    amenities: ["Whiteboard", "Flexible Seating", "Natural Light", "Plants"],
    rating: 4.9,
    image: "/openoffice.avif",
    description: "Open creative space for brainstorming and collaborative work",
    availability: {
      "9:00": true,
      "10:00": true,
      "11:00": false,
      "12:00": true,
      "13:00": true,
      "14:00": true,
      "15:00": false,
      "16:00": true,
      "17:00": true
    }
  }
]

const timeSlots = [
  "9:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00"
]

export default function EmployeeWorkspacePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSpace, setSelectedSpace] = useState<any>(null)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selectedTime, setSelectedTime] = useState("")
  const [duration, setDuration] = useState("1")
  const [purpose, setPurpose] = useState("")
  const [favorites, setFavorites] = useState<string[]>(["2"])

  const filteredSpaces = mockSpaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || space.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleBookSpace = () => {
    console.log("Booking space:", {
      spaceId: selectedSpace?.id,
      date: selectedDate,
      time: selectedTime,
      duration,
      purpose
    })
    setBookingDialogOpen(false)
    setSelectedSpace(null)
    setSelectedTime("")
    setPurpose("")
  }

  const toggleFavorite = (spaceId: string) => {
    setFavorites(prev => 
      prev.includes(spaceId) 
        ? prev.filter(id => id !== spaceId)
        : [...prev, spaceId]
    )
  }

  const getAvailableSlots = (space: any) => {
    return timeSlots.filter(time => space.availability[time])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workspace Booking</h1>
          <p className="text-muted-foreground mt-1">
            Find and book the perfect space for your work needs
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                {format(selectedDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Available Now</p>
                <p className="text-xs text-muted-foreground">
                  {filteredSpaces.filter(s => s.availability["14:00"]).length} spaces
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Heart className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Favorites</p>
                <p className="text-xs text-muted-foreground">
                  {favorites.length} saved spaces
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BookOpen className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Your Bookings</p>
                <p className="text-xs text-muted-foreground">3 today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Top Rated</p>
                <p className="text-xs text-muted-foreground">4.8 avg rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search spaces by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Meeting Room">Meeting Rooms</SelectItem>
            <SelectItem value="Collaboration Space">Collaboration</SelectItem>
            <SelectItem value="Individual Workspace">Individual Work</SelectItem>
            <SelectItem value="Phone Booth">Phone Booths</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpaces.map((space) => (
          <Card key={space.id} className="hover:shadow-lg transition-all duration-200 group">
            <div className="relative">
              <img 
                src={space.image} 
                alt={space.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={() => toggleFavorite(space.id)}
              >
                <Heart className={`h-4 w-4 ${
                  favorites.includes(space.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                }`} />
              </Button>
              <div className="absolute bottom-2 left-2">
                <Badge variant="secondary" className="bg-white/90">
                  {space.type}
                </Badge>
              </div>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{space.name}</CardTitle>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{space.rating}</span>
                </div>
              </div>
              <CardDescription className="text-sm">
                {space.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Up to {space.capacity} people</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{space.floor}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {space.amenities.slice(0, 3).map((amenity) => (
                  <Badge key={amenity} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {space.amenities.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{space.amenities.length - 3}
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Available Today</span>
                  <span className="text-xs text-muted-foreground">
                    {getAvailableSlots(space).length} slots
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {getAvailableSlots(space).slice(0, 4).map((time) => (
                    <Badge key={time} variant="outline" className="text-xs">
                      {time}
                    </Badge>
                  ))}
                  {getAvailableSlots(space).length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{getAvailableSlots(space).length - 4}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  className="w-full" 
                  onClick={() => {
                    setSelectedSpace(space)
                    setBookingDialogOpen(true)
                  }}
                  disabled={getAvailableSlots(space).length === 0}
                >
                  {getAvailableSlots(space).length === 0 ? "Fully Booked" : "Book Now"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book {selectedSpace?.name}</DialogTitle>
            <DialogDescription>
              {selectedSpace?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Date</Label>
              <Input value={format(selectedDate, "PPP")} disabled />
            </div>

            <div>
              <Label>Time Slot</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {selectedSpace && getAvailableSlots(selectedSpace).map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}:00 - {parseInt(time) + 1}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Duration (hours)</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="3">3 hours</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Purpose (Optional)</Label>
              <Textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Team meeting, focused work, client call..."
                rows={3}
              />
            </div>

            {selectedSpace && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Capacity:</span>
                    <span>{selectedSpace.capacity} people</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>{selectedSpace.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <span className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{selectedSpace.rating}</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleBookSpace}
              disabled={!selectedTime}
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 