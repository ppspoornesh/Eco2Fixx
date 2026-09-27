import { ProductReview } from '../types';

export const MOCK_REVIEWS: Record<string, ProductReview[]> = {
  // Part 01: iPhone 13 Display
  'part-01': [
    {
      id: 'rev-101',
      partId: 'part-01',
      category: 'Display',
      authorName: 'Rohan Deshmukh',
      authorType: 'Verified Buyer',
      city: 'Pune, Maharashtra',
      rating: 5,
      date: '18 Sep 2026',
      title: 'Flawless OEM panel, TrueTone and touch calibrated perfectly!',
      comment: 'Brand authorized center quoted ₹14,500 for replacement screen. Bought this harvested original display for ₹2,499. Took it to local shop Metro Logic on MG Road who installed it in 20 mins. Zero touch ghosting, brightness is 100% original. Saved ₹12,000!',
      verifiedPurchase: true,
      helpfulCount: 42,
      photos: [
        'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80'
      ],
      replacementStatus: 'Replaced on iPhone 13 128GB · 100% Color Calibrated'
    },
    {
      id: 'rev-102',
      partId: 'part-01',
      category: 'Display',
      authorName: 'Farhan Electronics Lab',
      authorType: 'Certified Technician',
      city: 'Hyderabad, Telangana',
      rating: 5,
      date: '12 Sep 2026',
      title: 'Tested on JC Programmer - OEM serial transferred cleanly',
      comment: 'As a repair workshop owner, I usually get duplicate Chinese TFT screens from local gray markets that crack within weeks. This salvaged OEM OLED has original flex cables, passed 120Hz display refresh tester without jitter. Customer left 5-star review at our shop.',
      verifiedPurchase: true,
      helpfulCount: 29,
      photos: [
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
      ],
      replacementStatus: 'B2B Workshop Repair · QC Passed & Tested'
    },
    {
      id: 'rev-103',
      partId: 'part-01',
      category: 'Display',
      authorName: 'Ananya Sen',
      authorType: 'Verified Buyer',
      city: 'Bengaluru, Karnataka',
      rating: 4,
      date: '04 Sep 2026',
      title: 'Excellent condition, minor hairline scratch on border only',
      comment: 'The Grade A rating was accurate. Tiny hairline mark on the extreme top bezel frame which is completely hidden once you put a tempered glass screen protector. Fast delivery in Bangalore within 24 hours.',
      verifiedPurchase: true,
      helpfulCount: 15,
      photos: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80'
      ],
      replacementStatus: 'Self-installed with tool kit'
    }
  ],

  // Part 02: iPhone 12 Camera
  'part-02': [
    {
      id: 'rev-201',
      partId: 'part-02',
      category: 'Camera',
      authorName: 'Karthik Raja',
      authorType: 'Verified Buyer',
      city: 'Chennai, Tamil Nadu',
      rating: 5,
      date: '15 Sep 2026',
      title: '4K 60fps video and OIS stabilization working like brand new',
      comment: 'My phone had dropped on concrete and the primary camera sensor got foggy and buzzed constantly due to broken optical stabilization coil. Replaced with this bench-tested unit. Autofocus is instantaneous and portrait mode depth works cleanly.',
      verifiedPurchase: true,
      helpfulCount: 31,
      photos: [
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80'
      ],
      replacementStatus: 'Replaced on iPhone 12 Mini · 4K60 Verified'
    },
    {
      id: 'rev-202',
      partId: 'part-02',
      category: 'Camera',
      authorName: 'Apex Device Restoration',
      authorType: 'Dukaan Partner',
      city: 'Bengaluru, Karnataka',
      rating: 5,
      date: '02 Sep 2026',
      title: 'Lens optics 100% dust-free under 20x microscope',
      comment: 'Inspected under microscope prior to customer installation. Optical glass was sealed in ESD anti-static pouch with zero fingerprints or cleaning marks. Super satisfied.',
      verifiedPurchase: true,
      helpfulCount: 18,
      replacementStatus: 'Workshop Bench Tested'
    }
  ],

  // Part 03: Galaxy S21 Battery
  'part-03': [
    {
      id: 'rev-301',
      partId: 'part-03',
      category: 'Battery',
      authorName: 'Suresh Kumar',
      authorType: 'Verified Buyer',
      city: 'Delhi NCR',
      rating: 5,
      date: '19 Sep 2026',
      title: '89% Battery Health verified on AccuBattery, full day backup restored',
      comment: 'Old battery was draining in 3 hours. After swapping this OEM cell, getting 6.5 hours screen-on-time easily. Temperature stays below 36°C even on fast 25W charging. Don’t waste money on fake duplicate batteries that bulge.',
      verifiedPurchase: true,
      helpfulCount: 38,
      photos: [
        'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80'
      ],
      replacementStatus: 'Replaced Galaxy S21 · AccuBattery 89% Health'
    }
  ],

  // Part 04: ThinkPad Motherboard
  'part-04': [
    {
      id: 'rev-401',
      partId: 'part-04',
      category: 'Motherboard',
      authorName: 'Praveen Nair (IT Systems)',
      authorType: 'Certified Technician',
      city: 'Kochi, Kerala',
      rating: 5,
      date: '14 Sep 2026',
      title: 'Clean BIOS, clean IMEI, Thunderbolt ports fully functional',
      comment: 'Rescued a client’s water damaged ThinkPad X1 Carbon Gen 9. Board arrived securely packaged in anti-static box with thermal paste residue cleaned. Booted into Ubuntu on first try with all 16GB LPDDR4x RAM passing MemTest86.',
      verifiedPurchase: true,
      helpfulCount: 54,
      photos: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
      ],
      replacementStatus: 'Full Logic Board Swap · BIOS Unlocked'
    }
  ],

  // Part 07: S22 Camera
  'part-07': [
    {
      id: 'rev-701',
      partId: 'part-07',
      category: 'Camera',
      authorName: 'Manish Chawla',
      authorType: 'Verified Buyer',
      city: 'Mumbai, Maharashtra',
      rating: 5,
      date: '20 Sep 2026',
      title: 'ISOCELL 50MP sensor crispness restored',
      comment: 'Dropped my phone during Ganpati celebrations. Samsung service center asked for entire back housing replacement. Got only the camera module from Eco2Fixx for ₹1,450. Nightography and 3x optical zoom work like a charm.',
      verifiedPurchase: true,
      helpfulCount: 22,
      photos: [
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80'
      ],
      replacementStatus: 'Galaxy S22 5G Camera Replacement'
    }
  ]
};

