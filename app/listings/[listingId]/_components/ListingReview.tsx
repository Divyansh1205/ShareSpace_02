import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  createdAt: Date;
}

interface RatingAndReviewProps {
  productId: string;
  initialReviews?: Review[];
  hostName: string;
}

const RatingAndReview: React.FC<RatingAndReviewProps> = ({ productId, initialReviews = [], hostName }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: Math.random().toString(36).substr(2, 9),
      rating,
      comment,
      userName: 'Anonymous User', // Replace with auth user in real app
      createdAt: new Date(),
    };
    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment('');
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <div className="w-full space-y-6">
      <h2 className="text-xl font-semibold">Hosted by {hostName}</h2>
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold">{calculateAverageRating()}</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className={star <= rating ? 'text-yellow-500' : 'text-gray-300'} />
          ))}
        </div>
        <p className="text-sm text-gray-500">({reviews.length} reviews)</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Your Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="text-2xl text-yellow-500 hover:scale-110 transition"
              >
                {star <= (hoveredRating || rating) ? '★' : '☆'}
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border rounded-md"
          placeholder="Write a review..."
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          disabled={!rating || !comment.trim()}
        >
          Submit Review
        </button>
      </form>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 border rounded-md">
            <p className="font-medium">{review.userName}</p>
            <div className="flex items-center gap-2 text-yellow-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={star <= review.rating ? 'text-yellow-500' : 'text-gray-300'} />
              ))}
              <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingAndReview;
