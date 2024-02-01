"use strict";

const searchBtn = document.querySelector('.srch')
let userImg = document.querySelector('#userImage')

searchBtn.addEventListener('click', async function () {
    const errmsg = document.querySelector('.message');
    const userId = document.querySelector('#userloginId').value
    if (userId === '') {
        errmsg.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>  `
        errmsg.innerHTML += `Please enter a valid GitHub username`
    } else {
        errmsg.innerHTML = ''
        const mainContainer = document.querySelector('.main-container')
        mainContainer.style.visibility = 'visible'
        try {
            await fetchData(userId);
        } catch (error) {
            errorMessage()
        }
    }
});

async function fetchData(userId) {
    try {
        const response = await fetch(`https://api.github.com/users/${userId}`)
        const data = await response.json()
        userShowData(data)
    } catch (error) {
        errorMessage()
    }
}

function userShowData(data) {
    const userImg = document.querySelector('#userImage')
    userImg.src = data.avatar_url
    const userName = document.querySelector('.userName')
    userName.innerHTML = data.name ? data.name : 'Not Available'
    const userBio = document.querySelector('.userBio')
    userBio.innerHTML = data.bio ? data.bio : 'Not Available'
    const repo = document.querySelector('.userRepos')
    repo.innerHTML = data.public_repos ? data.public_repos : '0'
    const followers = document.querySelector('.userFollower')
    followers.innerHTML = data.followers ? data.followers : '0'
    const following = document.querySelector('.userFollowing')
    following.innerHTML = data.following ? data.following : '0'
    const location = document.querySelector('#userLocation')
    location.innerHTML = `<i class="fa-solid fa-location-dot"></i>`
    location.innerHTML += data.location ? data.location : 'Not Available'
    const userCompany = document.querySelector('#userCompany')
    userCompany.innerHTML = `<i class="fa-solid fa-building"></i>`
    userCompany.innerHTML += data.company ? data.company : 'Not Available'
    const userTwitter = document.querySelector('#xTwitter')
    userTwitter.innerHTML = `<i class="fa-brands fa-twitter"></i>`
    userTwitter.innerHTML += data.twitter_username ? `<a href="https://twitter.com/${data.twitter_username}" target="_blank">${data.twitter_username}</a>` : 'Not Available'
    const userWebsite = document.querySelector('#userBlog')
    userWebsite.innerHTML = `<i class="fa-solid fa-link"></i>`
    userWebsite.innerHTML += data.blog ? `<a href="${data.blog}" target="_blank">${data.blog}</a>` : 'Not Available'
}

function errorMessage() {
    const errmsg = document.querySelector('.message');
    const mainContainer = document.querySelector('.main-container')
    mainContainer.style.visibility = 'hidden'
    errmsg.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>  `
    errmsg.innerHTML += `User not found`

}
