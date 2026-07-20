# Nemvol — Frontend Architecture & Implementation Plan

## What this document covers

A structured, end-to-end plan for wiring the existing UI prototype into a real, production-ready commerce web builder. It starts at authentication and walks through every domain in the order you should build them.

---

## Recommended libraries (write less code, do more)

| Concern | Library | Why |
|---|---|---|
| Auth | **Supabase Auth** or **Clerk** | Drop-in auth with Google OAuth, session management, JWTs, and React hooks. Zero custom auth code. |
| Server state / data fetching | **TanStack Query (React Query)** | Caching, background refetch, loading/error states, mutations, and optimistic updates — replaces every `useState` + `useEffect` fetch pattern. |
| Global client state | **Zustand** | Tiny, no boilerplate. Replace `PlanGateContext`, `AddProductContext`, and any cross-page UI state. |
| Forms | **React Hook Form** + **Zod** | Replaces all manual `useState` form objects and validation logic. Works across Login, Signup, StoreInfo, Profile, AddProduct, CreateOrder, etc. |
| File uploads | **Uploadthing** or **Supabase Storage** | Signed upload URLs, progress tracking, CDN delivery. Replaces the current `FileReader` preview-only approach. |
| Tables | **TanStack Table** | Sorting, filtering, pagination for Orders, Customers, Invoices, Payments, Products tables. |
| Charts | **Recharts** | Lightweight, composable. For Overview StatCards, CustomersCharts, GrowthTable. |
| Payments | **react-paystack** | Official Paystack React wrapper. Replaces the simulated PaymentDrawer flows. |
| Notifications / toasts | **Sonner** | One-line toast calls. Replaces all `setSaved(true) + setTimeout` patterns across StoreInfo, Profile, etc. |
| Date handling | **date-fns** | For trial expiry, invoice dates, order timestamps. |
| Drag & drop (Storefront builder) | **dnd-kit** | For theme/block reordering in the Storefront page. |

---

## Phase 1 — Authentication

### Current state
Login and Signup are presentation-only. The dashboard is reachable without signing in. Plan state lives only in `localStorage`.

### What to build

**1.1 Auth provider setup**

Use **Clerk** (recommended for speed) or **Supabase Auth**.

```
src/
  lib/
    auth.ts          ← auth client instance
  contexts/
    AuthContext.tsx  ← useAuth() hook wrapping Clerk/Supabase session
```

With Clerk, wrap `main.tsx`:
```tsx
// main.tsx
<ClerkProvider publishableKey={...}>
  <App />
</ClerkProvider>
```

With Supabase:
```tsx
// AuthContext.tsx — useSession(), useUser() from @supabase/auth-helpers-react
```

**1.2 Route protection**

Replace the open `/dashboard` route with a protected wrapper:

```tsx
// router/index.tsx
function RequireAuth({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth(); // Clerk
  if (!isLoaded) return <FullPageSpinner />;
  if (!isSignedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// wrap the dashboard route:
{ path: '/dashboard', element: <RequireAuth><DashboardLayout /></RequireAuth> }
```

**1.3 Login / Signup forms**

Wire with **React Hook Form + Zod**:

```tsx
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
});

const onSubmit = async (data) => {
  await signIn(data.email, data.password); // Clerk or Supabase call
  navigate('/dashboard');
};
```

This replaces the current `useState({ email, password })` + manual `e.preventDefault()` pattern in both Login.tsx and Signup.tsx.

**1.4 Google OAuth**

Both Clerk and Supabase handle this with one line — the existing Google button just calls:
```tsx
signInWithOAuth({ provider: 'google' }) // Supabase
// or
signIn('oauth_google') // Clerk
```

**1.5 Session-aware TopBar and Profile**

Replace hardcoded `avatarInitials = 'FR'` and `'franklin@nemvol.com'` in TopBar.tsx and Profile.tsx with real user data from the auth hook:

```tsx
const { user } = useUser(); // Clerk
// user.firstName, user.emailAddresses[0].emailAddress, user.imageUrl
```

---

