
"use client";   //需要子在浏览器里处理交互

import { useState } from "react";
import ApplicationCard from "@/components/ApplicationCard";
import type { Application } from "@/types/application";
import FilterBar from "@/components/FilterBar";

export default function ApplicationsPage() {
	const [applications, setApplications] = useState<Application[]>([
		{
			id: "1",
			company: "Amazon",
			role: "Frontend Intern",
			status: "Applied",
		},
		{
			id: "2",
			company: "Microsoft",
			role: "SWE Intern",
			status: "Wishlist",
		},
		{
			id: "3",
			company: "Google",
			role: "Backend Intern",
			status: "Interview",
		}
	]);
	const [company, setCompany] = useState("");
	const [role, setRole] = useState("");				//申请工作类别
	const [state, setState] = useState("Unknown");	//申请状态，默认为Unknown
	const [filter, setFilter] = useState("All");		//过滤条件，默认为All
	const [search, setSearch] = useState("");

	/**
	 * 添加新的申请
	 * @returns 
	 */
	const handleAddApplication = () => {
		if (!company.trim() || !role.trim()) {  //去掉字符串前后空格，如果公司或职位为空，则不添加
			return;
		}

		const newApplication: Application = {
			id: Date.now().toString(),
			company,
			role,
			status: state,
		};

		setApplications([...applications, newApplication]);
		setCompany("");
		setRole("");
	};

	/**
	 * 删除指定id的申请
	 * @param id 记录的id
	 */
	const handleDeleteApplication = (id: string) => {
		setApplications(applications.filter((app) => app.id !== id)); //删除指定id的申请
	}

	const filteredApplications =
		filter === "All"
			? applications
			: applications.filter((app) =>{//第一层条件过滤-filter
				if (filter==='All') {
					return true;
				};
				return app.status === filter;
			}).filter((app) =>{//第二层条件过滤-search
				if (filter==='All') return true;
				const keyword = search.toLowerCase();
				return (app.company.toLowerCase().includes(keyword) ||
				app.role.toLowerCase().includes(keyword))
			});

	return (
		<main className="p-8">
			<h1 className="mb-6 text-2xl font-bold">Applications</h1>
			<input
				type="text"
				placeholder="Search by company or role..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="mb-4 w-full rounded border p-2"
			/>

			<div className="mb-6 space-y-3 rounded-lg border p-4">
				<input
					type="text"
					placeholder="Company"
					value={company}
					onChange={(e) => setCompany(e.target.value)}
					className="w-full rounded border p-2"
				/>

				<input
					type="text"
					placeholder="Role"
					value={role}
					onChange={(e) => setRole(e.target.value)}
					className="w-full rounded border p-2"
				/>

				<select
					value={state}
					onChange={(e) => setState(e.target.value)}>
					<option value="Unknown">Unknown</option>
					<option value="Applied">Applied</option>
					<option value="Wishlist">Wishlist</option>
					<option value="OA">OA</option>
					<option value="Interview">Interview</option>
					<option value="Offer">Offer</option>
					<option value="Rejected">Rejected</option>
				</select>

				<button
					onClick={handleAddApplication}
					className="rounded bg-black px-4 py-2 text-white"
				>
					Add Application
				</button>
			</div>

			{/** FilterBar **/}
			<FilterBar filter={filter} onChange={setFilter} />

			{/* 显示申请列表 */}
			<div className="space-y-4">
				{filteredApplications.map((app) => (
					<ApplicationCard
						key={app.id}
						app={app}
						onDelete={handleDeleteApplication}
					/>
				))}
			</div>
		</main>
	);
}