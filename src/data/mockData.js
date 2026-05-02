// Nashik bus routes with real-like coordinates
export const ROUTES = [
  { id: 'R1', name: 'CBS → Panchavati', from: 'CBS', to: 'Panchavati', coords: [[20.0063,73.7900],[20.0100,73.7850],[20.0150,73.7830],[20.0180,73.7810]], distance: 6.2, traffic: 'high', daily_riders: 18500, type: 'premium' },
  { id: 'R2', name: 'College Road → MIDC', from: 'College Road', to: 'MIDC', coords: [[19.9980,73.7920],[19.9950,73.7980],[19.9900,73.8050],[19.9860,73.8120]], distance: 8.1, traffic: 'high', daily_riders: 15200, type: 'premium' },
  { id: 'R3', name: 'Satpur → Gangapur', from: 'Satpur', to: 'Gangapur', coords: [[20.0200,73.7750],[20.0250,73.7700],[20.0300,73.7650],[20.0350,73.7580]], distance: 9.4, traffic: 'medium', daily_riders: 12800, type: 'standard' },
  { id: 'R4', name: 'Nashik Road → CBS', from: 'Nashik Road', to: 'CBS', coords: [[19.9880,73.8100],[19.9920,73.8050],[19.9960,73.7980],[20.0020,73.7920]], distance: 5.8, traffic: 'high', daily_riders: 17600, type: 'premium' },
  { id: 'R5', name: 'Dwarka → Indira Nagar', from: 'Dwarka', to: 'Indira Nagar', coords: [[20.0050,73.7820],[20.0080,73.7780],[20.0120,73.7740],[20.0160,73.7700]], distance: 4.5, traffic: 'medium', daily_riders: 9800, type: 'standard' },
  { id: 'R6', name: 'Trimbak Road → Makhmalabad', from: 'Trimbak Road', to: 'Makhmalabad', coords: [[20.0220,73.7680],[20.0280,73.7640],[20.0340,73.7600],[20.0400,73.7560]], distance: 11.2, traffic: 'low', daily_riders: 7200, type: 'religious' },
  { id: 'R7', name: 'Shalimar → Pathardi', from: 'Shalimar', to: 'Pathardi', coords: [[19.9840,73.7860],[19.9800,73.7900],[19.9760,73.7950],[19.9720,73.8010]], distance: 7.6, traffic: 'medium', daily_riders: 11400, type: 'standard' },
  { id: 'R8', name: 'Panchavati → Trimbak', from: 'Panchavati', to: 'Trimbak', coords: [[20.0180,73.7810],[20.0240,73.7750],[20.0310,73.7690],[20.0380,73.7620]], distance: 14.8, traffic: 'high', daily_riders: 16200, type: 'religious' },
];

// Generate bus inventory
let busIdCounter = 0;
export const BUSES = ROUTES.flatMap(route => {
  const count = Math.floor(Math.random() * 6) + 3;
  return Array.from({ length: count }, () => {
    busIdCounter++;
    const id = `MH15-${String(4200 + busIdCounter).padStart(4, '0')}`;
    return {
      id,
      routeId: route.id,
      route: route.name,
      dailyReach: Math.floor(route.daily_riders / count * (0.8 + Math.random() * 0.4)),
      status: Math.random() > 0.3 ? 'available' : 'booked',
      type: route.type,
      lastService: '2026-04-' + String(Math.floor(Math.random() * 28) + 1).padStart(2, '0'),
    };
  });
});

// Mock users
export const USERS = [
  { id: 'U1', email: 'admin@transitads.in', password: 'admin123', name: 'Admin User', role: 'admin', company: 'Nashik TransitAds' },
  { id: 'U2', email: 'demo@brand.com', password: 'demo123', name: 'Rajesh Sharma', role: 'advertiser', company: 'GreenLeaf Beverages Pvt. Ltd.' },
  { id: 'U3', email: 'agency@media.com', password: 'agency123', name: 'Priya Mehta', role: 'advertiser', company: 'Nashik Jewellers' },
];

// Mock campaigns
export const CAMPAIGNS = [
  { id: 'C1', name: 'Summer Blast Campaign', advertiser: 'GreenLeaf Beverages Pvt. Ltd.', userId: 'U2', routes: ['R1','R2'], busCount: 25, duration: 30, status: 'active', startDate: '2026-04-15', endDate: '2026-05-15', impressions: 2780000, reach: 1320000, spent: 119760, totalBudget: 145000 },
  { id: 'C2', name: 'Akshaya Tritiya Offer', advertiser: 'Nashik Jewellers', userId: 'U3', routes: ['R4','R8'], busCount: 15, duration: 15, status: 'active', startDate: '2026-04-20', endDate: '2026-05-05', impressions: 1450000, reach: 680000, spent: 62400, totalBudget: 85000 },
  { id: 'C3', name: 'Grand Opening Sale', advertiser: 'Saitherish India', userId: 'U2', routes: ['R3'], busCount: 10, duration: 7, status: 'completed', startDate: '2026-03-10', endDate: '2026-03-17', impressions: 890000, reach: 420000, spent: 35600, totalBudget: 35600 },
];

