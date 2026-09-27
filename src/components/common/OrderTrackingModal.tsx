import React, { useState, useEffect } from 'react';
import { Order } from '../../types';
import { Search, X, Package, Truck, CheckCircle2, Clock, MapPin, PhoneCall, MessageSquare, ShieldCheck, Wrench, AlertCircle, ArrowRight, Copy, Check } from 'lucide-react';
import { ComponentSvgVisual } from './ComponentSvgVisual';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  initialOrderId?: string;
  isHindi?: boolean;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
  initialOrderId = '',
  isHindi = false
}) => {
  const [searchQuery, setSearchQuery] = useState(initialOrderId || 'ORD-849201');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      setSearchQuery(initialOrderId);
    }
  }, [initialOrderId]);

  useEffect(() => {
    if (!isOpen) return;
    const q = searchQuery.trim().toUpperCase();
    const found = orders.find((o) => o.id.toUpperCase() === q) || null;
    setSelectedOrder(found);
  }, [searchQuery, orders, isOpen]);

  if (!isOpen) return null;

  const handleCopyAwb = (awb: string) => {
    navigator.clipboard.writeText(awb);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const SAMPLE_TRACKING_IDS = [
    { id: 'ORD-849201', label: 'ORD-849201', status: 'Out for Delivery', tag: 'Display' },
    { id: 'ORD-512940', label: 'ORD-512940', status: 'Shipped', tag: 'Motherboard' },
    { id: 'REP-729104', label: 'REP-729104', status: 'In Repair', tag: 'Lab Service' },
    { id: 'ORD-128490', label: 'ORD-128490', status: 'Delivered', tag: 'Screen' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-2xs">
              <Truck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 font-display">
                  {isHindi ? 'लाइव ऑर्डर व रिपेयर ट्रैकिंग' : 'Live Order & Repair Tracking'}
                </h2>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                  Realtime
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {isHindi
                  ? 'अपने स्पेयर पार्ट की डिलीवरी या दुकान की रिपेयर सर्विस का स्टेटस जानें'
                  : 'Track your genuine spare part courier delivery or local shop bench repair status'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
            {isHindi ? 'ऑर्डर आईडी या रिपेयर नंबर दर्ज करें:' : 'Enter Order ID or Repair Ticket:'}
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. ORD-849201 or REP-729104"
              className="w-full bg-slate-50 hover:bg-white focus:bg-white border-2 border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono font-bold text-slate-900 uppercase focus:outline-none transition-all placeholder:text-slate-400"
            />
            <div className="absolute right-3 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
          </div>

          {/* Quick Clickable Suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-[11px] text-slate-400 font-medium mr-1">
              {isHindi ? 'क्लिक करके देखें:' : 'Try sample IDs:'}
            </span>
            {SAMPLE_TRACKING_IDS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => setSearchQuery(sample.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer border ${
                  searchQuery.toUpperCase() === sample.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <span>{sample.label}</span>
                <span className="opacity-70 ml-1 text-[9px] font-sans">({sample.status})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Found Order Card */}
        {selectedOrder ? (
          <div className="space-y-6 pt-2">
            {/* Status Summary Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/60 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-black text-slate-900">
                      {selectedOrder.id}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      selectedOrder.status === 'Delivered' || selectedOrder.status === 'Repair Completed'
                        ? 'bg-emerald-700 text-white'
                        : selectedOrder.status === 'Out for Delivery'
                        ? 'bg-emerald-600 text-white animate-pulse'
                        : selectedOrder.status === 'In Repair Bench'
                        ? 'bg-amber-600 text-white'
                        : 'bg-blue-600 text-white'
                    }`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Order Date: {selectedOrder.orderDate} · {selectedOrder.buyerType}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                    {selectedOrder.type === 'repair_service' ? 'Estimated Ready Time' : 'Estimated Delivery'}
                  </div>
                  <div className="text-sm font-black text-emerald-800 font-mono">
                    {selectedOrder.estimatedDelivery || 'Within 24 Hours'}
                  </div>
                </div>
              </div>

              {/* Courier or Repair Shop Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {selectedOrder.type === 'repair_service' ? (
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Repair Partner Shop</span>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{selectedOrder.associateShopName || 'Metro Logic Board Lab'}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Walk-in Workbench · Warranty: 3 Months
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Courier & Tracking AWB</span>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{selectedOrder.courierPartner || 'BlueDart Air Express'}</span>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600">
                        <span>AWB: {selectedOrder.trackingNumber}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyAwb(selectedOrder.trackingNumber!)}
                          className="hover:text-emerald-700 transition-colors"
                          title="Copy AWB Tracking Number"
                        >
                          {copiedTracking ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {selectedOrder.type === 'repair_service' ? 'Service Drop-off Location' : 'Delivery Address'}
                  </span>
                  <div className="text-[11px] text-slate-700 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{selectedOrder.shippingAddress || 'Bengaluru, Karnataka - 560001'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card Details */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3.5">
              {selectedOrder.imageUrl ? (
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img src={selectedOrder.imageUrl} alt={selectedOrder.partTitle} className="w-full h-full object-cover" />
                </div>
              ) : (
                <ComponentSvgVisual category={selectedOrder.category || 'display'} size="sm" />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-emerald-700 font-bold uppercase font-mono">
                  {selectedOrder.deviceModel || 'Tested Spare Part'}
                </div>
                <div className="text-xs font-bold text-slate-900 truncate">
                  {selectedOrder.partTitle}
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                  <span className="font-mono font-bold text-slate-900">₹{selectedOrder.totalAmount.toLocaleString()}</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> {selectedOrder.warrantyMonths} Months Warranty
                  </span>
                </div>
              </div>
            </div>

            {/* Live Progress Timeline */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider">
                <span>{isHindi ? 'लाइव प्रगति टाइमलाइन' : 'Milestone Timeline'}</span>
                <span className="text-emerald-700 font-semibold text-[11px]">
                  {selectedOrder.timeline?.filter((t) => t.completed).length || 4} of {selectedOrder.timeline?.length || 5} steps completed
                </span>
              </div>

              <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {(selectedOrder.timeline || [
                  { title: 'Payment Secured in Escrow', timestamp: 'Yesterday', description: 'Funds safely held in Eco2Fixx Escrow.', completed: true },
                  { title: 'Associate Bench Inspection Passed', timestamp: 'Yesterday', description: 'Tested with diagnostic multimeter.', completed: true },
                  { title: 'Handed to Courier Partner', timestamp: 'Today, 8:00 AM', description: 'En route with tracking number.', completed: true, current: true },
                  { title: 'Delivered & Warranty Activated', timestamp: 'Pending', description: 'Will be verified at destination.', completed: false }
                ]).map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline Node */}
                    <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      step.completed
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                        : 'bg-white border-2 border-slate-300 text-slate-400'
                    }`}>
                      {step.completed ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className={`text-xs font-bold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {step.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Helpline & Action Strip */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/919392532390?text=Hello%20Eco2Fixx,%20I%20am%20tracking%20order%20${selectedOrder.id}.%20Please%20provide%20an%20update.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp 9392532390</span>
                </a>

                <a
                  href="tel:9392532390"
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-2xs"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Support</span>
                </a>
              </div>

              <div className="text-[11px] text-slate-400">
                100% Protected by Eco2Fixx Escrow & Warranty
              </div>
            </div>
          </div>
        ) : (
          /* Order Not Found State */
          <div className="text-center py-8 space-y-3 bg-slate-50 rounded-2xl border border-slate-200 p-6">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">
                {isHindi ? 'ऑर्डर नहीं मिला' : 'No Order Found for "' + searchQuery + '"'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {isHindi
                  ? 'कृपया अपनी ऑर्डर आईडी की जांच करें (उदा. ORD-849201 या REP-729104) या ऊपर दिए गए सैंपल आईडी पर क्लिक करें।'
                  : 'Please check your Order or Repair ID format (e.g. ORD-849201 or REP-729104) or click one of the sample tracking IDs above.'}
              </p>
            </div>
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={() => setSearchQuery('ORD-849201')}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-2xs cursor-pointer"
              >
                Load Sample Order (ORD-849201)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
