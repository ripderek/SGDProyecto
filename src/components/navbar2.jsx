import React from "react";

export default function Navbar2() {
  return (
    <div>
      <header class="header d-flex flex-row">
        <div class="header_content d-flex flex-row align-items-center">
          <nav class="main_nav_container">
            <div class="main_nav">
              <ul class="main_nav_list">
                <li class="main_nav_item">
                  <a href="#">home</a>
                </li>
                <li class="main_nav_item">
                  <a href="#">about us</a>
                </li>
                <li class="main_nav_item">
                  <a href="courses.html">courses</a>
                </li>
                <li class="main_nav_item">
                  <a href="elements.html">elements</a>
                </li>
                <li class="main_nav_item">
                  <a href="news.html">news</a>
                </li>
                <li class="main_nav_item">
                  <a href="contact.html">contact</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div class="hamburger_container">
          <i class="fas fa-bars trans_200"></i>
        </div>
      </header>
    </div>
  );
}
