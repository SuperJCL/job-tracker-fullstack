# Job Application Tracker

A simple web app to track job applications.

## Features

- Add new application
- Delete application
- Filter by status
- Search by company or role
- Dashboard

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS

## Status

Frontend prototype completed. Backend integration (Supabase) coming next.

## CSS 类名规范

使用 BEM 命名约定，为关键元素添加有业务含义的类名，
方便阅读代码和在浏览器 DevTools 中定位元素。
Tailwind 工具类继续负责样式。

- 单词之间使用 `-`：`application-form`
- 组件内部元素使用 `__`：`application-form__input`
- 状态或变体使用 `--`：`application-form__input--error`
- 不使用单个 `_` 分隔单词
- 类名统一使用小写英文

示例：

    className="application-form mb-6 rounded-lg border p-4"
    className="application-form__input border px-3 py-2"

状态类仅在对应状态生效时添加。
内部元素按职责命名，无需把每一层 DOM 嵌套都写进类名。

## Versioning

本项目采用 MAJOR.MINOR.PATCH 格式：

- MAJOR（主版本号）：不兼容的接口变更。
- MINOR（次版本号）：向后兼容的新增功能。
- PATCH（修订号）：向后兼容的错误修复。
- 0.x.x：初期开发阶段，接口尚未稳定。

版本更新约定：

- 完成单项任务时，提交 Git 并更新任务状态，不自动修改版本。
- 完成一个阶段并准备发布时，统一更新版本。
- S1 验收通过并发布前端演示版时，计划更新为 0.2.0。
