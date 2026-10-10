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
import Modal from "@/components/Modal/Modal";

import "./applications.scss";

export default function ApplicationsPage() {
  const [applications, setApplications] =
    useState<Application[]>(mockApplications); //初始化申请列表，使用mock数据

  const [filter, setFilter] = useState<ApplicationStatusFilter>("All"); //仅允许传7种类型
  const [search, setSearch] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  /**
   * 添加新的申请
   * @returns
   */
  const addApplication = (input: CreateApplicationInput) => {
    const newApplication: Application = {
      ...input,
      id: crypto.randomUUID(),
    };

    setApplications((prev) => [...prev, newApplication]);
    setIsAddDialogOpen(false);
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
    <main className="application-page">
      <header className="application-page__header">
        <div>
          <h1 className="application-page__title">Applications</h1>
          <p className="application-page__description">
            Your next opportunity starts here.
          </p>
        </div>

        <Modal
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          title="Add application"
          description="Enter the company, role, and current application status."
          trigger={
            <button type="button" className="application-page__add-button">
              + Add application
            </button>
          }
        >
          <ApplicationForm onAdd={addApplication} />
        </Modal>
      </header>

      <section
        className="application-page__stats"
        aria-label="Application statistics"
      >
        <StatBoard label="Total" value={applications.length} />
        <StatBoard
          label="Wishlist"
          value={applications.filter((app) => app.status === "Wishlist").length}
        />
        <StatBoard
          label="Applied"
          value={applications.filter((app) => app.status === "Applied").length}
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
          value={applications.filter((app) => app.status === "Offer").length}
        />
        <StatBoard
          label="Rejected"
          value={applications.filter((app) => app.status === "Rejected").length}
        />
        <StatBoard
          label="Unknown"
          value={applications.filter((app) => app.status === "Unknown").length}
        />
      </section>

      <section
        className="application-page__content"
        aria-label="Application list"
      >
        <div className="application-page__toolbar">
          <input
            type="search"
            aria-label="Search applications by company or role"
            placeholder="Search by company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="application-page__search"
          />

          <FilterBar filter={filter} onChange={setFilter} />
        </div>

        <p className="application-page__results" aria-live="polite">
          {filteredApplications.length} of {applications.length} applications
        </p>

        <div className="application-page__list">
          {filteredApplications.length === 0 ? (
            <div className="application-page__empty">
              <h2 className="application-page__empty-title">
                No applications found
              </h2>
              <p className="application-page__empty-description">
                {applications.length === 0
                  ? "Click Add application to get started."
                  : "Try changing your search keyword or status filter."}
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
