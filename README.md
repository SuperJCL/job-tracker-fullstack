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
