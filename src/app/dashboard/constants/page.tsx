import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CitiesManagement } from "./modules/citiesManagement";
import { InterestsManagement } from "./modules/interestsManagement";

export default function Constants() {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <nav className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard/constants">Constants</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="interests">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="interests">Interests</TabsTrigger>
              <TabsTrigger value="cities">Cities</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="interests">
            <InterestsManagement />
          </TabsContent>
          <TabsContent value="cities">
            <CitiesManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
