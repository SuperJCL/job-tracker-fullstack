"use client"; //需要子在浏览器里处理交互

import { useState } from "react";
import ApplicationCard from "@/components/ApplicationCard";
import type {
  Application,
  CreateApplicationInput,
  ApplicationStatusFilter,
} from "@/types/application";
import FilterBar from "@/components/FilterBar";
import StatBoard from "@/components/StatBoard";
import ApplicationForm from "@/components/ApplicationForm";
import { mockApplications } from "@/mock/applicationsMock";

export default function ApplicationsPage() {
  const [applications, setApplications] =
    useState<Application[]>(mockApplications); //初始化申请列表，使用mock数据

  const [filter, setFilter] = useState<ApplicationStatusFilter>("All"); //仅允许传7种类型
  const [search, setSearch] = useState("");

  /**
   * 添加新的申请
   * @returns
   */
  const addApplication = (input: CreateApplicationInput) => {
    const newApplication: Application = {
      ...input,
      id: crypto.randomUUID(), //生成唯一id
    };

    setApplications((prev) => [...prev, newApplication]);
  };

  /**
   * 删除指定id的申请
   * @param id 记录的id
   */
  const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  /**
   * 根据filter和search条件过滤申请列表
   * @returns 过滤后的申请列表
   */
  const filteredApplications = applications
    .filter((app) => {
      //第一层条件过滤-filter
      if (filter === "All") {
        return true;
      }
      return app.status === filter;
    })
    .filter((app) => {
      //第二层条件过滤-search
      const keyword = search.toLowerCase();
      return (
        app.company.toLowerCase().includes(keyword) ||
        app.role.toLowerCase().includes(keyword)
      );
    });

  return (
    <main className="application p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Job Application Tracker</h1>
        <p className="mt-2 text-gray-500">
          Track your internship and job applications in one place.
        </p>
      </header>
      <input
        type="text"
        placeholder="Search by company or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded border p-2"
      />

      <section className="mb-8">
        <ApplicationForm onAdd={addApplication} />
      </section>

      <section>
        <div className="mb-4 space-y-3">
          <FilterBar filter={filter} onChange={setFilter} />

          <input
            type="text"
            placeholder="Search by company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded border p-2"
          />
          <div className="mb-6 flex gap-4">
            <StatBoard label="Total" value={applications.length} />

            <StatBoard
              label="Applied"
              value={
                applications.filter((app) => app.status === "Applied").length
              }
            />
            <StatBoard
              label="Wishlist"
              value={
                applications.filter((app) => app.status === "Wishlist").length
              }
            />
            <StatBoard
              label="OA"
              value={applications.filter((app) => app.status === "OA").length}
            />
            <StatBoard
              label="Interview"
              value={
                applications.filter((app) => app.status === "Interview").length
              }
            />
            <StatBoard
              label="Offer"
              value={
                applications.filter((app) => app.status === "Offer").length
              }
            />
            <StatBoard
              label="Rejected"
              value={
                applications.filter((app) => app.status === "Rejected").length
              }
            />
          </div>
        </div>

        {/* 显示申请列表 */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h2 className="text-lg font-semibold">No applications found</h2>
              <p className="mt-2 text-sm text-gray-500">
                Try changing your search keyword or status filter.
              </p>
            </div>
          ) : (
            filteredApplications.map((app) => (
              <ApplicationCard
                key={app.id}
                app={app}
                onDelete={deleteApplication}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
