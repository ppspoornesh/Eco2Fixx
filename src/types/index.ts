export type AppTab = 'overview' | 'sell-device' | 'associate-hub' | 'marketplace' | 'business-model';

export type SupportedLanguage = 'en' | 'hi' | 'te' | 'ta' | 'mr' | 'kn';

export type UserPersona = 
  | 'seller'       // Customer A (Selling damaged device)
  | 'associate_a'  // Associate A (Local repair shop buying damaged phones)
  | 'associate_b'  // Associate B (Repair shop purchasing B2B tested spares)
  | 'buyer'        // Customer B (Consumer purchasing replacement parts)
  | 'executive';   // Founding team / investor ecosystem tour

export type ProductCategory = 
  | 'smartphone'
  | 'laptop'
  | 'tablet'
  | 'tv'
  | 'earbuds'
  | 'appliance'
  | 'automotive';

export interface RecoverableComponentEstimate {
  id: string;
  name: string;
  category: string;
  recoveryPotential: 'High' | 'Medium' | 'Low';
  estimatedValueMin: number;
  estimatedValueMax: number;
  typicalCondition: string;
  notes: string;
}

export interface DeviceAssessment {
  id: string;
  deviceTitle: string;
  category: ProductCategory;
  brand: string;
  model: string;
  age: string;
  damageType: string;
  workingCondition: string;
  photos: string[];
  components: RecoverableComponentEstimate[];
  estimatedTotalMin: number;
  estimatedTotalMax: number;
  confidenceScore: number;
  status: 'pending_associate' | 'purchased_by_associate' | 'recovered' | 'listed';
  recommendedAssociateId: string;
  createdAt: string;
}

export interface Associate {
  id: string;
  shopName: string;
  ownerName: string;
  specialty: string;
  address: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  activeInventoryCount: number;
  completedRepairs: number;
  warrantyOfferedDefault: string;
  image?: string;
  city?: string;
  phone?: string;
}

export interface RecoveredPart {
  id: string;
  title: string;
  deviceModel: string;
  category: string;
  brand?: string;
  condition: 'Grade A - Like New' | 'Grade B - Good' | 'Budget - Functional' | 'Tested OEM';
  testStatus: 'Diagnostic Passed' | 'Bench Tested' | 'Visual Inspection';
  price: number;
  originalPrice?: number;
  warranty: 'No Warranty' | '1 Month' | '3 Months' | '6 Months';
  deliveryDays: number;
  listingStatus: 'available_marketplace' | 'used_offline' | 'draft';
  targetAudience: 'both' | 'b2b_only' | 'b2c_only';
  associateId: string;
  associateName: string;
  associateRating: number;
  compatibility: string[];
  imageUrl?: string;
  inStock: number;
  sourceDeviceId?: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
}

export interface CartItem {
  part: RecoveredPart;
  quantity: number;
}

export interface OrderTimelineEvent {
  title: string;
  timestamp: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  type?: 'part_delivery' | 'repair_service';
  partId: string;
  partTitle: string;
  imageUrl?: string;
  category?: string;
  deviceModel?: string;
  buyerName: string;
  buyerType: 'Customer B (Consumer)' | 'Associate B (Repair Shop)';
  totalAmount: number;
  associatePayout: number;
  eco2fixxCommission: number;
  orderDate: string;
  status: 'Payment Secured' | 'Associate Preparing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'In Repair Bench' | 'Repair Completed';
  warrantyMonths: number;
  courierPartner?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  shippingAddress?: string;
  associateShopName?: string;
  associatePhone?: string;
  timeline?: OrderTimelineEvent[];
}

export interface ProductReview {
  id: string;
  partId?: string;
  category?: string;
  authorName: string;
  authorType: 'Verified Buyer' | 'Certified Technician' | 'Dukaan Partner';
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  photos?: string[];
  replacementStatus?: string;
}
