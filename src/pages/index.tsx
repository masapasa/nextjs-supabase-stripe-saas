import Link from 'next/link'
import { supabase } from "@/utils/supabase";

export type Lesson = {
	id: string;
	created_at: Date;
	title: string;
	description: string;
}

export default function Home({ lessons }: { lessons: Lesson[] }) {

	console.log("USER", supabase.auth.getUser());
	console.log("LESSONS", lessons);

	return (
		<div className="w-full max-w-3xl mx-auto my-16 px-2">
			{lessons.map((lesson: Lesson) => (
				<Link key={lesson.id} href={`/${lesson.id}`} className="p-8 h-40 mb-4 rounded shadow text-xl flex">{lesson.title}</Link>
			))}
		</div>
	);
}

export const getStaticProps = async () => {
	const { data: lessons } = await supabase.from("lesson").select("*");

	return {
		props: {
			lessons,
		},
	};
};