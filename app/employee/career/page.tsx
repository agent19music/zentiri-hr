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
  Plus
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

export default function CareerPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [goalDialogOpen, setGoalDialogOpen] = useState(false)

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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
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