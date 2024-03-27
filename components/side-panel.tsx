"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IconX } from "@tabler/icons-react";

type Props = {
	children: React.ReactNode;
	trigger: React.ReactNode;
	open?: boolean;
};
export default function SidePanel({ children, trigger }: Props) {
	const [isMounted, setIsMounted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!isOpen) return;
			if (ref.current && !ref.current?.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [isOpen]);
	return (
		<>
			<button onClick={() => setIsOpen(true)}>{trigger}</button>
			{isMounted
				? createPortal(
						<div
							ref={ref}
							style={{ transform: `translateX(${isOpen ? "0%" : "100%"})` }}
							className="flex absolute top-0 right-0 flex-col p-2 h-full bg-white shadow-2xl transition-all shadow-black/20"
						>
							<div className="flex justify-end w-full">
								<button
									onClick={() => setIsOpen(false)}
									className="btn btn-filled"
								>
									<IconX />
								</button>
							</div>
							{children}
						</div>,
						document.body,
					)
				: null}
		</>
	);
}