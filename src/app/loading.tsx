import React from 'react';

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-6 w-48 rounded bg-slate-800/60 mb-6" />

      {/* Main Header Skeleton */}
      <div className="h-10 w-96 rounded bg-slate-800/80 mb-3" />
      <div className="h-4 w-full max-w-xl rounded bg-slate-800/40 mb-10" />

      {/* Main Two-Column Generator Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="h-5 w-32 rounded bg-slate-800" />
          <div className="h-10 w-full rounded bg-slate-800/40" />
          <div className="h-10 w-full rounded bg-slate-800/40" />
          <div className="h-10 w-full rounded bg-slate-800/40" />
        </div>
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="h-64 w-full rounded-lg bg-slate-800/50" />
        </div>
      </div>
    </div>
  );
}
