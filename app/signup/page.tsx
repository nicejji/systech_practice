import SignupForm from "./signup-form";

export default function AuthPage() {
	return (
		<div className="flex flex-col gap-5 justify-center items-center w-full h-full">
			<h1 className="text-2xl font-bold text-primary">Создать аккаунт</h1>
			<SignupForm />
		</div>
	);
}
