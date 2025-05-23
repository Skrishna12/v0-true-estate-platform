import { Shield, Map, Star, Search, Building, Users } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: Shield,
      title: "Owner Verification",
      description: "Verify property owners with official ID documents and background checks.",
    },
    {
      icon: Star,
      title: "Transparency Score",
      description: "Each property has a transparency score based on verification and reviews.",
    },
    {
      icon: Building,
      title: "Owner Portfolio",
      description: "View complete property portfolios and total asset values for each owner.",
    },
    {
      icon: Map,
      title: "Interactive Maps",
      description: "Explore properties on an interactive map with filtering capabilities.",
    },
    {
      icon: Users,
      title: "Owner Reviews",
      description: "Read and write reviews about property owners from verified tenants.",
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Find properties by owner, location, value, size, and more.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Key Features</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              TrueEstate provides transparency and insights for property investors and renters.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
