import { InfoBlock } from "@/shared/components/shared/info-block";

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center mt-40">
            <InfoBlock
                title="Нет доступа"
                text="Только авторизованные пользователи могут просматривать эту страницу"
            />
        </div>
    );
}