import React from "react";

import Image from "next/image";

const CoverImage = () => {
  return (
    <div className="flex flex-col items-center h-fit lg:h-full w-full lg:w-[71%] lg:rounded-br-[200px] 2xl:rounded-br-[300px] overflow-hidden">
      <Image
        alt="Sign In Cover"
        src="/images/auth-cover.webp"
        className="w-full h-auto object-cover max-lg:hidden"
        width={1920}
        height={1080}
      />
      <Image
        alt="Sign In Cover"
        src="/images/auth-cover.webp"
        className="w-full h-auto object-contain lg:hidden"
        width={1024}
        height={1024}
      />
    </div>
  );
};

export default CoverImage;
