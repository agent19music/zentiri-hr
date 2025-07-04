"use client"
import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Users, BarChart3, Clock, Award, FileText, DollarSign, MessageSquare, Zap, Database, Shield } from "lucide-react"
import { AnimatedBeam } from "@/components/magicui/animated-beam"

const integrations = [
  { name: "Slack", icon: MessageSquare, category: "Communication", position: { x: 15, y: 25 }, color: "#4A154B" },
  { name: "Workday", icon: Users, category: "HRIS", position: { x: 85, y: 20 }, color: "#F7931E" },
  { name: "BambooHR", icon: FileText, category: "HR Management", position: { x: 20, y: 75 }, color: "#7CB342" },
  { name: "ADP", icon: DollarSign, category: "Payroll", position: { x: 80, y: 70 }, color: "#D50000" },
  { name: "Greenhouse", icon: Users, category: "Recruiting", position: { x: 50, y: 10 }, color: "#1F7A8C" },
  { name: "Salesforce", icon: Database, category: "CRM", position: { x: 10, y: 50 }, color: "#00A1E0" },
  { name: "Lattice", icon: Award, category: "Performance", position: { x: 90, y: 45 }, color: "#6B46C1" },
  { name: "Okta", icon: Shield, category: "Security", position: { x: 60, y: 85 }, color: "#007DC1" },
]

const connections = [
  { from: 0, to: 1, color: "#000000", delay: 0 },      // Slack to Workday
  { from: 1, to: 2, color: "#000000", delay: 0.5 },    // Workday to BambooHR
  { from: 2, to: 3, color: "#000000", delay: 1 },      // BambooHR to ADP
  { from: 4, to: 5, color: "#000000", delay: 1.5 },    // Greenhouse to Salesforce
  { from: 5, to: 6, color: "#000000", delay: 2 },      // Salesforce to Lattice
  { from: 6, to: 7, color: "#000000", delay: 2.5 },    // Lattice to Okta
  { from: 7, to: 0, color: "#000000", delay: 3 },      // Okta to Slack
  { from: 3, to: 4, color: "#000000", delay: 3.5 },    // ADP to Greenhouse
]

export function IntegrationsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const hubRef = useRef<HTMLDivElement>(null)
  const integrationRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    integrationRefs.current = integrationRefs.current.slice(0, integrations.length)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-96 overflow-hidden bg-gradient-to-br from-background to-muted/20 rounded-2xl border border-border/50 backdrop-blur-sm"
    >
      {/* Central Zentiri HR Hub */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: "2s" }}></div>
          <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: "3s", animationDelay: "0.5s" }}></div>
          
          {/* Main hub */}
          <div 
            ref={hubRef}
            className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-2xl border-4 border-background relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <img 
              src="/zentiri-logo.png" 
              alt="Zentiri HR Logo" 
              className="h-10 w-10 object-contain relative z-10"
            />
          </div>
        </div>
        
        <div className="text-center mt-3">
          <Badge variant="secondary" className="text-sm font-semibold bg-primary/10 text-primary border-primary/20">
            Zentiri HR Core
          </Badge>
        </div>
      </div>

      {/* Animated Beams */}
      {connections.map((connection, index) => (
        <AnimatedBeam
          key={`beam-${index}`}
          containerRef={containerRef}
          fromRef={{ current: integrationRefs.current[connection.from] }}
          toRef={{ current: integrationRefs.current[connection.to] }}
          gradientStartColor={connection.color}
          gradientStopColor={connection.color}
          duration={4}
          delay={connection.delay}
          curvature={20}
          pathOpacity={0.3}
        />
      ))}

      {/* Hub to Integration Beams */}
      {integrations.map((_, index) => (
        <AnimatedBeam
          key={`hub-beam-${index}`}
          containerRef={containerRef}
          fromRef={hubRef}
          toRef={{ current: integrationRefs.current[index] }}
          gradientStartColor="#000000"
          gradientStopColor="#666666"
          duration={3}
          delay={index * 0.2}
          curvature={-30}
          pathOpacity={0.2}
        />
      ))}

      {/* Integration Points */}
      {integrations.map((integration, index) => {
        const Icon = integration.icon

        return (
          <div
            key={integration.name}
            ref={(el) => (integrationRefs.current[index] = el)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 group"
            style={{
              left: `${integration.position.x}%`,
              top: `${integration.position.y}%`,
            }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-full animate-pulse blur-sm opacity-60"
                style={{ 
                  backgroundColor: integration.color + "40",
                  transform: "scale(1.5)"
                }}
              ></div>
              
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 border-2 backdrop-blur-sm relative z-10 bg-background/90 text-foreground shadow-lg border-border/30 hover:bg-background hover:border-primary/50"
                style={{
                  boxShadow: `0 0 20px ${integration.color}30`
                }}
              >
                <Icon className="h-6 w-6" />
              </div>
            </div>
            
            <div className="text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-xs font-semibold bg-background/90 backdrop-blur-sm px-2 py-1 rounded border border-border/50">
                {integration.name}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{integration.category}</div>
            </div>
          </div>
        )
      })}

      {/* Status indicators */}
      <div className="absolute top-4 right-4 space-y-2 z-10">
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-green-500/30">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-xs">Real-time Sync</span>
        </Badge>
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-blue-500/30">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
          <span className="text-xs">Smart Workflows</span>
        </Badge>
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-purple-500/30">
          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse" style={{ animationDelay: "1s" }}></div>
          <span className="text-xs">Auto-mapping</span>
        </Badge>
      </div>

      {/* Connection stats */}
      <div className="absolute bottom-4 left-4 z-10">
        <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-xs">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2 animate-pulse"></div>
          {connections.length + integrations.length} Active Connections
        </Badge>
      </div>
    </div>
  )
}

