---
title: TypeScript 类型体操：实用技巧与常见陷阱
description: 告别 any，掌握 TypeScript 的高级类型技巧——联合类型、泛型约束和工具类型的实战用法。
date: '2026-01-25'
sidebar: false
prev:
  text: 'React Server Components 实践笔记'
  link: /posts/react-server-components
next:
  text: 'Next.js API 路由实战：RESTful 设计'
  link: /posts/nextjs-api-routes
---

# TypeScript 类型体操：实用技巧与常见陷阱

## 为什么写这篇？

我见过太多项目里的 `any` 泛滥，也自己踩过不少类型相关的坑。这篇文章记录了一些我觉得最实用的 TypeScript 技巧，都是实际项目中反复验证过的。

## 1. Discriminated Union（可辨识联合）

这是我最常用的模式之一，用来替代大量的 if-else：

```ts
type Result<T> = { kind: 'success'; data: T } | { kind: 'error'; message: string };

function handleResult(result: Result<string>) {
  switch (result.kind) {
    case 'success': return result.data; // ✅ TS 自动收窄类型
    case 'error': throw new Error(result.message);
  }
}
```

**应用场景：** API 响应、命令模式（CRUD）、事件处理。

## 2. `satisfies` — 比 `as` 更安全的断言

```ts
const config = {
  dark: '#1a1a2e',
  light: '#f5f5ff',
} satisfies Record<string, string>;
// ✅ TS 知道 config.dark 是 string，而不是 any
```

不要滥用 `as Type`，它在编译期就消失了——写错了也不会报错。而 `satisfies` 会在类型不匹配时给你警告。

## 3. 泛型约束：别只写 `<T>`

```ts
// ❌ 太宽泛
function first<T>(arr: T[]): T { return arr[0]; }

// ✅ 有边界
function first<T extends Array<any>>(arr: T): T[number] { return arr[0]; }
```

泛型约束不是可选的——它决定了你能在函数内部安全地调用什么方法。

## 4. `Partial`、`Omit`、`Pick` — 工具类型三件套

做 API 开发时特别好用：

```ts
type User = { id: number; name: string; email: string };

// 更新用户只需要部分字段
type UpdateUser = Partial<Pick<User, 'name' | 'email'>>;
```

## 5. `Record<K, V>` — 别再用 `{ [key: string]: T }` 了

```ts
type TagsByCategory = Record<string, Tag[]>; // ✅ 简洁且类型安全
// vs
const tags1: { [key: string]: Tag[] } = {};   // ⚠️ 索引签名写法，不够表达力
```

## 6. `Extract` — 从联合类型中提取指定成员

```ts
type Event = 'click' | 'keydown' | 'wheel';
type MouseEvent = Extract<Event, 'click' | 'wheel'>; // "click" | "wheel"
```

这在条件渲染和事件处理中非常实用。

## 常见陷阱

1. **不要滥用 `any`** — 用 `unknown` 代替，需要时再做类型守卫
2. **`as const` 很重要** — 写字符串字面量时用 `as const` 才能拿到精确的联合类型
3. **泛型不等于万能** — 如果类型推导已经够用，就别强行加泛型

## 小结

TypeScript 的类型系统是个宝库，但也要克制——不是为了炫技而写复杂的类型。真正好的类型设计是：**既安全又简洁**。
