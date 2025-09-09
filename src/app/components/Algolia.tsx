"use client";
import React from "react";
import {
  InstantSearch,
  SearchBox,
  Pagination,
  Configure,
} from "react-instantsearch";
import { ALGOLIA_INDEX_NAME, searchClient } from "@/lib/algolia";
import HitGrid from "./HitGrid";

export default function Algolia() {
  return (
    <div className="mx-auto w-500">
      <InstantSearch
        searchClient={searchClient}
        indexName={ALGOLIA_INDEX_NAME}
      >
        <Configure hitsPerPage={3} />
        <SearchBox
          placeholder="Search for coffee shops..."
          classNames={{
            root: "relative mx-auto pl-5 pr-10 w-full",
            input:
              "border border-amber-900 rounded-md py-2 pl-10 w-full mx-auto p-1 mt-2 bg-amber-100/20",
            submit:
              "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none",
          }}
          submitIconComponent={({ classNames }) => (
            <span className={`${classNames.submitIcon} text-amber-900 pl-5 `}>
              🔍
            </span>
          )}
          resetIconComponent={() => null}
        />
        <HitGrid />
        <div className="mt-10 flex justify-center">
          <Pagination
            classNames={{
              root: "flex justify-center mt-1 mb-2",
              list: "flex gap-2",
              item: "px-3 py-1 border border-gray-300 rounded text-sm hover:bg-[#6F4E37]/20 transition",
              selectedItem: "bg-[#6F4E37] text-white font-semibold",
              disabledItem: "opacity-40 cursor-not-allowed",
            }}
          />
        </div>
      </InstantSearch>
    </div>
  );
}
