"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  GraduationCap, 
  Play, 
  BookOpen, 
  Users, 
  TrendingUp,
  Clock,
  Star,
  Search,
  Plus,
  ExternalLink,
  MessageSquare,
  Target,
  Award
} from "lucide-react"
import { useState } from "react"

const trainingStats = [
  {
    title: "Active Courses",
    value: "24",
    change: "+3 this month",
    changeType: "increase" as const,
    icon: BookOpen,
    description: "Available training programs",
  },
  {
    title: "Employees Enrolled",
    value: "186",
    change: "+12 this week",
    changeType: "increase" as const,
    icon: Users,
    description: "Active participants",
  },
  {
    title: "Completion Rate",
    value: "84%",
    change: "+5% this month",
    changeType: "increase" as const,
    icon: Target,
    description: "Course completion average",
  },
  {
    title: "Average Rating",
    value: "4.7/5",
    change: "Based on 432 reviews",
    changeType: "neutral" as const,
    icon: Star,
    description: "Employee satisfaction",
  },
]

const recommendedVideos = [
  {
    id: "1",
    title: "Effective Communication in the Workplace",
    thumbnail: "/placeholder.jpg",
    duration: "12:34",
    views: "1.2M views",
    channel: "Business Skills Pro",
    description: "Learn essential communication techniques for professional success.",
    category: "Communication",
    rating: 4.8,
    url: "https://youtube.com/watch?v=example1"
  },
  {
    id: "2", 
    title: "Building High-Performance Teams",
    thumbnail: "/placeholder.jpg",
    duration: "18:45",
    views: "890K views",
    channel: "Leadership Academy",
    description: "Strategies for creating and managing effective teams.",
    category: "Team Building",
    rating: 4.9,
    url: "https://youtube.com/watch?v=example2"
  },
  {
    id: "3",
    title: "Emotional Intelligence at Work",
    thumbnail: "/placeholder.jpg",
    duration: "15:22",
    views: "654K views", 
    channel: "Professional Development",
    description: "Develop emotional intelligence for better workplace relationships.",
    category: "Personal Development",
    rating: 4.7,
    url: "https://youtube.com/watch?v=example3"
  },
  {
    id: "4",
    title: "Conflict Resolution Techniques",
    thumbnail: "/placeholder.jpg",
    duration: "20:15",
    views: "432K views",
    channel: "HR Solutions",
    description: "Master conflict resolution skills for a harmonious workplace.",
    category: "Communication",
    rating: 4.6,
    url: "https://youtube.com/watch?v=example4"
  },
  {
    id: "5",
    title: "Time Management Mastery",
    thumbnail: "/placeholder.jpg",
    duration: "16:30",
    views: "1.8M views",
    channel: "Productivity Plus",
    description: "Boost productivity with proven time management strategies.",
    category: "Productivity",
    rating: 4.8,
    url: "https://youtube.com/watch?v=example5"
  },
  {
    id: "6",
    title: "Leadership in Digital Age",
    thumbnail: "/placeholder.jpg",
    duration: "22:18",
    views: "723K views",
    channel: "Modern Leadership",
    description: "Adapt your leadership style for remote and hybrid teams.",
    category: "Leadership",
    rating: 4.9,
    url: "https://youtube.com/watch?v=example6"
  },
]

const enrolledCourses = [
  {
    id: "C001",
    title: "Advanced Project Management",
    instructor: "Sarah Mitchell",
    progress: 75,
    totalLessons: 12,
    completedLessons: 9,
    enrolled: 45,
    category: "Management",
    difficulty: "Advanced",
    estimatedTime: "8 hours",
    rating: 4.8
  },
  {
    id: "C002", 
    title: "Customer Service Excellence",
    instructor: "Mike Rodriguez",
    progress: 100,
    totalLessons: 8,
    completedLessons: 8,
    enrolled: 67,
    category: "Customer Service",
    difficulty: "Intermediate",
    estimatedTime: "6 hours",
    rating: 4.9
  },
  {
    id: "C003",
    title: "Data Analysis Fundamentals", 
    instructor: "Emily Chen",
    progress: 40,
    totalLessons: 15,
    completedLessons: 6,
    enrolled: 23,
    category: "Analytics",
    difficulty: "Beginner",
    estimatedTime: "12 hours",
    rating: 4.7
  },
]

const skillCategories = [
  { name: "Communication", count: 8, color: "bg-blue-100 text-blue-700" },
  { name: "Leadership", count: 6, color: "bg-purple-100 text-purple-700" },
  { name: "Team Building", count: 5, color: "bg-green-100 text-green-700" },
  { name: "Personal Development", count: 7, color: "bg-yellow-100 text-yellow-700" },
  { name: "Productivity", count: 4, color: "bg-pink-100 text-pink-700" },
  { name: "Management", count: 3, color: "bg-indigo-100 text-indigo-700" },
]

export default function TrainingPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredVideos = recommendedVideos.filter(video => {
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Training & Development</h1>
          <p className="text-muted-foreground">
            Enhance employee skills with curated training content and development programs.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
          <Button size="sm">
            <GraduationCap className="mr-2 h-4 w-4" />
            Create Program
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {trainingStats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {stat.changeType === "increase" && (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                )}
                <span className={
                  stat.changeType === "increase" ? "text-green-500" : ""
                }>
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="recommendations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommendations">Video Recommendations</TabsTrigger>
          <TabsTrigger value="courses">Company Courses</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          <TabsTrigger value="skills">Skill Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recommended Training Videos</CardTitle>
                  <CardDescription>
                    Curated YouTube content for professional development and skill enhancement
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search videos..." 
                      className="pl-8 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Communication">Communication</SelectItem>
                      <SelectItem value="Team Building">Team Building</SelectItem>
                      <SelectItem value="Leadership">Leadership</SelectItem>
                      <SelectItem value="Personal Development">Personal Development</SelectItem>
                      <SelectItem value="Productivity">Productivity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredVideos.map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge className={
                          video.category === "Communication" ? "bg-blue-500" :
                          video.category === "Team Building" ? "bg-green-500" :
                          video.category === "Leadership" ? "bg-purple-500" :
                          video.category === "Personal Development" ? "bg-yellow-500" :
                          "bg-pink-500"
                        }>
                          {video.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {video.channel}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {video.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{video.views}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{video.rating}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" className="flex-1">
                            <Play className="mr-2 h-4 w-4" />
                            Watch
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Training Courses</CardTitle>
              <CardDescription>
                Internal training programs and their enrollment status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-lg">{course.title}</div>
                        <div className="text-sm text-muted-foreground">
                          Instructor: {course.instructor} &bull; {course.enrolled} enrolled
                        </div>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="outline">{course.category}</Badge>
                          <Badge variant="secondary">{course.difficulty}</Badge>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{course.estimatedTime}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-sm font-medium">
                        {course.completedLessons}/{course.totalLessons} lessons
                      </div>
                      <div className="w-32">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Play className="mr-2 h-4 w-4" />
                        Continue
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Progress Analytics</CardTitle>
              <CardDescription>
                Track employee learning progress and course completion rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Training progress analytics will be displayed here.</p>
                <p className="text-sm">Track completion rates, learning paths, and skill development.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skill Development Categories</CardTitle>
              <CardDescription>
                Browse training content organized by skill areas and competencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {skillCategories.map((category) => (
                  <Card key={category.name} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {category.count} training resources
                          </p>
                        </div>
                        <Badge className={category.color}>
                          {category.count}
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <Button size="sm" variant="outline" className="w-full">
                          Explore Category
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

