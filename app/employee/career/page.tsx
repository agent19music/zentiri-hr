"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Target, 
  TrendingUp, 
  Award, 
  Calendar,
  CheckCircle2,
  ArrowRight,
  Star,
  BookOpen,
  Users,
  Clock,
  Briefcase,
  Trophy,
  Lightbulb,
  MapPin,
  ChevronRight,
  Plus,
  BarChart3,
  MessageSquare,
  UserCheck,
  TrendingDown,
  AlertCircle,
  Play,
  Monitor,
  Eye,
  ThumbsUp
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

// Mock career data
const currentRole = {
  title: "Senior Software Engineer",
  level: "L4",
  department: "Engineering",
  startDate: "2022-03-15",
  timeInRole: "1 year, 9 months",
  manager: "Sarah Johnson",
  nextReviewDate: "2024-06-15"
}

const careerLadder = [
  {
    level: "L3",
    title: "Software Engineer",
    description: "Entry level engineering role with mentorship",
    completed: true,
    current: false,
    requirements: ["Bachelor's degree", "1+ years experience", "Basic programming skills"],
    skills: ["JavaScript", "React", "Node.js", "Git"],
    averageTime: "18 months"
  },
  {
    level: "L4", 
    title: "Senior Software Engineer",
    description: "Lead technical projects and mentor junior developers",
    completed: false,
    current: true,
    requirements: ["3+ years experience", "Technical leadership", "Mentoring experience"],
    skills: ["System Design", "Team Leadership", "Code Review", "Architecture"],
    averageTime: "24 months",
    progress: 65
  },
  {
    level: "L5",
    title: "Staff Software Engineer", 
    description: "Drive technical direction and cross-team initiatives",
    completed: false,
    current: false,
    requirements: ["5+ years experience", "Technical expertise", "Strategic thinking"],
    skills: ["System Architecture", "Technical Strategy", "Cross-team Leadership"],
    averageTime: "30 months"
  },
  {
    level: "L6",
    title: "Principal Engineer",
    description: "Define technical standards and lead organization-wide initiatives",
    completed: false,
    current: false,
    requirements: ["8+ years experience", "Technical vision", "Industry recognition"],
    skills: ["Technical Vision", "Industry Leadership", "Innovation"],
    averageTime: "36+ months"
  }
]

const skillAssessments = [
  {
    category: "Technical Skills",
    skills: [
      { name: "JavaScript/TypeScript", current: 85, target: 90, required: 80 },
      { name: "React/Frontend", current: 90, target: 95, required: 85 },
      { name: "System Design", current: 70, target: 85, required: 75 },
      { name: "Database Design", current: 75, target: 80, required: 70 },
      { name: "DevOps/CI/CD", current: 60, target: 75, required: 65 }
    ]
  },
  {
    category: "Leadership Skills",
    skills: [
      { name: "Team Leadership", current: 75, target: 85, required: 80 },
      { name: "Mentoring", current: 80, target: 90, required: 75 },
      { name: "Communication", current: 85, target: 90, required: 80 },
      { name: "Project Management", current: 70, target: 80, required: 75 }
    ]
  }
]

const developmentGoals = [
  {
    id: "1",
    title: "Complete System Design Course",
    description: "Improve system architecture and design skills",
    category: "Technical",
    progress: 40,
    deadline: "2024-04-30",
    status: "in_progress",
    relatedSkills: ["System Design", "Architecture"]
  },
  {
    id: "2", 
    title: "Lead Cross-team Project",
    description: "Take ownership of a project involving multiple teams",
    category: "Leadership",
    progress: 20,
    deadline: "2024-06-30",
    status: "in_progress",
    relatedSkills: ["Team Leadership", "Project Management"]
  },
  {
    id: "3",
    title: "Mentor 2 Junior Developers",
    description: "Provide guidance and support to junior team members",
    category: "Leadership", 
    progress: 80,
    deadline: "2024-03-31",
    status: "in_progress",
    relatedSkills: ["Mentoring", "Communication"]
  }
]

const learningPaths = [
  {
    id: "1",
    title: "Technical Leadership Track",
    description: "Develop skills needed for senior technical roles",
    duration: "6 months",
    courses: 8,
    progress: 35,
    recommended: true
  },
  {
    id: "2",
    title: "System Architecture Mastery", 
    description: "Deep dive into distributed systems and architecture",
    duration: "4 months",
    courses: 6,
    progress: 0,
    recommended: true
  },
  {
    id: "3",
    title: "Engineering Management",
    description: "Transition into people management roles",
    duration: "8 months", 
    courses: 10,
    progress: 0,
    recommended: false
  }
]

