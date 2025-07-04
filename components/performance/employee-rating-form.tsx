"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Star,
  Save,
  X,
  Plus,
  Target,
  TrendingUp,
  Award,
  MessageSquare,
  Calendar,
  User,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { PerformanceRating, PerformanceSystem } from "@/lib/performance-system"
import { User as AuthUser } from "@/lib/auth"

interface EmployeeRatingFormProps {
  employee: any
  evaluator: AuthUser
  existingRating?: PerformanceRating
  onSave: (rating: PerformanceRating) => void
  onCancel: () => void
  isOpen: boolean
}

export function EmployeeRatingForm({ 
  employee, 
  evaluator, 
  existingRating, 
  onSave, 
  onCancel, 
  isOpen 
}: EmployeeRatingFormProps) {
  const [rating, setRating] = useState<Partial<PerformanceRating>>(
    existingRating || {
      employeeName: employee.name,
      period: `Q${Math.ceil((new Date().getMonth() + 1) / 3)} ${new Date().getFullYear()}`,
      overallScore: 0,
      categories: [
        { name: 'Technical Skills', score: 0, weight: 30, comments: '' },
        { name: 'Communication', score: 0, weight: 20, comments: '' },
        { name: 'Leadership', score: 0, weight: 15, comments: '' },
        { name: 'Innovation', score: 0, weight: 20, comments: '' },
        { name: 'Reliability', score: 0, weight: 15, comments: '' }
      ],
      goals: [],
      strengths: [],
      areasForImprovement: [],
      comments: '',
      status: 'draft'
    }
  )

  const calculateOverallScore = () => {
    if (!rating.categories) return 0
    
    let weightedSum = 0
    let totalWeight = 0
    
    rating.categories.forEach(category => {
      weightedSum += category.score * (category.weight / 100)
      totalWeight += category.weight / 100
    })
    
    return Math.round((weightedSum / totalWeight) * 10) / 10
  }

  const updateCategoryScore = (index: number, score: number) => {
    const newCategories = [...(rating.categories || [])]
    newCategories[index].score = score
    setRating({ ...rating, categories: newCategories })
  }

  const updateCategoryComments = (index: number, comments: string) => {
    const newCategories = [...(rating.categories || [])]
    newCategories[index].comments = comments
    setRating({ ...rating, categories: newCategories })
  }

  const addGoal = () => {
    const newGoals = [...(rating.goals || [])]
    newGoals.push({
      title: '',
      description: '',
      status: 'not_started' as const
    })
    setRating({ ...rating, goals: newGoals })
  }

  const updateGoal = (index: number, field: string, value: string) => {
    const newGoals = [...(rating.goals || [])]
    newGoals[index] = { ...newGoals[index], [field]: value }
    setRating({ ...rating, goals: newGoals })
  }

  const removeGoal = (index: number) => {
    const newGoals = [...(rating.goals || [])]
    newGoals.splice(index, 1)
    setRating({ ...rating, goals: newGoals })
  }

  const addStrength = () => {
    const newStrengths = [...(rating.strengths || []), '']
    setRating({ ...rating, strengths: newStrengths })
  }

  const updateStrength = (index: number, value: string) => {
    const newStrengths = [...(rating.strengths || [])]
    newStrengths[index] = value
    setRating({ ...rating, strengths: newStrengths })
  }

  const removeStrength = (index: number) => {
    const newStrengths = [...(rating.strengths || [])]
    newStrengths.splice(index, 1)
    setRating({ ...rating, strengths: newStrengths })
  }

  const addImprovement = () => {
    const newImprovements = [...(rating.areasForImprovement || []), '']
    setRating({ ...rating, areasForImprovement: newImprovements })
  }

  const updateImprovement = (index: number, value: string) => {
    const newImprovements = [...(rating.areasForImprovement || [])]
    newImprovements[index] = value
    setRating({ ...rating, areasForImprovement: newImprovements })
  }

  const removeImprovement = (index: number) => {
    const newImprovements = [...(rating.areasForImprovement || [])]
    newImprovements.splice(index, 1)
    setRating({ ...rating, areasForImprovement: newImprovements })
  }

  const handleSave = () => {
    const finalRating = {
      ...rating,
      overallScore: calculateOverallScore(),
      updatedAt: new Date()
    }

    if (existingRating) {
      const updated = PerformanceSystem.updatePerformanceRating(
        existingRating.id, 
        finalRating
      )
      if (updated) onSave(updated)
    } else {
      const created = PerformanceSystem.createPerformanceRating(
        evaluator,
        employee.id,
        finalRating
      )
      onSave(created)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-green-600"
    if (score >= 3.5) return "text-blue-600"
    if (score >= 2.5) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 4.5) return "Outstanding"
    if (score >= 3.5) return "Exceeds Expectations"
    if (score >= 2.5) return "Meets Expectations"
    if (score >= 1.5) return "Below Expectations"
    return "Needs Improvement"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Performance Evaluation: {employee.name}</span>
          </DialogTitle>
          <DialogDescription>
            Evaluate {employee.name}'s performance for {rating.period}. 
            Department: {employee.department} | Role: {employee.role}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="scores" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scores">Scores</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="scores" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Performance Categories</span>
                </CardTitle>
                <CardDescription>
                  Rate the employee's performance in each category (1-5 scale)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {rating.categories?.map((category, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{category.name}</h4>
                        <p className="text-sm text-muted-foreground">Weight: {category.weight}%</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(category.score)}`}>
                          {category.score.toFixed(1)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {getScoreLabel(category.score)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Score (1-5)</Label>
                      <Slider
                        value={[category.score]}
                        onValueChange={(value) => updateCategoryScore(index, value[0])}
                        max={5}
                        min={1}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Poor</span>
                        <span>Fair</span>
                        <span>Good</span>
                        <span>Excellent</span>
                        <span>Outstanding</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Comments</Label>
                      <Textarea
                        placeholder={`Provide specific feedback for ${category.name.toLowerCase()}...`}
                        value={category.comments || ''}
                        onChange={(e) => updateCategoryComments(index, e.target.value)}
                      />
                    </div>
                  </div>
                ))}

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-800">Overall Score</h4>
                      <p className="text-sm text-blue-600">Weighted average based on category scores</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getScoreColor(calculateOverallScore())}`}>
                        {calculateOverallScore().toFixed(1)}
                      </div>
                      <p className="text-sm text-blue-600">
                        {getScoreLabel(calculateOverallScore())}
                      </p>
                    </div>
                  </div>
                  <Progress 
                    value={calculateOverallScore() * 20} 
                    className="mt-3 h-3"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Performance Goals</span>
                  </div>
                  <Button onClick={addGoal} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Goal
                  </Button>
                </CardTitle>
                <CardDescription>
                  Set and track performance goals for the evaluation period
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {rating.goals?.map((goal, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Goal title..."
                        value={goal.title}
                        onChange={(e) => updateGoal(index, 'title', e.target.value)}
                        className="flex-1 mr-4"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeGoal(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Textarea
                      placeholder="Goal description and success criteria..."
                      value={goal.description}
                      onChange={(e) => updateGoal(index, 'description', e.target.value)}
                    />
                    
                    <Select 
                      value={goal.status}
                      onValueChange={(value) => updateGoal(index, 'status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not_started">Not Started</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="exceeded">Exceeded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
                
                {(!rating.goals || rating.goals.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No goals set yet. Click "Add Goal" to get started.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-600">
                    <TrendingUp className="h-5 w-5" />
                    <span>Strengths</span>
                  </CardTitle>
                  <CardDescription>
                    Key strengths and positive attributes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rating.strengths?.map((strength, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="Add a strength..."
                        value={strength}
                        onChange={(e) => updateStrength(index, e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeStrength(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    onClick={addStrength}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Strength
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-orange-600">
                    <AlertCircle className="h-5 w-5" />
                    <span>Areas for Improvement</span>
                  </CardTitle>
                  <CardDescription>
                    Areas that need development or improvement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rating.areasForImprovement?.map((area, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="Add an area for improvement..."
                        value={area}
                        onChange={(e) => updateImprovement(index, e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeImprovement(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    onClick={addImprovement}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Area for Improvement
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Overall Comments</span>
                </CardTitle>
                <CardDescription>
                  Provide comprehensive feedback and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Share your overall assessment, recommendations for development, and any additional feedback..."
                  value={rating.comments || ''}
                  onChange={(e) => setRating({ ...rating, comments: e.target.value })}
                  rows={6}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Evaluation Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <div className={`text-3xl font-bold ${getScoreColor(calculateOverallScore())}`}>
                      {calculateOverallScore().toFixed(1)}
                    </div>
                    <p className="text-sm text-muted-foreground">Overall Score</p>
                    <Badge variant="outline" className="mt-2">
                      {getScoreLabel(calculateOverallScore())}
                    </Badge>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {rating.goals?.filter(g => g.status === 'completed').length || 0}
                    </div>
                    <p className="text-sm text-muted-foreground">Goals Completed</p>
                    <Badge variant="outline" className="mt-2">
                      of {rating.goals?.length || 0} total
                    </Badge>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {rating.strengths?.length || 0}
                    </div>
                    <p className="text-sm text-muted-foreground">Key Strengths</p>
                    <Badge variant="outline" className="mt-2">
                      Identified
                    </Badge>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-600">Top Performing Categories</h4>
                    {rating.categories
                      ?.sort((a, b) => b.score - a.score)
                      .slice(0, 3)
                      .map((category, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="text-sm">{category.name}</span>
                          <span className="font-medium">{category.score.toFixed(1)}</span>
                        </div>
                      ))}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-orange-600">Development Opportunities</h4>
                    {rating.categories
                      ?.sort((a, b) => a.score - b.score)
                      .slice(0, 3)
                      .map((category, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-orange-50 rounded">
                          <span className="text-sm">{category.name}</span>
                          <span className="font-medium">{category.score.toFixed(1)}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Review Status</h4>
                  <div className="flex items-center space-x-4">
                    <Select 
                      value={rating.status}
                      onValueChange={(value) => setRating({ ...rating, status: value as any })}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="submitted">Submit for Approval</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="text-sm text-blue-600">
                      {rating.status === 'draft' && 'Save as draft to continue later'}
                      {rating.status === 'submitted' && 'Submit for HR approval'}
                      {rating.status === 'approved' && 'Final approved evaluation'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>{existingRating ? 'Update' : 'Save'} Evaluation</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 