## Phase 2 — Plan Gate & Billing (server-authoritative)

### Current state
`PlanGateContext` reads/writes `localStorage`. Any user can open DevTools and bypass it. Payment flows are simulated.

### What to build

**2.1 Subscription state in Zustand**

```ts
// stores/subscriptionStore.ts
interface SubscriptionStore {
  planId: 'free' | 'pro' | 'business' | null;
  status: 'active' | 'trial' | 'expired' | 'pending';
  trialEndsAt: string | null;
  setSubscription: (sub: Partial<SubscriptionStore>) => void;
}
export const useSubscriptionStore = create<SubscriptionStore>(...)
```

**2.2 Fetch subscription from API on dashboard load**

```tsx
// hooks/useSubscription.ts
export function useSubscription() {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: () => api.get('/subscription'), // returns { planId, status, trialEndsAt }
  });
}
```

`PlanGateContext` becomes a thin wrapper that reads from this query instead of `localStorage`.

**2.3 Real Paystack integration**

Replace the simulated PaymentDrawer with `react-paystack`:

```tsx
import { usePaystackPayment } from 'react-paystack';

const initializePayment = usePaystackPayment({
  reference: generateRef(),
  email: user.email,
  amount: planPrice * 100, // kobo
  publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
});

// On success, call your API to verify the webhook and activate the plan
const onSuccess = async (ref) => {
  await api.post('/billing/verify', { reference: ref.reference });
  await queryClient.invalidateQueries({ queryKey: ['subscription'] });
};
```

Bank transfer proof upload uses **Supabase Storage** or **Uploadthing** — get a signed URL, upload the file, send the URL to your API.

**2.4 Billing page**

BillingPlans.tsx should call the same `useSubscription()` hook and highlight the active plan. The upgrade/downgrade buttons trigger the Paystack flow above.

---

## Phase 3 — Store Setup & Onboarding

### Current state
StoreInfo.tsx holds all state locally. SetupProgress.tsx has hardcoded `done` booleans. No data persists.

### What to build

**3.1 Store query and mutation**

```ts
// hooks/useStore.ts
export function useStore() {
  return useQuery({ queryKey: ['store'], queryFn: () => api.get('/store') });
}

export function useUpdateStore() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: StorePayload) => api.patch('/store', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['store'] });
      toast.success('Store saved');  // Sonner — replaces setSaved(true) + setTimeout
    },
  });
}
```

**3.2 StoreInfo.tsx refactor**

Replace all `useState` form fields with React Hook Form. On submit call `useUpdateStore().mutate(formData)`. Remove the `setSaved` / `setTimeout` pattern — Sonner handles the toast.

**3.3 SetupProgress — dynamic steps**

Steps should be derived from real data:

```ts
const steps = [
  { label: 'Add your first product', done: productsCount > 0 },
  { label: 'Setup payment methods', done: paymentMethods.length > 0 },
  { label: 'Customise your store', done: !!store?.theme },
  { label: 'Launch your storefront', done: store?.published },
  { label: 'Connect custom domain', done: !!store?.customDomain },
];
```

**3.4 Logo / media upload**

Replace the `FileReader` preview in StoreIdentity.tsx with a real upload:

```tsx
const { startUpload } = useUploadThing('storeMedia');
const handleLogoChange = async (file: File) => {
  const [res] = await startUpload([file]);
  updateStore({ logoUrl: res.url });
};
```

---

## Phase 4 — Products & Catalogue

### Current state
AddProductModal has a multi-step wizard with local state. ProductsView shows static mock data. Categories, Attributes, GiftCards are UI-only.

### What to build

**4.1 Products query**

```ts
export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => api.get('/products', { params: filters }),
  });
}
```

**4.2 AddProduct mutation**

```ts
export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductPayload) => api.post('/products', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created');
    },
  });
}
```

**4.3 Media upload in wizard**

StepMedia.tsx should use signed upload URLs. Upload files first, get back URLs, then include them in the product payload.

**4.4 ProductsView table**

Replace static rows with TanStack Table fed by `useProducts()`. Add column sorting, search filter, and pagination.

