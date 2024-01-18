interface StyledBackgroundProps {
	children: React.ReactNode;
}

function StyledBackground(props: StyledBackgroundProps) {
	const bodyStyle = {
		margin: 0,
		border: 0,
		padding: 0,
		background: "linear-gradient(180deg, #2A2B81 0%, #080614 100%)",
    minHeight: "100vh", // Ensures the gradient covers the entire viewport height
    width: "100%", // Gradient covers viewport when using sidebar layout
	};

	return <div style={bodyStyle}>{props.children}</div>;
}

export default StyledBackground;

