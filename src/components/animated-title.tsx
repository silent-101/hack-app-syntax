type Props = {
	text: string;
	delay?: number;
};

export function AnimatedTitle({ text, delay = 0.3 }: Props) {
	const chars = text
		.split("")
		.map((ch, index) => ({ id: `${index}`, ch, index }));
	return (
		<span className="inline-block">
			{chars.map(({ id, ch, index }) => (
				<span
					key={id}
					className="museum-letter"
					style={{
						animationDelay: `${delay + index * 0.04}s`,
						whiteSpace: "pre",
					}}
				>
					{ch}
				</span>
			))}
		</span>
	);
}
