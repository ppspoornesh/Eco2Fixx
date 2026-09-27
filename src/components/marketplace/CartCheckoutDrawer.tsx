import React, { useState } from 'react';
import { CartItem, Order } from '../../types';
import { X, Trash2, ShieldCheck, CheckCircle2, Truck, Lock, ArrowRight, ShoppingBag, Plus, Minus, CreditCard } from 'lucide-react';
import { ComponentSvgVisual } from '../common/ComponentSvgVisual';

interface CartCheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (partId: string, delta: number) => void;
  onRemoveItem: (partId: string) => void;
  onOrderCompleted: (newOrder: Order) => void;
  onOpenTracking?: (orderId: string) => void;
}

export const CartCheckoutDrawer: React.FC<CartCheckoutDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onOrderCompleted,
  onOpenTracking
}) => {
  const [buyerType, setBuyerType] = useState<'consumer' | 'b2b'>('consumer');
  const [shippingAddress, setShippingAddress] = useState('Flat 402, Green Orchid Residency, HSR Layout, Bengaluru 560102');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.part.price * item.quantity, 0);
  const eco2fixxCommission = Math.round(subtotal * 0.10);
  const associatePayout = subtotal - eco2fixxCommission;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const primaryPart = cart[0]?.part;
      const order: Order = {
        id: orderId,
        type: 'part_delivery',
        partId: primaryPart?.id || 'part-01',
        partTitle: primaryPart?.title || 'Component Order',
        imageUrl: primaryPart?.imageUrl,
        category: primaryPart?.category || 'Display',
        deviceModel: primaryPart?.deviceModel || 'Smartphone',
        buyerName: buyerType === 'consumer' ? 'Customer B (Consumer)' : 'Associate B (Repair Lab)',
        buyerType: buyerType === 'consumer' ? 'Customer B (Consumer)' : 'Associate B (Repair Shop)',
        totalAmount: subtotal,
        associatePayout,
        eco2fixxCommission,
        orderDate: 'Just Now',
        status: 'Payment Secured',
        warrantyMonths: 3,
        courierPartner: 'BlueDart Express',
        trackingNumber: `BDX-${Math.floor(100000000 + Math.random() * 900000000)}IN`,
        estimatedDelivery: 'Tomorrow by 2:00 PM',
        shippingAddress,
        associateShopName: primaryPart?.associateName || 'Metro Logic Board Lab',
        associatePhone: '+91 9392532390',
        timeline: [
          {
            title: 'Payment Secured in Escrow',
            timestamp: 'Just Now',
            description: 'Funds securely held in platform Escrow until delivery & inspection.',
            completed: true,
            current: true
          },
          {
            title: 'Associate Bench Inspection & Packaging',
            timestamp: 'Scheduled Today',
            description: 'Component diagnostics re-verified before dispatch seal.',
            completed: false
          },
          {
            title: 'Handed to Courier Partner',
            timestamp: 'Pending Dispatch',
            description: 'BlueDart Express pickup and transit.',
            completed: false
          },
          {
            title: 'Delivered & 3-Month Warranty Active',
            timestamp: 'Tomorrow 2:00 PM',
            description: 'Delivered to address with 7-day return guarantee.',
            completed: false
          }
        ]
      };
      setCompletedOrder(order);
      setIsProcessing(false);
      onOrderCompleted(order);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white border-l border-slate-200 h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-slate-900 font-display">
              {completedOrder ? 'Order Confirmation' : 'Marketplace Checkout'}
            </span>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
              Escrow Secured
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {completedOrder ? (
            <div className="space-y-6 text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-600 flex items-center justify-center text-emerald-600 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 font-display">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-emerald-700 font-mono font-bold">
                  Order ID: {completedOrder.id}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Payment is safely held in Eco2Fixx Escrow until delivery is physically verified.
                </p>
              </div>

              {/* Order Timeline */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-3">
                <div className="text-xs font-bold text-slate-900">
                  Fulfillment & Inspection Milestones:
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Payment Secured in Escrow (Complete)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Associate Shop Packaging with QC Certificate</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                    <span>Courier Pickup & Express Transit</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                    <span>Delivered · 3-Month Warranty Activated</span>
                  </div>
                </div>
              </div>

              {/* Financial Split Summary (Teammate Transparency) */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Total Amount Paid:</span>
                  <span className="text-slate-900 font-mono font-bold">₹{completedOrder.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Associate Payout (upon delivery):</span>
                  <span className="text-emerald-700 font-mono font-bold">₹{completedOrder.associatePayout.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Eco2Fixx Marketplace Take (10%):</span>
                  <span className="text-slate-900 font-mono font-bold">₹{completedOrder.eco2fixxCommission.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenTracking?.(completedOrder.id);
                  }}
                  className="w-full py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>Track Order Status ({completedOrder.id}) →</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Close & Return to Store
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-slate-800">Your Cart is Empty</div>
              <p className="text-xs text-slate-500">
                Explore verified tested components on the Eco2Fixx Marketplace and add them to your cart.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Buyer Persona Selector */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Ordering as:</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setBuyerType('consumer')}
                    className={`py-1.5 px-2 rounded-lg border transition-colors font-semibold ${
                      buyerType === 'consumer'
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    Customer B (Consumer)
                  </button>
                  <button
                    onClick={() => setBuyerType('b2b')}
                    className={`py-1.5 px-2 rounded-lg border transition-colors font-semibold ${
                      buyerType === 'b2b'
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    Associate B (Repair Shop)
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Selected Items ({cart.length})
                </div>
                {cart.map((item) => (
                  <div
                    key={item.part.id}
                    className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-2xs"
                  >
                    {item.part.imageUrl ? (
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <img src={item.part.imageUrl} alt={item.part.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <ComponentSvgVisual category={item.part.category} size="sm" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {item.part.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {item.part.deviceModel} · {item.part.warranty}
                      </div>
                      <div className="text-xs font-black text-emerald-700 font-mono mt-0.5">
                        ₹{(item.part.price * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onUpdateQuantity(item.part.id, -1)}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold font-mono px-1">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.part.id, 1)}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.part.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Delivery Address in India:</label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              {/* Escrow & Payment Guarantee */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1 text-xs text-emerald-900">
                <div className="font-bold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Eco2Fixx Safe Escrow Guarantee</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  Payment is disbursed to the Associate seller only after delivery is verified and your 7-day inspection window completes.
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="text-slate-900 font-mono font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Express Courier:</span>
                  <span className="text-emerald-700 font-bold">FREE (Promotional)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST & Testing:</span>
                  <span className="text-slate-900 font-mono">Included</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                  <span>Total Payable:</span>
                  <span className="font-mono text-emerald-700">₹{subtotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!completedOrder && cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                  <span>Securing Payment in Escrow...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Pay ₹{subtotal.toLocaleString()} via UPI / Escrow</span>
                </>
              )}
            </button>
            <div className="text-[10px] text-center text-slate-400">
              UPI, NetBanking, Credit Cards & Cash on Delivery Available
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
