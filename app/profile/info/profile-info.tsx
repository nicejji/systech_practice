"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function ProfileInfo({ user }: { user: User }) {
	const router = useRouter();

	const logout = async () => {
		await fetch("/api/users/logout");
		router.replace("/");
		router.refresh();
	};
	return (
		<div className="flex flex-col gap-5 w-full">
			<div className="flex flex-col gap-3 justify-between p-3 rounded-lg md:flex-row md:items-center bg-base-100">
				<div className="flex flex-col gap-3">
					<span className="text-2xl font-bold">{user.email}</span>
					<div className="badge badge-neutral badge-lg">
						Аккаунт создан: {user?.created.toISOString().split("T")[0]}
					</div>
				</div>
				<button onClick={logout} className="btn btn-error w-fit">
					Выйти из аккаунта
				</button>
			</div>
		</div>
	);
}
