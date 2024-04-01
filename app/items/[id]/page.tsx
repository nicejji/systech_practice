import AddToBasketButton from "@/components/addToBasketButton";
import prisma from "@/prisma/client";
import { IconCalendar, IconCpu, IconDisc } from "@tabler/icons-react";

export default async function PhonePage({
	params,
}: { params: { id: string } }) {
	const phone = await prisma.phone.findUnique({
		where: { id: Number(params.id) },
	});
	if (!phone) return <span>Товар не найден</span>;
	return (
		<div className="flex flex-col p-3 w-full h-full">
			<div className="flex flex-col gap-1">
				<span className="text-3xl font-bold">
					{phone.manufacturer} {phone.model}
				</span>
				<span
					className={`${
						phone.available_quantity > 0 ? "text-green-600" : "text-red-500"
					}`}
				>
					{phone.available_quantity > 0
						? `В наличии: ${phone.available_quantity}`
						: "Нет в наличии"}
				</span>
			</div>
			<div className="flex flex-col gap-5 w-full h-full md:flex-row">
				<img
					className="object-cover h-96 rounded-lg aspect-square"
					src={phone.imageLink}
				/>
				<ul className="flex flex-col gap-3 w-full">
					<li className="flex p-3 w-full bg-gray-100 rounded-lg">
						<span className="break-all">{phone.description}</span>
					</li>
					<li className="flex gap-1 items-center">
						<IconCalendar size={"2rem"} />
						<span>
							Год выпуска:
							<span className="font-bold">{phone.releaseYear}</span>
						</span>
					</li>
					<li className="flex gap-1 items-center">
						<IconCpu size={"2rem"} />
						<span>
							Процессор:
							<span className="font-bold">{phone.cpu}</span>
						</span>
					</li>
					<li className="flex gap-1 items-center">
						<IconDisc size={"2rem"} />
						<span>
							Оперативная память:
							<span className="font-bold">{phone.ramGB} ГБ</span>
						</span>
					</li>
					<li className="flex gap-3 items-center pb-3">
						<AddToBasketButton phone={phone} />
						<span className="font-bold text-green-600">
							{phone.priceBYN / 100} BYN
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
