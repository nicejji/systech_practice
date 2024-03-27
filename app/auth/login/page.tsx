import Link from "next/link";

export default function AuthPage() {
	return (
		<div className="flex flex-col gap-5 justify-center items-center w-full h-full">
			<h1 className="text-2xl font-bold text-blue-500">Вход в аккаунт</h1>
			<form className="flex flex-col gap-3 items-center">
				<input type="email" placeholder="Электронная почта" className="input" />
				<input type="password" placeholder="Пароль" className="input" />
				<button className="btn btn-filled">Войти в аккаунт</button>
				<Link className="text-blue-500 btn" href="/auth/create">
					У меня нет аккаунта
				</Link>
			</form>
		</div>
	);
}