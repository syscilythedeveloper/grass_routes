import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CafeSessionCard } from "./CafeSessionCard";
const cafeSessions = [
  {
    id: 1,
    title: "Creative Grounds",
    startTime: "18:00",
    endTime: "21:00",
    date: "2023-09-15",
    zipCode: "20020",
    city: "Washington, DC",

    attendees: [
      {
        name: "Syscily",
        profilePic:
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1755282034/sys_singleArmRow_nbqd9o.png",
      },
      {
        name: "Enijah S",
        profilePic:
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604111/enijah_sfdym5.png",
      },
    ],
    locationImage:
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nr9ZgGC45HB1irJtNx57SBO95SArQa7ZmgCD1528_S8jsX1-FFzVxtLNDAp0ZrPLdkf1pT8Ghpo3CJl9OIpLJFYxEHPbRB41qA2q7Z7lnUbAS4s06fKRMggTq07M4obbMUcgw-MAA=s1360-w1360-h1020-rw",
  },
  {
    id: 2,
    title: "Rue Café",
    startTime: "19:00",
    endTime: "22:00",
    date: "2023-09-16",
    zipCode: "20011",
    city: "Washington, DC",
    attendees: [
      {
        name: "Amanda M",
        profilePic:
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754603476/amanda_fuyzbl.png",
      },
      {
        name: "Gabby",
        profilePic:
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604052/gabby_gqqlp3.png",
      },
      {
        name: "Kiara M",
        profilePic:
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604075/kiara_eoarvx.png",
      },
    ],
    locationImage:
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noEv5xTMchpEswqalrnUQ95tYw7cMT8HDmpzuNxrLcz7i9C4SMxPhDyfC7CThG_RIno7yP0RijHoUQadrdOS3zFh3ylXMMXzakonpayKis0H2_fxRupber0ev-sA0V2Z1uHjhvtjg=s1360-w1360-h1020-rw",
  },
  {
    id: 3,
    title: "Gigi's Coffee Roasters",
    startTime: "17:00",
    endTime: "20:00",
    date: "2023-09-17",
    zipCode: "20019",
    city: "Washington, DC",
    attendees: [
      {
        name: "Amanda M",
        profilePic:
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754603476/amanda_fuyzbl.png",
      },
      {
        name: "Gabby",
        profilePic:
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604052/gabby_gqqlp3.png",
      },
      {
        name: "Kiara M",
        profilePic:
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604075/kiara_eoarvx.png",
      },
      {
        name: "Syscily",
        profilePic:
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1755282034/sys_singleArmRow_nbqd9o.png",
      },
      {
        name: "Enijah S",
        profilePic:
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604111/enijah_sfdym5.png",
      },
    ],
    locationImage:
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqw-Crxkanb3ipxwDKlmFvcRJDhphh2fxhtrO2lt0xAhdJbN97c0SjzSGEweNyXZl5NrBBDkdMl-GCIYVuCE1VPQ4HrTCT4ejWq7YVVDowIx2bjXfIIzVGUqFyfH6QBC9hveTtiXi7iSMA=s1360-w1360-h1020-rw",
  },
  {
    id: 4,
    title: "The Coffee Bar",
    startTime: "08:00",
    endTime: "11:00",
    date: "2023-09-18",
    zipCode: "20001",
    city: "Washington, DC",
    attendees: [
      {
        name: "Amanda M",
        profilePic:
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754603476/amanda_fuyzbl.png",
      },
      {
        name: "Gabby",
        profilePic:
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604052/gabby_gqqlp3.png",
      },
      {
        name: "Kiara M",
        profilePic:
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604075/kiara_eoarvx.png",
      },
    ],
    locationImage:
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqcggzUC4oyhcVDkAIMXPNkIdJOXiHPZnVLtlwCFZk44rFFEtgGFZWOX886WOo5omg_xH7AWlATZvo2EGu4N1NA_h5G8qehwCbiVcy8arJG4_i02I3QSMis2Q5nxGRbFUFYgoc=s1360-w1360-h1020-rw",
  },
];

import React from "react";

const CafeSessions = () => {
  return (
    <div className="my-10 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Upcoming Cafe Sessions
      </h2>
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent className="-ml-1">
          {cafeSessions.map((session, index) => (
            <CarouselItem
              key={session.id || index}
              className="pl-1 basis-1/3"
            >
              <div className="p-1 h-full">
                <CafeSessionCard session={session} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CafeSessions;
