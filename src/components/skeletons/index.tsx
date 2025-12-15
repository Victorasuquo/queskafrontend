import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// ============================================
// Card Skeletons
// ============================================

export function DestinationCardSkeleton() {
    return (
        <Card className="overflow-hidden">
            <Skeleton className="h-48 w-full rounded-none" />
            <CardContent className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </CardContent>
        </Card>
    );
}

export function EventCardSkeleton() {
    return (
        <Card className="overflow-hidden">
            <Skeleton className="h-48 w-full rounded-none" />
            <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <Skeleton className="h-6 w-4/5" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-9 w-28" />
                </div>
            </CardContent>
        </Card>
    );
}

export function ActivityCardSkeleton() {
    return (
        <Card className="overflow-hidden">
            <Skeleton className="h-48 w-full rounded-none" />
            <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <Skeleton className="h-6 w-3/4" />
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="flex items-center gap-1">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-9 w-24" />
                </div>
            </CardContent>
        </Card>
    );
}

// ============================================
// Grid Skeletons
// ============================================

export function DestinationGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <DestinationCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function EventGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <EventCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function ActivityGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ActivityCardSkeleton key={i} />
            ))}
        </div>
    );
}

// ============================================
// Page Section Skeletons
// ============================================

export function HeroSkeleton() {
    return (
        <div className="relative h-[500px] bg-gradient-to-r from-[#073149] to-[#0a4a6e]">
            <div className="container mx-auto px-4 h-full flex flex-col justify-center">
                <Skeleton className="h-12 w-2/3 max-w-xl mb-4 bg-white/20" />
                <Skeleton className="h-6 w-1/2 max-w-md mb-8 bg-white/20" />
                <div className="flex gap-4">
                    <Skeleton className="h-12 w-32 bg-white/20" />
                    <Skeleton className="h-12 w-32 bg-white/20" />
                </div>
            </div>
        </div>
    );
}

export function FilterSidebarSkeleton() {
    return (
        <div className="space-y-6 p-4 border rounded-lg">
            <div className="space-y-3">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-3">
                <Skeleton className="h-5 w-24" />
                <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="space-y-3">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    );
}

export function SearchBarSkeleton() {
    return (
        <div className="flex gap-4 items-center">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-32" />
        </div>
    );
}

// ============================================
// Dashboard Skeletons
// ============================================

export function DashboardStatsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-8 w-16" />
                            </div>
                            <Skeleton className="h-12 w-12 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-32 mt-4" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export function DashboardChartSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-64 w-full" />
            </CardContent>
        </Card>
    );
}

export function TripCardSkeleton() {
    return (
        <Card>
            <div className="flex">
                <Skeleton className="h-32 w-48 rounded-l-lg rounded-r-none" />
                <CardContent className="flex-1 p-4 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-5 w-20 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}

export function TripListSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <TripCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function BookingCardSkeleton() {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-12 w-12 rounded" />
                            <div className="space-y-1">
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-1">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <div className="flex items-center gap-1">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </div>
                    </div>
                    <div className="text-right space-y-2">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function BookingListSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <BookingCardSkeleton key={i} />
            ))}
        </div>
    );
}

// ============================================
// Profile & Settings Skeletons
// ============================================

export function ProfileSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-6">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-40" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function SettingsFormSkeleton() {
    return (
        <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
            ))}
            <Skeleton className="h-10 w-32" />
        </div>
    );
}

// ============================================
// Vendor Skeletons
// ============================================

export function VendorListingCardSkeleton() {
    return (
        <Card>
            <Skeleton className="h-40 w-full rounded-t-lg rounded-b-none" />
            <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-5 w-20" />
                    <div className="flex gap-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function VendorListingsGridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <VendorListingCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function VendorAnalyticsSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </div>
                            <Skeleton className="h-10 w-20 mt-2" />
                            <Skeleton className="h-4 w-28 mt-2" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-72 w-full" />
                </CardContent>
            </Card>
        </div>
    );
}

// ============================================
// Admin Skeletons
// ============================================

export function AdminTableSkeleton({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
                <div className="flex gap-4">
                    {Array.from({ length: columns }).map((_, i) => (
                        <Skeleton key={i} className="h-4 flex-1" />
                    ))}
                </div>
            </div>
            <div className="divide-y">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="p-4">
                        <div className="flex gap-4 items-center">
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <Skeleton key={colIndex} className="h-4 flex-1" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function AdminDashboardSkeleton() {
    return (
        <div className="space-y-6">
            <DashboardStatsSkeleton />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardChartSkeleton />
                <DashboardChartSkeleton />
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                    <AdminTableSkeleton rows={5} columns={4} />
                </CardContent>
            </Card>
        </div>
    );
}

// ============================================
// Wishlist & Reviews Skeletons
// ============================================

export function WishlistItemSkeleton() {
    return (
        <Card className="flex overflow-hidden">
            <Skeleton className="h-28 w-40 rounded-l-lg rounded-r-none" />
            <CardContent className="flex-1 p-4 flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex flex-col gap-2 items-end">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </CardContent>
        </Card>
    );
}

export function WishlistSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <WishlistItemSkeleton key={i} />
            ))}
        </div>
    );
}

