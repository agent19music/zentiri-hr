"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Building2, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  Clock,
  MapPin,
  Wifi,
  Monitor,
  Coffee,
  Car,
  Shield,
  Eye,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"

// Mock data - in real app would come from backend
const mockSpaces = [
  {
    id: "1",
    name: "Conference Room A",
    type: "Meeting Room",
    capacity: 12,
    floor: "2nd Floor",
    location: "East Wing",
    amenities: ["Projector", "Whiteboard", "Video Conferencing", "WiFi"],
    isActive: true,
    currentBookings: 3,
    utilizationRate: 75,
    nextAvailable: "2:00 PM",
    description: "Large conference room perfect for team meetings and presentations"
  },
  {
    id: "2", 
    name: "Creative Hub",
    type: "Collaboration Space",
    capacity: 8,
    floor: "1st Floor",
    location: "Central Area",
    amenities: ["Whiteboard", "Flexible Seating", "Natural Light", "Plants"],
    isActive: true,
    currentBookings: 1,
    utilizationRate: 40,
    nextAvailable: "Available Now",
    description: "Open creative space for brainstorming and collaborative work"
  },
  {
    id: "3",
    name: "Focus Pod 1",
    type: "Individual Workspace",
    capacity: 1,
    floor: "3rd Floor",
    location: "Quiet Zone",
    amenities: ["Desk", "Monitor", "Privacy Screen", "Power Outlet"],
    isActive: true,
    currentBookings: 0,
    utilizationRate: 85,
    nextAvailable: "Available Now",
    description: "Private workspace for focused individual work"
  },
  {
    id: "4",
    name: "Lounge Area",
    type: "Informal Meeting",
    capacity: 6,
    floor: "1st Floor", 
    location: "Reception Area",
    amenities: ["Comfortable Seating", "Coffee Machine", "WiFi", "Casual Setting"],
    isActive: true,
    currentBookings: 2,
    utilizationRate: 60,
    nextAvailable: "4:30 PM",
    description: "Relaxed space for informal meetings and coffee chats"
  }
]

const spaceTypes = [
  "Meeting Room",
  "Collaboration Space", 
  "Individual Workspace",
  "Informal Meeting",
  "Training Room",
  "Phone Booth",
  "Event Space"
]

const amenityOptions = [
  "Projector", "Whiteboard", "Video Conferencing", "WiFi", "Monitor", 
  "Flexible Seating", "Natural Light", "Privacy Screen", "Power Outlet",
  "Coffee Machine", "Comfortable Seating", "Desk", "Plants", "Sound System"
]

export default function WorkspacePage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingSpace, setEditingSpace] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [newSpace, setNewSpace] = useState({
    name: "",
    type: "",
    capacity: "",
    floor: "",
    location: "",
    amenities: [] as string[],
    description: ""
  })

  const filteredSpaces = mockSpaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || space.type === filterType
    return matchesSearch && matchesFilter
  })

  const totalSpaces = mockSpaces.length
  const activeSpaces = mockSpaces.filter(s => s.isActive).length
  const totalCapacity = mockSpaces.reduce((sum, s) => sum + s.capacity, 0)
  const averageUtilization = Math.round(mockSpaces.reduce((sum, s) => sum + s.utilizationRate, 0) / mockSpaces.length)

  const handleAddSpace = () => {
    console.log("Adding space:", newSpace)
    setIsAddDialogOpen(false)
    setNewSpace({
      name: "",
      type: "",
      capacity: "",
      floor: "",
      location: "",
      amenities: [],
      description: ""
    })
  }

  const handleAmenityToggle = (amenity: string) => {
    setNewSpace(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workspace Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage office spaces, monitor utilization, and optimize workplace efficiency
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Space
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spaces</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSpaces}</div>
            <p className="text-xs text-muted-foreground">
              {activeSpaces} active spaces
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity}</div>
            <p className="text-xs text-muted-foreground">
              People across all spaces
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Utilization</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageUtilization}%</div>
            <p className="text-xs text-muted-foreground">
              Past 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockSpaces.reduce((sum, s) => sum + s.currentBookings, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Current bookings today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="bookings">Current Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search spaces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {spaceTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Spaces Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpaces.map((space) => (
              <Card key={space.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{space.name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Edit Space</DropdownMenuItem>
                        <DropdownMenuItem>View Bookings</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete Space
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{space.type}</Badge>
                    <Badge variant={space.isActive ? "default" : "secondary"}>
                      {space.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{space.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Capacity: {space.capacity}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{space.floor}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Utilization Rate</span>
                      <span className={`font-medium ${
                        space.utilizationRate > 80 ? "text-green-600" :
                        space.utilizationRate > 50 ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {space.utilizationRate}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          space.utilizationRate > 80 ? "bg-green-500" :
                          space.utilizationRate > 50 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${space.utilizationRate}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Next Available:</span>
                    <span className="font-medium">{space.nextAvailable}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {space.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {space.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{space.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Space Utilization Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Analytics Chart Placeholder
                  <BarChart3 className="h-8 w-8 ml-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Time Slots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Time Slot Chart Placeholder
                  <Clock className="h-8 w-8 ml-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Bookings</CardTitle>
              <CardDescription>Active bookings across all spaces</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Space</TableHead>
                    <TableHead>Booked By</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Conference Room A</TableCell>
                    <TableCell>John Smith</TableCell>
                    <TableCell>10:00 AM - 11:30 AM</TableCell>
                    <TableCell>Team Standup</TableCell>
                    <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Creative Hub</TableCell>
                    <TableCell>Sarah Johnson</TableCell>
                    <TableCell>2:00 PM - 4:00 PM</TableCell>
                    <TableCell>Design Review</TableCell>
                    <TableCell><Badge variant="secondary">Upcoming</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Space Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Space</DialogTitle>
            <DialogDescription>
              Create a new workspace that employees can book
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Space Name</Label>
                <Input
                  id="name"
                  value={newSpace.name}
                  onChange={(e) => setNewSpace(prev => ({...prev, name: e.target.value}))}
                  placeholder="e.g., Conference Room B"
                />
              </div>
              <div>
                <Label htmlFor="type">Space Type</Label>
                <Select onValueChange={(value) => setNewSpace(prev => ({...prev, type: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {spaceTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newSpace.capacity}
                  onChange={(e) => setNewSpace(prev => ({...prev, capacity: e.target.value}))}
                  placeholder="10"
                />
              </div>
              <div>
                <Label htmlFor="floor">Floor</Label>
                <Input
                  id="floor"
                  value={newSpace.floor}
                  onChange={(e) => setNewSpace(prev => ({...prev, floor: e.target.value}))}
                  placeholder="2nd Floor"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newSpace.location}
                  onChange={(e) => setNewSpace(prev => ({...prev, location: e.target.value}))}
                  placeholder="West Wing"
                />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={newSpace.description}
                onChange={(e) => setNewSpace(prev => ({...prev, description: e.target.value}))}
                placeholder="Describe the space and its intended use..."
                rows={3}
              />
            </div>

            <div>
              <Label>Amenities</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {amenityOptions.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={amenity}
                      checked={newSpace.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="rounded"
                    />
                    <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSpace}>
              Add Space
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 