**4.5 Entitlement check**

Free plan = 10 products max. Check before opening AddProductModal:

```tsx
const { data: products } = useProducts();
const { data: sub } = useSubscription();
const canAdd = sub?.planId !== 'free' || products?.total < 10;
```

---

## Phase 5 — Orders & Sales

### Current state
Orders, Invoices, Payments all show static/mock tables. CreateOrderDrawer does not persist.

### What to build

**5.1 Orders**

```ts
useOrders(filters)       // GET /orders
useCreateOrder()         // POST /orders
useUpdateOrderStatus()   // PATCH /orders/:id/status
```

OrdersTable uses TanStack Table. Filter by `paid | unpaid | all` maps to API query params.

**5.2 Invoices**

```ts
useInvoices(filter)      // GET /invoices
useCreateInvoice()       // POST /invoices
```

Export button calls `api.get('/invoices/export', { responseType: 'blob' })` and triggers a download.

**5.3 Payments**

```ts
useTransactions(filter)  // GET /payments
usePaymentMethods()      // GET /payment-methods
useSetPaymentMethod()    // POST /payment-methods
useLogExpense()          // POST /expenses
```

Payment method toggles (cards, transfer, POD) call `useSetPaymentMethod()` instead of local `enabledMethods` state.

---

## Phase 6 — Customers

### Current state
CustomersTable is static. AddCustomerDrawer and ManageCsvDrawer do not persist.

### What to build

```ts
useCustomers(filter)     // GET /customers
useCreateCustomer()      // POST /customers
useImportCustomersCsv()  // POST /customers/import
```

CustomersCharts feeds from `useQuery({ queryKey: ['customers', 'analytics'] })`. Replace static chart data with Recharts components consuming real aggregates.

---

## Phase 7 — Inventory & Purchases

### Current state
Purchases and Suppliers are UI-only. Locations state is lost on unmount.

### What to build

```ts
useLocations()           // GET /locations
useCreateLocation()      // POST /locations
usePurchases(filter)     // GET /purchases
useCreatePurchase()      // POST /purchases
useSuppliers()           // GET /suppliers
useCreateSupplier()      // POST /suppliers
```

Inventory movements (receive, transfer, adjustment) are append-only records — never edit stock directly.

---

## Phase 8 — Storefront & Domain

### Current state
ThemeGrid shows static themes. LaunchStorefrontModal is UI-only. Domain state is lost on unmount.

### What to build

**8.1 Storefront**

```ts
useStorefront()          // GET /storefront (theme, published status, pages)
useSelectTheme()         // PATCH /storefront/theme
usePublishStorefront()   // POST /storefront/publish
```

**8.2 Pages**

```ts
usePages()               // GET /pages
useCreatePage()          // POST /pages
useUpdatePage()          // PATCH /pages/:id
useDeletePage()          // DELETE /pages/:id
```

**8.3 Domain**

```ts
useDomains()             // GET /domains
useConnectDomain()       // POST /domains/connect  → returns DNS records to verify
useVerifyDomain()        // POST /domains/:id/verify
```

ConnectDomainDrawer shows the DNS records returned by the API. A background job polls verification and updates status.

---

## Phase 9 — Shipment

### Current state
`hasZones = false` is hardcoded. AddShippingZoneDrawer does not persist.

### What to build

```ts
useShippingZones()       // GET /shipping-zones
useCreateShippingZone()  // POST /shipping-zones
useShipmentSettings()    // GET /shipment-settings (master toggle, delivery mode)
useUpdateShipmentSettings() // PATCH /shipment-settings
```

---

## Phase 10 — Staff & Roles

### Current state
Staff state lives in `Staffs.tsx` component state — lost on unmount.

### What to build

```ts
useStaff()               // GET /staff
useInviteStaff()         // POST /staff/invite  (sends email invite)
useUpdateStaff()         // PATCH /staff/:id
useRemoveStaff()         // DELETE /staff/:id
```

Role-based access: define a `usePermission(action)` hook that checks the current user's role before showing sensitive UI (billing, payout details, staff admin).

