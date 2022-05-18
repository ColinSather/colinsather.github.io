const handleClick = (e) => {
    console.log("dis boi just clicked, woah")
    var modal = document.getElementById("myModal")
    var btn = document.getElementById("myBtn")
    var span = document.getElementsByClassName("close")[0]
    
    if (modal.style.display !== "block")
        modal.style.display = "block"
        
    // When the user clicks the button, open the modal
    /* 
    btn.onclick = function() {
      modal.style.display = "block"
    }
  
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none"
    }
  
    // close window on click outside of modal
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none"
      }
    }
    */
}

function Landing() {
    return (
        <div id="services" className="container">
            <div className="row mt-4">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Colin&apos;s Website</h1>
                </div>
            </div>
            <div className="row vertical-center about-spacing">
                <div className="col-md-8">
                    <h4>Description &amp; Such</h4>
                    <div className="u-line"></div>
                    <p className="serve-desc">
                        <strong className="somespc">
                        The main purpose of this website is to showcase the projects I'm working on. 
                        These pages are mostly for my own reference.
                        </strong>
                    </p>
                    <p className="somespc">
                        A little about myself. I am a full time software engineer and I enjoy working on additional projects in my free time.
                        Additionally I like movies, music, and doing things that regular people do.
                    </p>
                </div>
                <div className="col-md-4 text-center">
                    <h4>Featured</h4>
                    <div className="table dev-color">
                        <i className="fa fa-tag"></i>
                        <br />
                        <a className="btn btn-common" onClick={handleClick}>Article Tags</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing