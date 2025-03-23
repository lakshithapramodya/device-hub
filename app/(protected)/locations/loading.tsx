import React from "react";

import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="size-full flex items-center justify-center">
      <Loader2 className="size-5 lg:size-8 text-black animate-spin" />
    </div>
  );
};

export default Loading;
