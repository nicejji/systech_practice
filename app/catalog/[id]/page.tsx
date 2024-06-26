import { extractUser } from "@/app/api/auth";
import prisma from "@/prisma/client";
import { IconBan, IconCalendar, IconCpu, IconDisc } from "@tabler/icons-react";
import Image from "next/image";
import BackButton from "./back-button";
import { formatPrice } from "@/app/utils";
import AddToBasketButton from "@/app/_components/add-to-basket-button";
import PhoneControls from "@/app/_components/phone-controls";

export default async function PhonePage({
	params,
}: { params: { id: string } }) {
	const phone = await prisma.phone.findUnique({
		where: { id: Number(params.id) },
	});
	if (!phone) return <span>Товар не найден</span>;
	const isAdmin = (await extractUser())?.isAdmin === true;
	return (
		<div className="flex flex-col gap-3 p-3 w-full h-full">
			<div className="flex flex-col gap-1">
				<BackButton />
				<span className="text-3xl font-bold">
					{phone.manufacturer} {phone.model}
				</span>
				{isAdmin && <PhoneControls phone={phone} />}
				<span
					className={`${
						phone.available_quantity > 0 ? "text-success" : "text-error"
					}`}
				>
					{phone.available_quantity > 0
						? `В наличии: ${phone.available_quantity}`
						: "Нет в наличии"}
				</span>
			</div>
			<div className="flex flex-col gap-5 w-full md:flex-row">
				<div className="relative h-80 md:h-96 md:aspect-square">
					{phone.imageLink ? (
						<Image
							alt="Phone Photo"
							fill
							sizes="100vw"
							className="object-cover rounded-lg"
							src={phone.imageLink}
						/>
					) : (
						<div className="flex flex-col gap-3 justify-center items-center w-48 md:w-72 aspect-square text-neutral-500">
							<IconBan size={100} />
							<span>Нет изображения</span>
						</div>
					)}
				</div>
				<ul className="flex flex-col gap-3 w-full">
					<span className="font-bold">Описание</span>
					<li className="flex p-3 w-full rounded-lg bg-base-100">
						<span className="break-all">
							{phone.description || "Описание отсутсвует"}
						</span>
					</li>
					<li className="flex gap-1 items-center">
						<IconCalendar size={"30"} />
						<span>
							Год выпуска:
							<span className="font-bold">{phone.releaseYear}</span>
						</span>
					</li>
					<li className="flex gap-1 items-center">
						<IconCpu size={"30"} />
						<span>
							Процессор:
							<span className="font-bold">{phone.cpu || "Неизвестен"}</span>
						</span>
					</li>
					<li className="flex gap-1 items-center">
						<IconDisc size={"30"} />
						<span>
							Оперативная память:
							<span className="font-bold">{phone.ramGB} ГБ</span>
						</span>
					</li>
					<li className="flex gap-3 items-center pb-3">
						<AddToBasketButton phone={phone} />
						<span className="font-bold text-success">
							{formatPrice(phone.priceBYN)} BYN
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
