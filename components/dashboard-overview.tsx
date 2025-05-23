import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Users, MapPin, AlertTriangle, TrendingUp, DollarSign } from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Overview</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+6 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Owners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reported Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground">-2 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Property Value Trends</CardTitle>
            <CardDescription>Average property values over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="flex h-full items-center justify-center bg-muted/50 rounded-md">
              <TrendingUp className="h-16 w-16 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Owners by Net Worth</CardTitle>
            <CardDescription>Highest net worth property owners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Carla Thompson", worth: "$3.2M", properties: 2 },
                { name: "Alice Johnson", worth: "$2.5M", properties: 3 },
                { name: "Hank Garcia", worth: "$2.4M", properties: 1 },
                { name: "Jake Brown", worth: "$4.7M", properties: 2 },
                { name: "Frank Johnson", worth: "$4.6M", properties: 1 },
              ].map((owner, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <span className="text-xs">{owner.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{owner.name}</p>
                      <p className="text-xs text-muted-foreground">{owner.properties} properties</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <DollarSign className="h-3 w-3" />
                    {owner.worth}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Properties</CardTitle>
            <CardDescription>Recently added properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { id: "PROP3001", address: "789 New Plaza St, NY", value: "$880,000" },
                { id: "PROP3002", address: "160 Liberty Ave, CA", value: "$720,000" },
                { id: "PROP3004", address: "100 Innovation Blvd, San Francisco", value: "$880,000" },
                { id: "PROP1001", address: "101 Main Street, New York", value: "$750,000" },
              ].map((property, i) => (
                <div key={i} className="flex items-center justify-between rounded-md border p-2">
                  <div>
                    <p className="text-sm font-medium">{property.address}</p>
                    <p className="text-xs text-muted-foreground">{property.id}</p>
                  </div>
                  <div className="text-sm font-medium">{property.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Recently reported issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { property: "101 Main Street", issue: "Incorrect ownership information", date: "2 days ago" },
                { property: "45 Pine Rd", issue: "Suspicious listing activity", date: "3 days ago" },
                { property: "789 Oak Ave", issue: "Verification documents missing", date: "5 days ago" },
                { property: "202 Birch Ln", issue: "Property value discrepancy", date: "1 week ago" },
              ].map((report, i) => (
                <div key={i} className="flex items-center justify-between rounded-md border p-2">
                  <div>
                    <p className="text-sm font-medium">{report.property}</p>
                    <p className="text-xs text-muted-foreground">{report.issue}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{report.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
