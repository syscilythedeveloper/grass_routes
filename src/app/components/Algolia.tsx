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
    <>
      <InstantSearch
        searchClient={searchClient}
        indexName={ALGOLIA_INDEX_NAME}
      >
        <Configure hitsPerPage={6} />
        <SearchBox
          placeholder="Search for coffee shops..."
          classNames={{
            root: "relative mx-2 pl-5 pr-5 w-full",
            input:
              "border border-gray-300 rounded-full py-2 pl-10 w-full mb-2 mt-2",
            submit:
              "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none",
          }}
          submitIconComponent={({ classNames }) => (
            <span className={`${classNames.submitIcon} text-gray-500 pl-5 `}>
              🔍
            </span>
          )}
          resetIconComponent={() => null}
        />
        <HitGrid />
        <div className="mt-10 flex justify-center">
          <Pagination
            classNames={{
              root: "flex justify-center mt-2 mb-2",
              list: "flex gap-2",
              item: "px-3 py-1 border border-gray-300 rounded text-sm hover:bg-green-100 transition",
              selectedItem: "bg-green-600 text-white font-semibold",
              disabledItem: "opacity-40 cursor-not-allowed",
            }}
          />
        </div>
      </InstantSearch>
    </>
  );
}
