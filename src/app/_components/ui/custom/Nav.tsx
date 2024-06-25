"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/app/_components/ui/navigation-menu";

export default function Navigation() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-600 to-blue-700 blur-2xl"></div>
      <NavigationMenu className="p-4">
        <NavigationMenuList className="gap-6">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  " bg-black text-lg text-white hover:bg-white hover:text-black",
                )}
              >
                Track/Trace
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/quotes" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  " bg-black text-lg text-white hover:bg-white hover:text-black",
                )}
              >
                Get a Quote
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