// Video recommendations for career development by department
type VideoRecommendation = {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  level: string;
  rating: number;
  views: string;
  thumbnail: string;
  description: string;
  tags: string[];
  url: string;
}

const videoRecommendations: Record<string, VideoRecommendation[]> = {
  "Engineering": [
    {
      id: "1",
      title: "Advanced System Design Patterns",
      instructor: "Martin Fowler",
      duration: "45 min",
      level: "Advanced",
      rating: 4.8,
      views: "15.2k",
      thumbnail: "📐",
      description: "Learn scalable architecture patterns for modern applications",
      tags: ["Architecture", "Design Patterns", "Scalability"],
      url: "#"
    },
    {
      id: "2", 
      title: "Microservices Best Practices",
      instructor: "Sam Newman",
      duration: "35 min",
      level: "Intermediate",
      rating: 4.6,
      views: "12.8k",
      thumbnail: "⚙️",
      description: "Essential patterns for building and maintaining microservices",
      tags: ["Microservices", "Architecture", "DevOps"],
      url: "#"
    },
    {
      id: "3",
      title: "Technical Leadership Skills",
      instructor: "Sarah Drasner",
      duration: "28 min", 
      level: "Intermediate",
      rating: 4.9,
      views: "18.5k",
      thumbnail: "👥",
      description: "Transitioning from individual contributor to technical leader",
      tags: ["Leadership", "Management", "Communication"],
      url: "#"
    }
  ],
  "Product": [
    {
      id: "4",
      title: "Product Strategy Fundamentals",
      instructor: "Marty Cagan",
      duration: "52 min",
      level: "Intermediate",
      rating: 4.7,
      views: "22.1k",
      thumbnail: "🎯",
      description: "Building products that customers love",
      tags: ["Strategy", "Product Management", "Customer Research"],
      url: "#"
    },
    {
      id: "5",
      title: "Data-Driven Product Decisions", 
      instructor: "Julie Zhuo",
      duration: "38 min",
      level: "Intermediate",
      rating: 4.5,
      views: "9.3k",
      thumbnail: "📊",
      description: "Using analytics and metrics to guide product development",
      tags: ["Analytics", "Decision Making", "Metrics"],
      url: "#"
    }
  ],
  "Design": [
    {
      id: "6",
      title: "Design Systems at Scale",
      instructor: "Brad Frost",
      duration: "42 min",
      level: "Advanced",
      rating: 4.8,
      views: "14.7k",
      thumbnail: "🎨",
      description: "Creating and maintaining design systems for large organizations",
      tags: ["Design Systems", "UI/UX", "Scalability"],
      url: "#"
    },
    {
      id: "7",
      title: "User Research Methods",
      instructor: "Steve Krug",
      duration: "33 min",
      level: "Beginner",
      rating: 4.6,
      views: "11.2k", 
      thumbnail: "🔍",
      description: "Practical techniques for understanding user needs",
      tags: ["User Research", "UX", "Testing"],
      url: "#"
    }
  ],
  "Marketing": [
    {
      id: "8",
      title: "Growth Marketing Strategies",
      instructor: "Sean Ellis",
      duration: "47 min",
      level: "Intermediate",
      rating: 4.7,
      views: "16.8k",
      thumbnail: "📈",
      description: "Proven tactics for sustainable business growth",
      tags: ["Growth Marketing", "Analytics", "Conversion"],
      url: "#"
    },
    {
      id: "9",
      title: "Content Marketing Excellence",
      instructor: "Ann Handley",
      duration: "39 min",
      level: "Intermediate", 
      rating: 4.5,
      views: "13.4k",
      thumbnail: "✍️",
      description: "Creating content that drives engagement and conversions",
      tags: ["Content Marketing", "Writing", "Strategy"],
      url: "#"
    }
  ],
  "Sales": [
    {
      id: "10",
      title: "Consultative Selling Techniques",
      instructor: "Challenger Sale Team",
      duration: "44 min",
      level: "Advanced",
      rating: 4.8,
      views: "19.3k",
      thumbnail: "🤝",
      description: "Advanced techniques for complex B2B sales",
      tags: ["Sales Techniques", "Negotiation", "Consulting"],
      url: "#"
    },
    {
      id: "11",
      title: "CRM Optimization Strategies",
      instructor: "HubSpot Academy",
      duration: "31 min",
      level: "Intermediate",
      rating: 4.4,
      views: "8.7k",
      thumbnail: "📋",
      description: "Maximizing your CRM for better sales performance", 
      tags: ["CRM", "Sales Process", "Technology"],
      url: "#"
    }
  ]
}

