"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, User, Eye, ThumbsUp, ChevronRight } from "lucide-react"

const knowledgeCategories = [
  { name: "Property Verification", count: 8, color: "text-blue-600" },
  { name: "Trust Scores", count: 6, color: "text-blue-600" },
  { name: "Scam Prevention", count: 5, color: "text-blue-600" },
  { name: "Market Analysis", count: 3, color: "text-blue-600" },
  { name: "Legal & Contracts", count: 2, color: "text-blue-600" },
]

const featuredArticles = [
  {
    id: 1,
    title: "How to Verify Property Ownership",
    description: "Complete guide to verifying legitimate property ownership and avoiding rental scams",
    author: "Sarah Johnson, Real Estate Expert",
    views: 2847,
    likes: 156,
    duration: "8 min",
    level: "Beginner",
    category: "Verification",
  },
  {
    id: 2,
    title: "Understanding Trust Scores",
    description: "Learn how TrueEstate calculates trust scores and what they mean for your rental decisions",
    author: "Michael Chen, Data Scientist",
    views: 1923,
    likes: 89,
    duration: "6 min",
    level: "Intermediate",
    category: "Trust Scores",
  },
  {
    id: 3,
    title: "Complete Guide to Rental Scam Prevention",
    description: "Protect yourself from rental scams with this comprehensive prevention guide",
    author: "Jennifer Martinez, Consumer Protection Specialist",
    views: 3456,
    likes: 234,
    duration: "10 min",
    level: "Beginner",
    category: "Scam Prevention",
  },
]

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">📚 Knowledge Base</h1>
            <p className="text-lg text-gray-600 mb-8">
              Learn everything about property verification, trust scores, and rental safety
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles, guides, and tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-3 text-lg"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <select className="border-0 bg-transparent text-gray-600 focus:ring-0">
                    <option>All Articles (24)</option>
                    <option>Verification</option>
                    <option>Trust Scores</option>
                    <option>Scam Prevention</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {knowledgeCategories.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className={`text-3xl font-bold ${category.color} mb-2`}>{category.count}</div>
                  <div className="font-medium text-gray-900">{category.name}</div>
                  <div className="text-sm text-gray-500">articles</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>

        <div className="space-y-6">
          {featuredArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Badge variant="secondary">{article.category}</Badge>
                      <Badge variant="outline">{article.level}</Badge>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.duration}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {article.views.toLocaleString()} views
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {article.likes} likes
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 ml-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Knowledge Center Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Real Estate Knowledge Center</h2>
          <p className="text-lg text-gray-600 mb-8">
            Access comprehensive guides, market insights, and professional resources for real estate professionals
          </p>
        </div>
      </div>
    </div>
  )
}
