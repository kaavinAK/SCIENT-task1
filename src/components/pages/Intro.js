import React from 'react';
import '../../cssstyles/introform.css'
function Intro() {
  return <>
  <div id="nav-container">
			<div id="nav-overlay"></div>
			<nav id="nav-fullscreen">
						<ul>
									<li><a href="#">Home</a></li>
									<li><a href="#">Blog</a></li>
									<li><a href="#">About</a></li>
									<li><a href="#">Contact</a></li>
						</ul>
			</nav>

			<a id="nav-toggle">
						<span></span>
						<span></span>
						<span></span>
			</a>
</div>
  </>;
}

export default Intro;