```ts
// hooks/usePermission.ts
export function usePermission(action: Permission) {
  const { user } = useStoreUser(); // current member's role
  return ROLE_PERMISSIONS[user.role]?.includes(action) ?? false;
}
```

---

## Phase 11 — Tools (Growth)

### Current state
Tracker values live in `Tools.tsx` state. Lead capture and access gate are UI-only.

### What to build

```ts
useTrackers()            // GET /tools/trackers
useSaveTracker()         // PATCH /tools/trackers/:id
useLeads()               // GET /tools/leads
useLeadCaptureConfig()   // GET/PATCH /tools/lead-capture
```

Tracker IDs are stored server-side and injected into the published storefront — never hardcoded in the SPA.

---

## Phase 12 — Profile

### Current state
Profile.tsx holds all state locally. Sign out just navigates to `/login`.

### What to build

```ts
useUpdateProfile()       // PATCH /auth/profile  (name, phone)
useChangePassword()      // POST /auth/change-password
useUploadAvatar()        // handled via Uploadthing/Supabase Storage
```

Sign out calls the auth provider's `signOut()` method, which clears the session and redirects.

Replace the `setSaved + setTimeout` pattern with Sonner:
```tsx
const { mutate } = useUpdateProfile();
// onSuccess: toast.success('Profile updated')
// onError: toast.error('Failed to save')
```

---

## Global state architecture

```
App
├── AuthProvider (Clerk / Supabase)
├── QueryClientProvider (TanStack Query)
├── Toaster (Sonner)
└── RouterProvider
    ├── Public routes (no auth)
    ├── RequireAuth
    │   └── DashboardLayout
    │       ├── SubscriptionProvider (thin — reads from useSubscription query)
    │       ├── AddProductProvider (Zustand or keep as context)
    │       └── Dashboard pages
```

**Zustand stores** (cross-page, non-server state):
- `useUIStore` — sidebar open, active modal, global loading
- `useSubscriptionStore` — mirrors server subscription, used for entitlement checks

**TanStack Query** handles everything that comes from the API. No `useState` for server data.

**React Hook Form + Zod** handles every form. No manual `useState` form objects.

**Sonner** replaces every `setSaved(true) + setTimeout(() => setSaved(false), 3000)` pattern.

---

## Data flow summary (production)

```
User action (form submit / button click)
  → React Hook Form validates with Zod schema
  → useMutation() calls API
  → API returns updated resource
  → queryClient.invalidateQueries() refetches affected queries
  → UI re-renders with fresh data
  → Sonner toast confirms success or error
```

For reads:
```
Component mounts
  → useQuery() checks cache
  → If stale/missing: fetch from API
  → Loading state shown (skeleton)
  → Data rendered
  → Background refetch on window focus
```

---

## Build order (priority)

1. Auth (Clerk/Supabase) + route protection + real session in TopBar/Profile
2. TanStack Query + Zustand + React Hook Form + Sonner installed and wired
3. Store setup (StoreInfo, logo upload, SetupProgress dynamic)
4. Subscription + real Paystack integration (PlanGate becomes server-driven)
5. Products + media upload + entitlement check
6. Orders + Customers + Invoices + Payments
7. Purchases + Locations + Inventory movements
8. Storefront + Pages + Domain
9. Shipment zones
10. Staff + permissions
11. Tools (trackers, leads)
12. Analytics aggregates for Overview and Customers charts

---

## Key decisions to resolve before building

- **Auth provider**: Clerk (faster DX, built-in UI) vs Supabase Auth (open source, same SDK as DB/storage)
- **Backend**: Supabase (BaaS, fast to start) vs custom Node/Express/NestJS API
- **Plan names**: Consolidate `Free/Pro/Business` (PlanGate) with `Starter/Growth/Premium` (Billing page) into one server-managed catalogue
- **Multi-store**: Does one user own one store or many? This affects the entire API scoping
- **Storefront rendering**: Is the published storefront a separate Next.js/Remix app or served from the same Vite SPA?
