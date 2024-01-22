interface StyledBackgroundProps {
	children: React.ReactNode;
}

function StyledBackground(props: StyledBackgroundProps) {
	/*  
    padding: 0,          p-0
	  border: 0,           border-0
	  margin: 0,           m-0
	  width: "100%",       w-full
      ^ Gradient covers viewport when using sidebar layout
	  minHeight: "100vh",  min-h-screen
      ^ Ensures the gradient covers the entire viewport height
    background: "linear-gradient(180deg, #2A2B81 0%, #080614 100%)",
      ^ Replaced with custom tailwindcss utility class: bg-gradient-custom
	*/
	return <div className="w-full min-h-screen p-0 m-0 border-0 bg-gradient-custom">{props.children}</div>;
}

export default StyledBackground;
