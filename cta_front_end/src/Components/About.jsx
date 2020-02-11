import React from 'react';

const About = () => {
    return(
        <div>
            <h1> About Binge</h1>
            <p id="aboutBinge">Binge is the perfect Full Stack Web Application for you and your friends to keep track of what shows you're glued into. It was made by Peter Fiorentino during his time at Pursuit. He used Javascript, React, and CSS to make this project. Some of his favorite TV shows are: </p>
            <div id="myFavShows">
                <div className="loveThisShow">
                    <h3>The Leftovers</h3>
                    <img src="https://lh3.googleusercontent.com/proxy/Auc_5rewIKUzgBZJnAlMbioTmwl9p4Gs4papIX-I2eY2aVUah-ziPn_sIjFcTMh56DFBtXoIY5dwjdg69KSVZdPHLgdUXdzC3VKIppOOyA" alt="The Leftovers" />
                </div>
                <div className="loveThisShow">
                    <h3>Bojack Horseman</h3>
                    <img src="https://m.media-amazon.com/images/M/MV5BYWQwMDNkM2MtODU4OS00OTY3LTgwOTItNjE2Yzc0MzRkMDllXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" alt="Bojack Horseman" />
                </div>
                <div className="loveThisShow">
                    <h3>Impractical Jokers</h3>
                    <img src="https://img.reelgood.com/content/show/16ed9acf-36ea-47b7-998d-17c8fb559d47/poster-780.jpg" alt="Impractical Jokers" />
                </div>
                <div className="loveThisShow">
                    <h3>Breaking Bad</h3>
                    <img src="https://images.amcnetworks.com/blogs.amctv.com/wp-content/uploads/2013/12/bb-s1-poster.jpg" alt="Breaking Bad" />
                </div>
            </div>
        </div>
    )
}

export default About;