// Default generic fallback reviews when a part doesn't have custom ones
export const DEFAULT_CATEGORY_REVIEWS: Record<string, ProductReview[]> = {
  Display: [
    {
      id: 'rev-def-disp-1',
      authorName: 'Amit Bansal',
      authorType: 'Verified Buyer',
      city: 'Jaipur, Rajasthan',
      rating: 5,
      date: '16 Sep 2026',
      title: 'Original OEM display quality is unmatched',
      comment: 'Touch sampling rate and color contrast is exact factory spec. Local repair technician tested it before sealing housing. Highly recommended circular spares over market copies.',
      verifiedPurchase: true,
      helpfulCount: 19,
      photos: [
        'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80'
      ],
      replacementStatus: 'Replaced & Calibrated'
    },
    {
      id: 'rev-def-disp-2',
      authorName: 'Speedy Fix Hub',
      authorType: 'Certified Technician',
      city: 'Bengaluru, Karnataka',
      rating: 5,
      date: '10 Sep 2026',
      title: 'Bench tested thoroughly before installation',
      comment: 'No dead pixels, no digitizer lag. Excellent initiative saving e-waste and keeping repair costs sensible.',
      verifiedPurchase: true,
      helpfulCount: 12,
      replacementStatus: 'Dukaan Workbench Repair'
    }
  ],
  Camera: [
    {
      id: 'rev-def-cam-1',
      authorName: 'Gaurav Aggarwal',
      authorType: 'Verified Buyer',
      city: 'Chandigarh',
      rating: 5,
      date: '14 Sep 2026',
      title: 'Optics clear, OIS smooth, zero dust',
      comment: 'Came sealed in anti-static wrapper. Installed in 15 minutes at nearby partner dukaan. Focus hunting is totally gone.',
      verifiedPurchase: true,
      helpfulCount: 16,
      photos: [
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80'
      ],
      replacementStatus: 'Replaced Primary Camera'
    }
  ],
  Motherboard: [
    {
      id: 'rev-def-mobo-1',
      authorName: 'MicroLogic Solutions',
      authorType: 'Certified Technician',
      city: 'Ahmedabad, Gujarat',
      rating: 5,
      date: '11 Sep 2026',
      title: 'Powers up cleanly, baseband and Wi-Fi IC validated',
      comment: 'Tested on power supply before assembling. No short circuits, zero heating near PMIC. Client phone restored without losing storage.',
      verifiedPurchase: true,
      helpfulCount: 27,
      photos: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
      ],
      replacementStatus: 'Motherboard IC Diagnostic Passed'
    }
  ],
  Battery: [
    {
      id: 'rev-def-bat-1',
      authorName: 'Vikas Sharma',
      authorType: 'Verified Buyer',
      city: 'Indore, MP',
      rating: 5,
      date: '08 Sep 2026',
      title: 'Original OEM cell with true capacity',
      comment: 'Cycle count verified using diagnostic app. Stable voltage curve and temperature sensor reports genuine thermistor behavior.',
      verifiedPurchase: true,
      helpfulCount: 21,
      photos: [
        'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80'
      ],
      replacementStatus: 'Battery Health 90%+'
    }
  ]
};

export const getReviewsForPart = (partId: string, category: string): ProductReview[] => {
  if (MOCK_REVIEWS[partId]) {
    return MOCK_REVIEWS[partId];
  }
  return DEFAULT_CATEGORY_REVIEWS[category] || DEFAULT_CATEGORY_REVIEWS.Display;
};