// Creative submissions
export const CREATIVES = [
  { id: 'CR1', campaignId: 'C1', advertiser: 'GreenLeaf Beverages Pvt. Ltd.', campaign: 'Summer Blast Campaign', fileName: 'summer_blast_side.pdf', format: 'PDF', size: '2.4 MB', status: 'approved', submittedOn: '2026-04-14', resolution: '3000x1200', placement: 'Side' },
  { id: 'CR2', campaignId: 'C2', advertiser: 'Nashik Jewellers', campaign: 'Akshaya Tritiya Offer', fileName: 'akshaya_front.png', format: 'PNG', size: '1.8 MB', status: 'pending', submittedOn: '2026-04-19', resolution: '1200x800', placement: 'Front' },
  { id: 'CR3', campaignId: 'C3', advertiser: 'Saitherish India', campaign: 'Grand Opening Sale', fileName: 'grand_opening.cdr', format: 'CDR', size: '5.1 MB', status: 'approved', submittedOn: '2026-03-09', resolution: '3000x1200', placement: 'Side' },
  { id: 'CR4', campaignId: 'C1', advertiser: 'Roadie Moti', campaign: 'Delicious Deals', fileName: 'delicious_back.png', format: 'PNG', size: '1.2 MB', status: 'rejected', submittedOn: '2026-04-16', resolution: '800x600', placement: 'Back', rejectReason: 'Resolution too low. Min required: 1200x800' },
];

// Transactions
export const TRANSACTIONS = [
  { id: 'T1', campaignId: 'C1', advertiser: 'GreenLeaf Beverages Pvt. Ltd.', type: 'Campaign Payment', amount: 145000, status: 'paid', date: '2026-04-14', method: 'UPI' },
  { id: 'T2', campaignId: 'C2', advertiser: 'Nashik Jewellers', type: 'Campaign Payment', amount: 85000, status: 'paid', date: '2026-04-19', method: 'Net Banking' },
  { id: 'T3', campaignId: 'C3', advertiser: 'Saitherish India', type: 'Campaign Payment', amount: 35600, status: 'paid', date: '2026-03-09', method: 'UPI' },
];

// Price calculation logic
export function calculatePrice(routes, busCount, duration) {
  const selectedRoutes = ROUTES.filter(r => routes.includes(r.id));
  const basePrice = 150; // per bus per day
  let routeMultiplier = 1;
  selectedRoutes.forEach(r => {
    if (r.type === 'premium') routeMultiplier = Math.max(routeMultiplier, 1.5);
    if (r.type === 'religious') routeMultiplier = Math.max(routeMultiplier, 1.3);
    if (r.traffic === 'high') routeMultiplier = Math.max(routeMultiplier, 1.4);
  });
  const base = basePrice * busCount * duration;
  const routeCost = base * routeMultiplier;
  const printingCost = busCount * 350;
  const premiumLocation = selectedRoutes.some(r => r.type === 'premium') ? busCount * 200 : 0;
  const subtotal = routeCost + printingCost + premiumLocation;
  const gst = subtotal * 0.18;
  return {
    base: Math.round(base),
    routeMultiplier,
    routeCost: Math.round(routeCost),
    printingCost,
    premiumLocation,
    subtotal: Math.round(subtotal),
    gst: Math.round(gst),
    total: Math.round(subtotal + gst),
  };
}

// Impression calculation logic
export function calculateImpressions(routes, busCount, duration) {
  const selectedRoutes = ROUTES.filter(r => routes.includes(r.id));
  const totalDailyRiders = selectedRoutes.reduce((s, r) => s + r.daily_riders, 0);
  const viewRate = 0.35;
  const peakMultiplier = 1.4;
  const dailyBase = totalDailyRiders * viewRate * (busCount / 50);
  const dailyHigh = dailyBase * peakMultiplier;
  const low = Math.round(dailyBase * duration);
  const high = Math.round(dailyHigh * duration);
  const avgCPM = selectedRoutes.length > 0
    ? calculatePrice(routes, busCount, duration).total / ((low + high) / 2) * 1000
    : 0;
  const dailyReach = Math.round((low + high) / 2 / duration);
  const coverage = selectedRoutes.reduce((s, r) => s + r.distance, 0);
  const visibilityScore = Math.min(100, Math.round((busCount / 500) * 100 * (selectedRoutes.length / ROUTES.length) * 3));
  return { low, high, avgCPM: Math.round(avgCPM * 100) / 100, dailyReach, coverage: Math.round(coverage * 10) / 10, visibilityScore, totalDailyRiders };
}

// Daily analytics data generator
export function generateDailyData(days = 14) {
  const data = [];
  const base = 180000;
  for (let i = days; i > 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    data.push({
      date: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      impressions: Math.round(base + Math.random() * 60000 - 20000),
      reach: Math.round((base * 0.47) + Math.random() * 30000 - 10000),
    });
  }
  return data;
}

// Route performance data
export function getRoutePerformance() {
  return ROUTES.slice(0, 5).map(r => ({
    route: r.name,
    impressions: `${(r.daily_riders * 14 * 0.35 / 1000).toFixed(0)}K`,
    reach: `${(r.daily_riders * 14 * 0.35 * 0.47 / 1000).toFixed(0)}K`,
    cost: `₹${(Math.round(r.daily_riders * 0.8)).toLocaleString('en-IN')}`,
    cpm: `₹${(Math.round(25 + Math.random() * 15)).toFixed(0)}`,
    efficiency: `${Math.round(70 + Math.random() * 28)}/100`,
  }));
}
