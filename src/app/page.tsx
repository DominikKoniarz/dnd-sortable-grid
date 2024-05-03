import { nanoid } from "nanoid";
import Wrapper from "./Wrapper";

export default function Home() {
	const initialItems = [
		{ id: nanoid(10) },
		{ id: nanoid(10) },
		{ id: nanoid(10) },
		{ id: nanoid(10) },
		{ id: nanoid(10) },
		{ id: nanoid(10) },
		{ id: nanoid(10) },
		{ id: nanoid(10) },
		{ id: nanoid(10) },
		{ id: nanoid(10) },
		{ id: nanoid(10) },
	];

	return (
		<main className="grid h-full place-items-center">
			<Wrapper initialItems={initialItems} />
		</main>
	);
}
