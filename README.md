<p align="center">
  <img src="./public/Logo.png" alt="Store Logo" height="80" style="vertical-align: middle; margin-right: 10px;" />
  <span style="font-size:2.5rem; font-weight:700; vertical-align: middle;">
    RESTINBASE
  </span>
</p>

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="NextJS" height="40" hspace="5"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" height="40" hspace="5"/>
  <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.96ee6a5a.svg" alt="TailwindCSS" height="40" hspace="5"/>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTFP5nxXehZrk7fB5W_TaQ2TilhZdzNH8rSw&s" alt="Shadcn" height="40" hspace="5"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" alt="Prisma" height="40" hspace="5"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" height="40" hspace="5"/>
  <img src="https://avatars.githubusercontent.com/u/67470890?s=200&v=4" alt="NextAuth" height="40" hspace="5"/>
  <img src="https://react-hook-form.com/images/logo/react-hook-form-logo-only.png" alt="React Hook Form" height="40" hspace="5"/>
  <img src="https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg" alt="Zustand" height="40" hspace="5"/>
  <img src="https://lucide.dev/logo.light.svg" alt="docker" height="40" hspace="5"/>
  <img src="https://logo-teka.com/wp-content/uploads/2025/07/yookassa-sign-logo.svg" alt="Yookassa" height="40" hspace="5"/>
  <img src="https://i.imgur.com/YjQUSOk.png" alt="Docker" height="40" hspace="5"/>
</p>

# Description

Современный интернет-магазин по продаже одежды, реализованный с использованием высокоуровневого фреймворка фулстэк разработки [NextJS](https://nextjs.org/), а также новейших UI-технологий — [TailwindCSS](https://tailwindcss.com/) и [Shadcn UI](https://ui.shadcn.com/) для адаптивного, стильного интерфейса и быстрой разработки.

Данный проект является учебным и не используется в коммерческих целях! Его целью было научиться создавать полноценные фулстэк-пайплайны с использованием всех современных инструментов разработки.

# Technologies

В данном проекте использовались следующие инструменты разработки:

- **[NextJS](https://nextjs.org/)** — высокоуровневый фреймворк для фулстэк-разработки на базе React.
- **[TypeScript](https://www.typescriptlang.org/)** — статическая типизация для JavaScript-кода.
- **[TailwindCSS](https://tailwindcss.com/)** — CSS-фреймворк для стилизации компонентов.
- **[Shadcn UI](https://ui.shadcn.com/)** — набор готовых и компонентов для React, основанный на TailwindCSS.
- **[Prisma](https://www.prisma.io/)** — ORM для работы с базой данных.
- **[PostgreSQL](https://www.postgresql.org/)** — Сервер базы данных.
- **[NextAuth](https://next-auth.js.org/)** — библиотека для аутефикации и авторизации для [NextJS](https://nextjs.org/) .
- **[React Hook Form](https://react-hook-form.com/)** — производительный инструмент для управления формами, интегрированный с React, поддерживающий валидацию и работу с данными.
- **[Zod](https://zod.dev/)** — библиотека для декларативной валидации данных.
- **[Zustand](https://zustand-demo.pmnd.rs/)** — библиотека для масштабируемого управления состоянием приложения в React.
- **[react-use](https://github.com/streamich/react-use)** — коллекция полезных React-хуков для типовых задач.
- **[nextjs-toploader](https://www.npmjs.com/package/nextjs-toploader)** — визуальный эффект загрузки для React.
- **[react-hot-toast](https://react-hot-toast.com/)** — библиотека для отображения toast-уведомлений.
- **[react-insta-stories](https://www.npmjs.com/package/react-insta-stories)** — компонент для отображения историй.
- **[lucide-react](https://lucide.dev/)** — библиотека с готовый SVG-иконки.
- **[Resend](https://resend.com/)** — сервис для работы с email-рассылками, интегрированный для отправки писем пользователям.
- **[Docker](https://www.docker.com/)** — платформа контейнеризации, позволяющая запускать проект в стандартизированной среде и легко деплоить на серверы.
- **[YooKassa](https://yookassa.ru/)** — сервис для приема онлайн-платежей.

# Hierarchy

```
RestInBaseShop/
├── @types/                 # кастомная типизация           
├── app/                    # общая маршрутизация
│   ├── (checkout)/         # маршруты страницы оформления заказа
│   ├── (root)/             # маршруты основной страницы
│   └── api/                # серверная часть      
├── prisma/                 # схема БД и сид        
├── public/                 # статические ресурсы    
├── shared/                 # все основные модули
│   ├── components/         # переиспользуемые компоненты интерфейсы 
│   │   ├── shared/         # кастомные компоненты интерфейсы
|   │   └── ui/             # компоненты из shadcn
│   ├── constants/          # настройки конфигов
│   ├── hooks/              # переиспользуемые хуки
│   ├── lib/                # основная логика в общем виде
│   ├── services/           # API 
│   └── store/              # хранилища глобальных состояний 

```

# Quick Start

1. **Клонируй репозиторий:**
    ```bash
    git clone https://github.com/Pautovv/RestInBaseShop.git 

    cd RestInBaseShop
    ```
2. **Билдим и подниаем контейнер:**
    ```bash
    docker compose up -d --build
    ```
3. **Генерируем и заполняем базу данных:**
    ```bash
    docker exec -it rib_next /bin/sh
    npx prisma generate
    npx prisma db push
    npx prisma db seed
    ```

# License

Проект распространяется под лицензией MIT.