// Performance data
const performanceReviews = [
  {
    id: "1",
    period: "2024 Q3",
    rating: 4.2,
    maxRating: 5.0,
    status: "Completed",
    reviewer: "Sarah Johnson",
    reviewDate: "2024-10-15",
    summary: "Excellent technical contributions and strong leadership in mentoring junior developers.",
    keyAchievements: [
      "Led successful migration to new architecture",
      "Mentored 3 junior developers",
      "Reduced system downtime by 30%"
    ],
    areasForImprovement: [
      "Cross-team communication",
      "Project documentation"
    ],
    goalsForNextPeriod: [
      "Lead cross-functional project",
      "Complete system design certification"
    ]
  },
  {
    id: "2", 
    period: "2024 Q2",
    rating: 4.0,
    maxRating: 5.0,
    status: "Completed",
    reviewer: "Sarah Johnson", 
    reviewDate: "2024-07-15",
    summary: "Strong performance with consistent delivery and good technical skills.",
    keyAchievements: [
      "Delivered 3 major features on time",
      "Improved code review quality",
      "Enhanced team productivity"
    ],
    areasForImprovement: [
      "Technical leadership",
      "System design skills"
    ],
    goalsForNextPeriod: [
      "Take on leadership role in next project",
      "Complete system design course"
    ]
  },
  {
    id: "3",
    period: "2024 Q1", 
    rating: 3.8,
    maxRating: 5.0,
    status: "Completed",
    reviewer: "Sarah Johnson",
    reviewDate: "2024-04-15", 
    summary: "Good technical performance with room for growth in leadership areas.",
    keyAchievements: [
      "Successfully delivered quarterly milestones",
      "Improved testing coverage by 25%",
      "Collaborated well with team"
    ],
    areasForImprovement: [
      "Initiative taking",
      "Code architecture decisions"
    ],
    goalsForNextPeriod: [
      "Lead a small project",
      "Mentor a junior developer"
    ]
  }
]

const performanceMetrics = {
  overall: {
    currentRating: 4.2,
    previousRating: 4.0,
    trend: "improving",
    percentile: 85
  },
  categories: [
    { name: "Technical Skills", score: 4.3, target: 4.5, trend: "stable" },
    { name: "Collaboration", score: 4.1, target: 4.2, trend: "improving" },
    { name: "Leadership", score: 3.9, target: 4.3, trend: "improving" },
    { name: "Innovation", score: 4.0, target: 4.0, trend: "stable" },
    { name: "Delivery", score: 4.4, target: 4.5, trend: "improving" }
  ]
}

const feedback = [
  {
    id: "1",
    type: "peer",
    from: "Michael Chen",
    role: "Senior Engineer",
    date: "2024-11-20",
    rating: 4.5,
    comment: "Great collaboration on the API redesign project. Clear communication and excellent problem-solving skills.",
    category: "Technical Skills"
  },
  {
    id: "2", 
    type: "direct_report",
    from: "Emma Davis",
    role: "Junior Developer",
    date: "2024-11-15", 
    rating: 4.8,
    comment: "Incredibly helpful mentor. Takes time to explain concepts clearly and provides constructive feedback.",
    category: "Leadership"
  },
  {
    id: "3",
    type: "manager",
    from: "Sarah Johnson", 
    role: "Engineering Manager",
    date: "2024-11-10",
    rating: 4.2,
    comment: "Consistently delivers high-quality work. Would like to see more initiative in proposing new solutions.",
    category: "Initiative"
  }
]