export function ReviewCardSkeleton() {
    return (
        <Card>
            <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-1">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-4 w-4" />
                        ))}
                    </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex items-center gap-4 pt-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                </div>
            </CardContent>
        </Card>
    );
}

export function ReviewListSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <ReviewCardSkeleton key={i} />
            ))}
        </div>
    );
}

// ============================================
// AI Chat Skeletons
// ============================================

export function AIChatMessageSkeleton() {
    return (
        <div className="flex gap-3">
            <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    );
}

export function AIChatSkeleton() {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 space-y-4 p-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <AIChatMessageSkeleton key={i} />
                ))}
            </div>
            <div className="p-4 border-t">
                <div className="flex gap-2">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 w-10" />
                </div>
            </div>
        </div>
    );
}

// ============================================
// Notification Skeletons
// ============================================

export function NotificationItemSkeleton() {
    return (
        <div className="flex items-start gap-3 p-3 border-b">
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-2 w-2 rounded-full" />
        </div>
    );
}

export function NotificationListSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div>
            {Array.from({ length: count }).map((_, i) => (
                <NotificationItemSkeleton key={i} />
            ))}
        </div>
    );
}

// ============================================
// Detail Page Skeletons
// ============================================

export function DestinationDetailSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-80 w-full rounded-lg" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <Skeleton className="h-10 w-3/4" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-28" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="pt-4">
                        <Skeleton className="h-6 w-32 mb-3" />
                        <div className="flex flex-wrap gap-2">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-8 w-24 rounded-full" />
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export function EventDetailSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Skeleton className="h-96 w-full rounded-lg" />
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-3/4" />
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5" />
                            <Skeleton className="h-5 w-48" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5" />
                            <Skeleton className="h-5 w-40" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5" />
                            <Skeleton className="h-5 w-32" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <Skeleton className="h-8 w-28" />
                        <Skeleton className="h-12 w-36" />
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
    );
}

// ============================================
// Generic Skeletons
// ============================================

export function PageHeaderSkeleton() {
    return (
        <div className="space-y-2 mb-8">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-96" />
        </div>
    );
}

export function TabsSkeleton({ tabs = 4 }: { tabs?: number }) {
    return (
        <div className="flex gap-2 border-b pb-2">
            {Array.from({ length: tabs }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24" />
            ))}
        </div>
    );
}

export function PaginationSkeleton() {
    return (
        <div className="flex items-center justify-center gap-2 pt-6">
            <Skeleton className="h-10 w-10" />
            {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-10" />
            ))}
            <Skeleton className="h-10 w-10" />
        </div>
    );
}

export function EmptyStateSkeleton() {
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-10 w-32" />
        </div>
    );
}

// ============================================
// Full Page Skeletons
// ============================================

export function DestinationsPageSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <PageHeaderSkeleton />
            <SearchBarSkeleton />
            <div className="flex gap-6 mt-8">
                <div className="hidden lg:block w-64 flex-shrink-0">
                    <FilterSidebarSkeleton />
                </div>
                <div className="flex-1">
                    <DestinationGridSkeleton count={9} />
                    <PaginationSkeleton />
                </div>
            </div>
        </div>
    );
}

export function EventsPageSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <PageHeaderSkeleton />
            <SearchBarSkeleton />
            <div className="flex gap-6 mt-8">
                <div className="hidden lg:block w-64 flex-shrink-0">
                    <FilterSidebarSkeleton />
                </div>
                <div className="flex-1">
                    <EventGridSkeleton count={9} />
                    <PaginationSkeleton />
                </div>
            </div>
        </div>
    );
}

export function ActivitiesPageSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <PageHeaderSkeleton />
            <SearchBarSkeleton />
            <div className="flex gap-6 mt-8">
                <div className="hidden lg:block w-64 flex-shrink-0">
                    <FilterSidebarSkeleton />
                </div>
                <div className="flex-1">
                    <ActivityGridSkeleton count={9} />
                    <PaginationSkeleton />
                </div>
            </div>
        </div>
    );
}

export function DashboardPageSkeleton() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>
            <DashboardStatsSkeleton />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                        <TripListSkeleton count={3} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-40" />
                    </CardHeader>
                    <CardContent>
                        <NotificationListSkeleton count={5} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
