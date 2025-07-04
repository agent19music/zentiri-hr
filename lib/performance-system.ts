import { User } from './auth'

export interface PerformanceRating {
  id: string
  employeeId: string
  employeeName: string
  evaluatorId: string
  evaluatorName: string
  period: string
  overallScore: number
  categories: {
    name: string
    score: number
    weight: number
    comments?: string
  }[]
  goals: {
    title: string
    status: 'not_started' | 'in_progress' | 'completed' | 'exceeded'
    description: string
  }[]
  strengths: string[]
  areasForImprovement: string[]
  comments: string
  status: 'draft' | 'submitted' | 'approved'
  createdAt: Date
  updatedAt: Date
  reviewDate: Date
  nextReviewDate: Date
}

export interface PerformanceMetrics {
  employeeId: string
  currentScore: number
  previousScore?: number
  trend: 'improving' | 'declining' | 'stable'
  rankInDepartment: number
  totalInDepartment: number
  lastReviewDate: Date
  nextReviewDate: Date
}

export class PerformanceSystem {
  // Mock data storage - in production would be in database
  private static ratings: PerformanceRating[] = [
    {
      id: 'perf_1',
      employeeId: 'emp_001',
      employeeName: 'Sarah Wilson',
      evaluatorId: 'mgr_001',
      evaluatorName: 'Jane Smith',
      period: 'Q4 2024',
      overallScore: 4.2,
      categories: [
        { name: 'Technical Skills', score: 4.5, weight: 30, comments: 'Excellent coding skills and problem-solving' },
        { name: 'Communication', score: 4.0, weight: 20, comments: 'Good team collaboration' },
        { name: 'Leadership', score: 3.8, weight: 15, comments: 'Shows potential, needs development' },
        { name: 'Innovation', score: 4.5, weight: 20, comments: 'Consistently brings creative solutions' },
        { name: 'Reliability', score: 4.2, weight: 15, comments: 'Very dependable team member' }
      ],
      goals: [
        { title: 'Complete React certification', status: 'completed', description: 'Earn advanced React developer certification' },
        { title: 'Lead junior developer mentoring', status: 'in_progress', description: 'Mentor 2 junior developers' },
        { title: 'Improve presentation skills', status: 'not_started', description: 'Take public speaking course' }
      ],
      strengths: ['Strong technical skills', 'Problem-solving abilities', 'Team collaboration'],
      areasForImprovement: ['Public speaking', 'Project management', 'Time estimation'],
      comments: 'Sarah is a valuable team member with strong technical skills. Focus on leadership development.',
      status: 'approved',
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-15'),
      reviewDate: new Date('2024-12-15'),
      nextReviewDate: new Date('2025-03-15')
    }
  ]

  static canEditPerformance(evaluator: User, employee: any): boolean {
    // Organization admins can edit anyone
    if (evaluator.role === 'org_admin') return true
    
    // HR managers can edit anyone in their organization
    if (evaluator.role === 'hr_manager') return true
    
    // Department managers can edit employees in their department
    if (evaluator.role === 'department_manager') {
      return employee.department === evaluator.department
    }
    
    // Team leads can edit their team members
    if (evaluator.role === 'team_lead') {
      return employee.team === evaluator.team
    }
    
    return false
  }

  static getPerformanceRating(employeeId: string): PerformanceRating | null {
    return this.ratings.find(r => r.employeeId === employeeId) || null
  }

  static getPerformanceMetrics(employeeId: string): PerformanceMetrics {
    const rating = this.getPerformanceRating(employeeId)
    const departmentRatings = this.ratings.filter(r => r.employeeId.startsWith('emp_'))
    
    return {
      employeeId,
      currentScore: rating?.overallScore || 0,
      previousScore: rating ? rating.overallScore - 0.2 : undefined,
      trend: rating ? (rating.overallScore > (rating.overallScore - 0.2) ? 'improving' : 'stable') : 'stable',
      rankInDepartment: Math.floor(Math.random() * 10) + 1,
      totalInDepartment: departmentRatings.length || 1,
      lastReviewDate: rating?.reviewDate || new Date(),
      nextReviewDate: rating?.nextReviewDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    }
  }

