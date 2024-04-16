import { extractUser } from "@/app/api/auth";
import OrdersList from "./orders-list";
import ProfileInfo from "./profile-info";

export default async function ProfileInfoPage() {
	const user = await extractUser();

	return (
		<div className="flex flex-col gap-5 w-full h-full">
			<ProfileInfo user={user} />
			<OrdersList />
		</div>
	);
}