export default function CareerPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [goalDialogOpen, setGoalDialogOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState("Engineering")

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getSkillColor = (current: number, target: number, required: number) => {
    if (current >= target) return "text-green-600"
    if (current >= required) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Career Development</h1>
          <p className="text-muted-foreground mt-1">
            Track your career progression and plan your professional growth
          </p>
        </div>
        <Button onClick={() => setGoalDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Goal
        </Button>
      </div>

      {/* Current Role Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{currentRole.title}</CardTitle>
              <CardDescription className="text-lg font-medium text-blue-700">
                Level {currentRole.level} • {currentRole.department}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              Current Role
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Time in Role</div>
                <div className="text-sm text-muted-foreground">{currentRole.timeInRole}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Manager</div>
                <div className="text-sm text-muted-foreground">{currentRole.manager}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Next Review</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(currentRole.nextReviewDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Performance</div>
                <div className="text-sm text-green-600 font-medium">Exceeds Expectations</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="ladder">Career Ladder</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Development Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Development Goals
              </CardTitle>
              <CardDescription>Track your progress towards career objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {developmentGoals.map((goal) => (
                  <div key={goal.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{goal.title}</h3>
                      <Badge variant="outline">{goal.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex space-x-1">
                        {goal.relatedSkills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Level Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65%</div>
                <Progress value={65} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  To Staff Engineer (L5)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{developmentGoals.length}</div>
                <p className="text-xs text-muted-foreground">
                  {developmentGoals.filter(g => g.progress >= 80).length} near completion
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24h</div>
                <p className="text-xs text-muted-foreground">
                  This quarter
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Overview */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.overall.currentRating}/5.0</div>
                <div className={`text-xs flex items-center mt-1 ${
                  performanceMetrics.overall.trend === 'improving' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {performanceMetrics.overall.trend === 'improving' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {performanceMetrics.overall.trend === 'improving' ? '+0.2' : '0.0'} from last review
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Percentile Rank</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.overall.percentile}th</div>
                <p className="text-xs text-muted-foreground">Top {100 - performanceMetrics.overall.percentile}% of team</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reviews Completed</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceReviews.length}</div>
                <p className="text-xs text-muted-foreground">This year</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Feedback Score</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">From {feedback.length} sources</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Categories</CardTitle>
              <CardDescription>Your performance across key competency areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.categories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.name}</span>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="font-medium">{category.score}/5.0</span>
                        <span className="text-muted-foreground">Target: {category.target}</span>
                        <div className={`flex items-center ${
                          category.trend === 'improving' ? 'text-green-600' : 
                          category.trend === 'declining' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {category.trend === 'improving' ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : category.trend === 'declining' ? (
                            <TrendingDown className="h-3 w-3" />
                          ) : (
                            <div className="h-3 w-3 rounded-full bg-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                    <Progress value={(category.score / 5) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Performance Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Reviews</CardTitle>
              <CardDescription>Your recent performance review history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceReviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{review.period} Performance Review</h3>
                        <p className="text-sm text-muted-foreground">
                          Reviewed by {review.reviewer} on {new Date(review.reviewDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{review.rating}/5.0</div>
                        <Badge variant="outline" className="text-xs">
                          {review.status}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm mb-4">{review.summary}</p>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-green-700">Key Achievements</h4>
                        <ul className="text-sm space-y-1">
                          {review.keyAchievements.map((achievement, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <CheckCircle2 className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2 text-yellow-700">Areas for Improvement</h4>
                        <ul className="text-sm space-y-1">
                          {review.areasForImprovement.map((area, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <AlertCircle className="h-3 w-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2 text-blue-700">Goals for Next Period</h4>
                        <ul className="text-sm space-y-1">
                          {review.goalsForNextPeriod.map((goal, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <Target className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span>{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>360° Feedback</CardTitle>
              <CardDescription>Recent feedback from colleagues, managers, and direct reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedback.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <UserCheck className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{item.from}</span>
                        <Badge variant="outline" className="text-xs">
                          {item.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.comment}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.category}</span>
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ladder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Engineering Career Ladder</CardTitle>
              <CardDescription>Your progression path within the engineering organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {careerLadder.map((role, index) => (
                  <div key={role.level} className="relative mb-8 last:mb-0">
                    {/* Connection Line */}
                    {index < careerLadder.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200" />
                    )}
                    
                    <div className={`flex items-start space-x-4 ${
                      role.current ? 'bg-blue-50 border border-blue-200 rounded-lg p-4' : ''
                    }`}>
                      {/* Status Icon */}
                      <div className={`relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        role.completed ? 'bg-green-500' :
                        role.current ? 'bg-blue-500' : 'bg-gray-200'
                      }`}>
                        {role.completed ? (
                          <CheckCircle2 className="h-6 w-6 text-white" />
                        ) : role.current ? (
                          <Target className="h-6 w-6 text-white" />
                        ) : (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        )}
                      </div>

                      {/* Role Details */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{role.title}</h3>
                            <p className="text-sm text-muted-foreground">{role.level} • {role.description}</p>
                          </div>
                          {role.current && (
                            <Badge className="bg-blue-500">Current Role</Badge>
                          )}
                        </div>

                        {/* Progress Bar for Current Role */}
                        {role.current && role.progress && (
                          <div className="mt-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress to next level</span>
                              <span>{role.progress}%</span>
                            </div>
                            <Progress value={role.progress} className="h-2" />
                          </div>
                        )}

                        {/* Requirements and Skills */}
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Requirements</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {role.requirements.map((req, i) => (
                                <li key={i} className="flex items-center space-x-2">
                                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Key Skills</h4>
                            <div className="flex flex-wrap gap-1">
                              {role.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 text-sm text-muted-foreground">
                          Average time in level: {role.averageTime}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          {skillAssessments.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
                <CardDescription>Current proficiency and development targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{skill.name}</h3>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className={getSkillColor(skill.current, skill.target, skill.required)}>
                            Current: {skill.current}%
                          </span>
                          <span className="text-muted-foreground">
                            Target: {skill.target}%
                          </span>
                          <span className="text-muted-foreground">
                            Required: {skill.required}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="relative">
                        {/* Background bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          {/* Current progress */}
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(skill.current)}`}
                            style={{ width: `${skill.current}%` }}
                          />
                        </div>
                        
                        {/* Target marker */}
                        <div 
                          className="absolute top-0 w-0.5 h-2 bg-blue-500"
                          style={{ left: `${skill.target}%` }}
                        />
                        
                        {/* Required marker */}
                        <div 
                          className="absolute top-0 w-0.5 h-2 bg-yellow-500"
                          style={{ left: `${skill.required}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          {/* Learning Paths */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Recommended Learning Paths
              </CardTitle>
              <CardDescription>Curated learning paths to advance your career</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {learningPaths.map((path) => (
                  <Card key={path.id} className={`hover:shadow-md transition-shadow ${
                    path.recommended ? 'ring-2 ring-blue-200' : ''
                  }`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{path.title}</CardTitle>
                        {path.recommended && (
                          <Badge className="bg-blue-500">Recommended</Badge>
                        )}
                      </div>
                      <CardDescription>{path.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{path.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <BookOpen className="h-3 w-3" />
                            <span>{path.courses} courses</span>
                          </span>
                        </div>
                        
                        {path.progress > 0 && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{path.progress}%</span>
                            </div>
                            <Progress value={path.progress} className="h-2" />
                          </div>
                        )}
                        
                        <Button 
                          className="w-full" 
                          variant={path.progress > 0 ? "default" : "outline"}
                        >
                          {path.progress > 0 ? "Continue Learning" : "Start Path"}
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Video Recommendations by Department */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Video Training Library
              </CardTitle>
              <CardDescription>Expert-led video content for professional development by department</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Department Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.keys(videoRecommendations).map((dept) => (
                  <Button
                    key={dept}
                    variant={selectedDepartment === dept ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDepartment(dept)}
                  >
                    {dept}
                  </Button>
                ))}
              </div>

                             {/* Video Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {videoRecommendations[selectedDepartment]?.map((video: VideoRecommendation) => (
                  <Card key={video.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                    <CardContent className="p-0">
                      {/* Video Thumbnail */}
                      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 h-40 flex items-center justify-center rounded-t-lg">
                        <div className="text-4xl mb-2">{video.thumbnail}</div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg">
                          <Play className="h-12 w-12 text-white" />
                        </div>
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="text-xs">
                            {video.level}
                          </Badge>
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{video.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">by {video.instructor}</p>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{video.description}</p>
                        
                        {/* Video Stats */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{video.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{video.views}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-3 w-3" />
                            <span>97%</span>
                          </div>
                        </div>

                                                 {/* Tags */}
                         <div className="flex flex-wrap gap-1 mb-3">
                           {video.tags.slice(0, 3).map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Watch Button */}
                        <Button className="w-full" size="sm">
                          <Play className="h-3 w-3 mr-2" />
                          Watch Now
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

      {/* Add Goal Dialog */}
      <Dialog open={goalDialogOpen} onOpenChange={setGoalDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Development Goal</DialogTitle>
            <DialogDescription>
              Create a new goal to track your professional development
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8 text-muted-foreground">
            Goal creation form would go here...
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGoalDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setGoalDialogOpen(false)}>
              Create Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 