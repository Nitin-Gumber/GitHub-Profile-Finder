"use strict";
    const userLoginId = document.querySelector("#userloginId");
    const searchBtn = document.querySelector(".srch");
    const userImage = document.querySelector("#userImage");
    const userName = document.querySelector(".userName");
    const userBio = document.querySelector(".userBio");
    const userRepos = document.querySelector(".userRepos");
    const userFollowers = document.querySelector(".userFollower");
    const userFollowings = document.querySelector(".userFollowing");
    const userLocation = document.querySelector("#userLocation");
    const userCompany = document.querySelector("#userCompany");
    const userxTwitter = document.querySelector("#xTwitter");
    const userBlog = document.querySelector("#userBlog");

    searchBtn.addEventListener('click', function () {
      const xhr = new XMLHttpRequest();
      const reqUrl = `https://api.github.com/users/${userLoginId.value}`;
      xhr.open("GET", reqUrl, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const userData = JSON.parse(xhr.responseText);
          userImage.src = userData.avatar_url;
          userName.textContent = userData.name;
          userBio.textContent = userData.bio ? userData.bio : "Not Available";
          userRepos.textContent = userData.public_repos;
          userFollowers.textContent = userData.followers;
          userFollowings.textContent = userData.following;
          userLocation.innerHTML = `<i class="fa-solid fa-location-dot">`;
          userLocation.innerHTML += userData.location
            ? userData.location
            : "Not Available";
          console.log(userData.location);
          userCompany.innerHTML = `<i class="fa-solid fa-building-user"></i>`;
          userCompany.innerHTML += userData.company
            ? userData.company
            : "Not Available";
          userxTwitter.innerHTML = `<i class="fa-brands fa-x-twitter"></i>`;
          userxTwitter.innerHTML += userData.twitter_username
            ? userData.twitter_username
            : "Not Available";
          userBlog.innerHTML = `<i class="fa-solid fa-link"></i>`;
          userBlog.innerHTML += userData.blog ? userData.blog : "Not Available";
        }

        // When User is Not Found
        if (xhr.readyState === 4 && xhr.status === 404) {
          userName.textContent = "User Not Found";
          userRepos.textContent = "No";
          userFollowers.textContent = "No";
          userFollowings.textContent = "No";
          userLocation.innerHTML = `<i class="fa-solid fa-location-dot">`;
          userLocation.innerHTML += "Not Found";
          userCompany.innerHTML = `<i class="fa-solid fa-building-user"></i>`;
          userCompany.innerHTML += "Not Found";
          userxTwitter.innerHTML = `<i class="fa-brands fa-x-twitter"></i>`;
          userxTwitter.innerHTML += "Not Found";
          userBlog.innerHTML = `<i class="fa-solid fa-link"></i>`;
          userBlog.innerHTML += "Not Found";
        }
      };
      xhr.send();
    });