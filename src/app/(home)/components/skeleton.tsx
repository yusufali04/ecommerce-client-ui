import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
    return (
        <div className="container mx-auto max-w-screen-lg">
            <div className="w-[180px]">
                <Skeleton className="h-9 w-full rounded-md mt-6" />
            </div>
            <div className="grid grid-cols-4 gap-6 py-6">
                <Card className="border-none rounded-xl">
                    <CardHeader className="flex items-center justify-center">
                        {/* image frame 200 x 200 */}
                        <div className="w-[200px] h-[200px] overflow-hidden rounded-md">
                            <Skeleton className="w-full h-full" />
                        </div>
                    </CardHeader>

                    <CardContent>
                        {/* title */}
                        <Skeleton className="h-4 w-2/3" />
                        {/* description (one truncated line in real card; two bars look nicer in skeleton) */}
                        <div className="mt-2 space-y-2">
                            <Skeleton className="h-3 w-3/4" />
                        </div>
                    </CardContent>

                    <CardFooter className="flex items-center justify-between">
                        {/* price */}
                        <div className="space-y-1">
                            <Skeleton className="h-3 w-14" />
                        </div>
                        {/* select button (pill) */}
                        <Skeleton className="h-9 w-24 rounded-full" />
                    </CardFooter>
                </Card>
                <Card className="border-none rounded-xl">
                    <CardHeader className="flex items-center justify-center">
                        {/* image frame 200 x 200 */}
                        <div className="w-[200px] h-[200px] overflow-hidden rounded-md">
                            <Skeleton className="w-full h-full" />
                        </div>
                    </CardHeader>

                    <CardContent>
                        {/* title */}
                        <Skeleton className="h-4 w-2/3" />
                        {/* description (one truncated line in real card; two bars look nicer in skeleton) */}
                        <div className="mt-2 space-y-2">
                            <Skeleton className="h-3 w-3/4" />
                        </div>
                    </CardContent>

                    <CardFooter className="flex items-center justify-between">
                        {/* price */}
                        <div className="space-y-1">
                            <Skeleton className="h-3 w-14" />
                        </div>
                        {/* select button (pill) */}
                        <Skeleton className="h-9 w-24 rounded-full" />
                    </CardFooter>
                </Card>
                <Card className="border-none rounded-xl">
                    <CardHeader className="flex items-center justify-center">
                        {/* image frame 200 x 200 */}
                        <div className="w-[200px] h-[200px] overflow-hidden rounded-md">
                            <Skeleton className="w-full h-full" />
                        </div>
                    </CardHeader>

                    <CardContent>
                        {/* title */}
                        <Skeleton className="h-4 w-2/3" />
                        {/* description (one truncated line in real card; two bars look nicer in skeleton) */}
                        <div className="mt-2 space-y-2">
                            <Skeleton className="h-3 w-3/4" />
                        </div>
                    </CardContent>

                    <CardFooter className="flex items-center justify-between">
                        {/* price */}
                        <div className="space-y-1">
                            <Skeleton className="h-3 w-14" />
                        </div>
                        {/* select button (pill) */}
                        <Skeleton className="h-9 w-24 rounded-full" />
                    </CardFooter>
                </Card>
                <Card className="border-none rounded-xl">
                    <CardHeader className="flex items-center justify-center">
                        {/* image frame 200 x 200 */}
                        <div className="w-[200px] h-[200px] overflow-hidden rounded-md">
                            <Skeleton className="w-full h-full" />
                        </div>
                    </CardHeader>

                    <CardContent>
                        {/* title */}
                        <Skeleton className="h-4 w-2/3" />
                        {/* description (one truncated line in real card; two bars look nicer in skeleton) */}
                        <div className="mt-2 space-y-2">
                            <Skeleton className="h-3 w-3/4" />
                        </div>
                    </CardContent>

                    <CardFooter className="flex items-center justify-between">
                        {/* price */}
                        <div className="space-y-1">
                            <Skeleton className="h-3 w-14" />
                        </div>
                        {/* select button (pill) */}
                        <Skeleton className="h-9 w-24 rounded-full" />
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
