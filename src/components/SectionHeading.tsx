export default function SectionHeading({
	title,
	description,
}: {
	title: string;
	description?: string;
}) {
	return (
		<div className="w-full flex items-center justify-center text-center flex-col gap-3 ">
			<h2 className="text-primaryDark font-semibold text-2xl md:text-3xl mb-2">{title}</h2>

			{description && (
				<p className="w-[80%]  md:w-[50%] text-base text-[#404C67] text-center">
					{description}
				</p>
			)}
		</div>
	);
}