  static createPerformanceRating(
    evaluator: User, 
    employeeId: string, 
    ratingData: Partial<PerformanceRating>
  ): PerformanceRating {
    const newRating: PerformanceRating = {
      id: `perf_${Date.now()}`,
      employeeId,
      employeeName: ratingData.employeeName || 'Unknown',
      evaluatorId: evaluator.id,
      evaluatorName: evaluator.displayName,
      period: ratingData.period || `Q${Math.ceil((new Date().getMonth() + 1) / 3)} ${new Date().getFullYear()}`,
      overallScore: ratingData.overallScore || 0,
      categories: ratingData.categories || this.getDefaultCategories(),
      goals: ratingData.goals || [],
      strengths: ratingData.strengths || [],
      areasForImprovement: ratingData.areasForImprovement || [],
      comments: ratingData.comments || '',
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      reviewDate: new Date(),
      nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    }

    this.ratings.push(newRating)
    return newRating
  }

  static updatePerformanceRating(
    ratingId: string, 
    updates: Partial<PerformanceRating>
  ): PerformanceRating | null {
    const index = this.ratings.findIndex(r => r.id === ratingId)
    if (index === -1) return null

    this.ratings[index] = {
      ...this.ratings[index],
      ...updates,
      updatedAt: new Date()
    }

    // Recalculate overall score based on categories
    if (updates.categories) {
      this.ratings[index].overallScore = this.calculateOverallScore(updates.categories)
    }

    return this.ratings[index]
  }

  static getEmployeesForReview(manager: User): any[] {
    // Mock employee data that a manager can review
    const employees = [
      {
        id: 'emp_001',
        name: 'Sarah Wilson',
        department: manager.department,
        team: 'Frontend Team',
        role: 'Software Engineer',
        lastReview: new Date('2024-09-15'),
        nextReview: new Date('2024-12-15'),
        currentScore: 4.2,
        needsReview: false
      },
      {
        id: 'emp_002', 
        name: 'Michael Chen',
        department: manager.department,
        team: 'Backend Team',
        role: 'Senior Developer',
        lastReview: new Date('2024-08-01'),
        nextReview: new Date('2024-11-01'),
        currentScore: 4.0,
        needsReview: true
      },
      {
        id: 'emp_003',
        name: 'Lisa Rodriguez',
        department: manager.department,
        team: 'DevOps Team',
        role: 'DevOps Engineer',
        lastReview: new Date('2024-10-01'),
        nextReview: new Date('2025-01-01'),
        currentScore: 4.5,
        needsReview: false
      }
    ]

    return employees.filter(emp => this.canEditPerformance(manager, emp))
  }

  static getDepartmentPerformanceStats(manager: User) {
    const employees = this.getEmployeesForReview(manager)
    
    return {
      totalEmployees: employees.length,
      averageScore: employees.reduce((sum, emp) => sum + emp.currentScore, 0) / employees.length,
      highPerformers: employees.filter(emp => emp.currentScore >= 4.0).length,
      needsImprovement: employees.filter(emp => emp.currentScore < 3.5).length,
      overdueReviews: employees.filter(emp => emp.needsReview).length,
      topPerformer: employees.sort((a, b) => b.currentScore - a.currentScore)[0]
    }
  }

  private static getDefaultCategories() {
    return [
      { name: 'Technical Skills', score: 0, weight: 30 },
      { name: 'Communication', score: 0, weight: 20 },
      { name: 'Leadership', score: 0, weight: 15 },
      { name: 'Innovation', score: 0, weight: 20 },
      { name: 'Reliability', score: 0, weight: 15 }
    ]
  }

  private static calculateOverallScore(categories: PerformanceRating['categories']): number {
    let weightedSum = 0
    let totalWeight = 0

    categories.forEach(category => {
      weightedSum += category.score * (category.weight / 100)
      totalWeight += category.weight / 100
    })

    return Math.round((weightedSum / totalWeight) * 10) / 10
  }

  static getPerformanceTrends(employeeId: string) {
    // Mock historical data
    return [
      { period: 'Q1 2024', score: 3.8 },
      { period: 'Q2 2024', score: 4.0 },
      { period: 'Q3 2024', score: 4.1 },
      { period: 'Q4 2024', score: 4.2 }
    ]
  }

  static getGoalTemplates() {
    return [
      {
        category: 'Technical Development',
        goals: [
          'Complete certification in relevant technology',
          'Lead a technical project or initiative',
          'Mentor junior team members',
          'Contribute to open source projects'
        ]
      },
      {
        category: 'Leadership',
        goals: [
          'Lead a cross-functional team',
          'Improve presentation skills',
          'Develop conflict resolution abilities',
          'Take on additional responsibilities'
        ]
      },
      {
        category: 'Innovation',
        goals: [
          'Propose and implement process improvements',
          'Research new technologies or methodologies',
          'Create reusable tools or frameworks',
          'Drive cost-saving initiatives'
        ]
      }
    ]
  }
} 