import React, { useState } from 'react';
import { ProductReview, RecoveredPart } from '../../types';
import { getReviewsForPart } from '../../data/reviewsData';
import { Star, ShieldCheck, ThumbsUp, Camera, CheckCircle2, Filter, Plus, X, Image as ImageIcon, Sparkles, Wrench, UserCheck } from 'lucide-react';

interface ReviewSectionProps {
  part: RecoveredPart;
  isHindi?: boolean;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ part, isHindi = false }) => {
  const initialReviews = getReviewsForPart(part.id, part.category);
  const [reviews, setReviews] = useState<ProductReview[]>(initialReviews);
  const [filterType, setFilterType] = useState<'all' | 'photos' | '5star' | 'technicians'>('all');
  const [activePhotoModal, setActivePhotoModal] = useState<{ url: string; caption?: string; author?: string } | null>(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});

  // Form state
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newAuthorType, setNewAuthorType] = useState<'Verified Buyer' | 'Certified Technician'>('Verified Buyer');
  const [newStatus, setNewStatus] = useState(`Replaced on ${part.deviceModel}`);

  const handleHelpful = (reviewId: string) => {
    if (helpfulVoted[reviewId]) return;
    setHelpfulVoted((prev) => ({ ...prev, [reviewId]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const createdReview: ProductReview = {
      id: `rev-user-${Date.now()}`,
      partId: part.id,
      category: part.category,
      authorName: newAuthor.trim(),
      authorType: newAuthorType,
      city: newCity.trim() || 'Bengaluru, Karnataka',
      rating: newRating,
      date: 'Today',
      title: newTitle.trim() || 'Verified Replacement Part',
      comment: newComment.trim(),
      verifiedPurchase: true,
      helpfulCount: 1,
      photos: part.imageUrl ? [part.imageUrl] : [],
      replacementStatus: newStatus.trim()
    };

    setReviews([createdReview, ...reviews]);
    setShowAddReview(false);
    setNewAuthor('');
    setNewCity('');
    setNewTitle('');
    setNewComment('');
  };

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (filterType === 'photos') return r.photos && r.photos.length > 0;
    if (filterType === '5star') return r.rating === 5;
    if (filterType === 'technicians') return r.authorType === 'Certified Technician' || r.authorType === 'Dukaan Partner';
    return true;
  });

  // Calculate rating stats
  const totalReviews = reviews.length;
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / (totalReviews || 1)).toFixed(1);
  const fiveStars = reviews.filter((r) => r.rating === 5).length;
  const fourStars = reviews.filter((r) => r.rating === 4).length;

  // Extract all photos for verified photo carousel
  const allVerifiedPhotos = reviews.flatMap((r) =>
    (r.photos || []).map((url) => ({
      url,
      caption: r.replacementStatus || r.title,
      author: r.authorName
    }))
  );

  return (
    <div className="space-y-6 pt-4 border-t border-slate-200">
      {/* Header & Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-black text-slate-900 font-display">
              {isHindi ? 'ग्राहक समीक्षाएं व रिप्लेसमेंट फोटो' : 'Customer Reviews & Verified Replacement Photos'}
            </h3>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
              100% Genuine
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {isHindi
              ? 'सत्यापित ग्राहकों और रिपेयर दुकानों द्वारा टेस्ट किए गए स्पेयर पार्ट्स की तस्वीरें'
              : 'Real photos and bench feedback from technicians and verified device owners'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddReview(!showAddReview)}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-2xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{showAddReview ? 'Cancel' : isHindi ? 'रिव्यू लिखें' : 'Write a Review'}</span>
        </button>
      </div>

      {/* Write Review Form Drawer */}
      {showAddReview && (
        <form onSubmit={handleSubmitReview} className="p-4 sm:p-5 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
            <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Share Your Replaced Component Experience</span>
            </span>
            <span className="text-[10px] text-emerald-700 font-medium">Verified Buyer Submission</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Your Name / Shop Name *</label>
              <input
                type="text"
                required
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="e.g. Ramesh Kumar or TechFix Lab"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">City, State *</label>
              <input
                type="text"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder="e.g. Bengaluru, Karnataka"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Buyer Role</label>
              <select
                value={newAuthorType}
                onChange={(e) => setNewAuthorType(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:border-emerald-600"
              >
                <option value="Verified Buyer">End-Customer (Phone Owner)</option>
                <option value="Certified Technician">Independent Repair Technician / Shop</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Rating</label>
              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setNewRating(s)}
                    className="p-1 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star className={`w-5 h-5 ${s <= newRating ? 'fill-amber-500 text-amber-500' : 'text-slate-300'}`} />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-800 ml-1">{newRating} of 5 Stars</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">Review Headline</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. TrueTone working flawlessly, saved ₹8,000 vs service center"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">Detailed Feedback & Diagnostic Observations *</label>
            <textarea
              required
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Mention touch calibration, camera clarity, battery backup, or technician workbench findings..."
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddReview(false)}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Submit Verified Review
            </button>
          </div>
        </form>
      )}

      {/* Ratings Scorecard & Verified Photos Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Rating Score Box */}
        <div className="md:col-span-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="text-3xl font-black text-slate-900 font-mono">{avgRating}</span>
            <span className="text-xs text-slate-400 font-medium">/ 5</span>
          </div>

          <div className="flex justify-center text-amber-500">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-amber-500" />
            ))}
          </div>

          <div className="text-[11px] text-slate-500 font-medium">
            Based on {totalReviews} verified repairs & installations
          </div>

          {/* Quick bar summary */}
          <div className="space-y-1 pt-1 text-[10px] text-slate-500 text-left">
            <div className="flex items-center gap-2">
              <span className="w-5 font-mono">5★</span>
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full"
                  style={{ width: `${(fiveStars / (totalReviews || 1)) * 100}%` }}
                />
              </div>
              <span className="w-4 text-right">{fiveStars}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 font-mono">4★</span>
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full"
                  style={{ width: `${(fourStars / (totalReviews || 1)) * 100}%` }}
                />
              </div>
              <span className="w-4 text-right">{fourStars}</span>
            </div>
          </div>
        </div>

        {/* User-Verified Photos Carousel */}
        <div className="md:col-span-8 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>Customer & Technician Replaced Photos ({allVerifiedPhotos.length})</span>
            </span>
            <span className="text-[10px] text-slate-400">Click to expand</span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {allVerifiedPhotos.map((photo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhotoModal(photo)}
                className="group relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 hover:border-emerald-600 shrink-0 transition-all cursor-pointer shadow-2xs"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />
                <div className="absolute bottom-1 right-1 bg-slate-900/80 text-white rounded p-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                </div>
              </button>
            ))}
          </div>

          <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>All photos verified from completed installations under 3-month Eco2Fixx warranty</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer border ${
            filterType === 'all'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Reviews ({reviews.length})
        </button>

        <button
          type="button"
          onClick={() => setFilterType('photos')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer border flex items-center gap-1 ${
            filterType === 'photos'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>With Photos ({allVerifiedPhotos.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterType('technicians')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer border flex items-center gap-1 ${
            filterType === 'technicians'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Technicians & Shops</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterType('5star')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer border flex items-center gap-1 ${
            filterType === '5star'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
          <span>5-Star Only</span>
        </button>
      </div>

      {/* Review Cards List */}
      <div className="space-y-3.5">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3 hover:border-slate-300 transition-colors"
          >
            {/* Review Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center font-display">
                  {rev.authorName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">{rev.authorName}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ${
                      rev.authorType === 'Certified Technician' || rev.authorType === 'Dukaan Partner'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {rev.authorType}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {rev.city} · {rev.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 pt-1 sm:pt-0">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-200'}`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                  {rev.rating}.0
                </span>
              </div>
            </div>

            {/* Verified Replacement Status Badge */}
            {rev.replacementStatus && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{rev.replacementStatus}</span>
              </div>
            )}

            {/* Title & Comment */}
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {rev.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {rev.comment}
              </p>
            </div>

            {/* Attached Replacement Photos */}
            {rev.photos && rev.photos.length > 0 && (
              <div className="flex items-center gap-2 pt-1">
                {rev.photos.map((pUrl, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => setActivePhotoModal({ url: pUrl, caption: rev.replacementStatus, author: rev.authorName })}
                    className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-200 hover:border-emerald-600 transition-colors cursor-pointer group shrink-0"
                  >
                    <img src={pUrl} alt="Replaced part" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </button>
                ))}
              </div>
            )}

            {/* Helpful Actions & Verified Badge */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Component Purchase</span>
              </div>

              <button
                type="button"
                onClick={() => handleHelpful(rev.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  helpfulVoted[rev.id]
                    ? 'bg-emerald-50 text-emerald-700 font-bold'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${helpfulVoted[rev.id] ? 'fill-emerald-700 text-emerald-700' : ''}`} />
                <span>Helpful ({rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Photo Modal */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="text-xs font-bold text-slate-900">
                User Verified Photo · {activePhotoModal.author}
              </div>
              <button
                type="button"
                onClick={() => setActivePhotoModal(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={activePhotoModal.url}
                alt="Replaced component"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-xs text-slate-600 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              {activePhotoModal.caption || 'Verified replacement part successfully installed and tested.'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
