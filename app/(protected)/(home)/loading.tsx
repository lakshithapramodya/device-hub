import React from "react";

const Loading = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="h-8 w-64 bg-muted animate-pulse rounded mb-8"></div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded"></div>
        ))}
      </div>
      <div className="grid gap-6 mt-8 md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-80 bg-muted animate-pulse rounded"></div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
