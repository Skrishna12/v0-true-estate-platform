"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { useAuth } from "@/lib/auth-provider"

interface OwnerReviewsProps {
  ownerId: string
}

export function OwnerReviews({ ownerId }: OwnerReviewsProps) {
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")

  // Mock reviews
  const reviews = [
    {
      id: "1",
      user: "Jane Smith",
      rating: 5,
      date: "2023-12-15",
      comment: "Excellent landlord. Very responsive and professional. Always addresses maintenance issues promptly.",
    },
    {
      id: "2",
      user: "John Doe",
      rating: 4,
      date: "2023-11-20",
      comment: "Good landlord overall. Rent increases have been reasonable and the property is well-maintained.",
    },
    {
      id: "3",
      user: "Alice Johnson",
      rating: 3,
      date: "2023-10-05",
      comment: "Average experience. Sometimes slow to respond to maintenance requests but otherwise fair.",
    },
  ]

  const handleSubmitReview = () => {
    // This would submit the review to the backend
    alert("Review submitted successfully!")
    setRating(0)
    setReviewText("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Owner Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="space-y-2 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{review.user}</p>
                      <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {user && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium">Rating</p>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 cursor-pointer ${
                        i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Review</p>
                <Textarea
                  placeholder="Share your experience with this property owner..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                />
              </div>
              <Button onClick={handleSubmitReview} disabled={rating === 0 || !reviewText.trim()}>
                Submit Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!user && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="mb-4 text-muted-foreground">Please log in to leave a review for this property owner.</p>
            <Button asChild>
              <a href="/login">Log In</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
