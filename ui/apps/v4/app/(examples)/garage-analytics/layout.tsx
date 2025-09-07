import { AppSidebar } from "@/app/(examples)/garage-analytics/components/app-sidebar"
import { SiteHeader } from "@/app/(examples)/garage-analytics/components/site-header"
import { SidebarInset, SidebarProvider } from "@/registry/new-york-v4/ui/sidebar"

export default function GarageAnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <main className="@container/main flex min-h-screen flex-1 flex-col gap-2 bg-muted/50">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}