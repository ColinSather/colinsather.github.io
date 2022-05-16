const handleClick = (e) => {
    console.log("dis boi just clicked, woah")
}

function Landing() {
    return (
        <div id="hero-area" className="hero-area-bg">
            <div className="center-panel">
                <div className="head-desc container">
                    <h1>Welcome to Colin's Website</h1>
                    <p>
                        This website acts as a central location for all my public notes on various technologies.
                    </p>
                    <a onClick={handleClick} className="btn btn-common btn-lg" id="view-topics">View Article Topics</a>
                </div>
            </div>
        </div>
    )
}

export default Landing