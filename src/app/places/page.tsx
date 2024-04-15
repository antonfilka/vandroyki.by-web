import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlacesList } from "@/modules/destinationListItem";
import Link from "next/link";

export default function Places() {
  return (
    <div className="w-full h-full flex justify-between gap-5 p-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Popular places in your city</CardTitle>
          <CardDescription>Find places where to go...</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/places/suggest">
            <Button>Suggest new place</Button>
          </Link>
          <PlacesList />
        </CardContent>
      </Card>
    </div>
  );
}
