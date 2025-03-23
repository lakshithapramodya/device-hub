"use client";

import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1 2xl:gap-1.5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-lg 2xl:text-2xl font-bold tracking-tight">
          {title}
        </h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Button
          asChild={!!action.href}
          onClick={action.onClick}
          className="mt-2 sm:mt-0"
        >
          {action.href ? (
            <a href={action.href}>{action.label}</a>
          ) : (
            action.label
          )}
        </Button>
      )}
    </div>
  );
}
