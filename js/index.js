// DOM CONTENT LOADED

window.addEventListener('DOMContentLoaded', () => {
    submitEvent()
    searchToggleFunction()
    }
)





// USER SEARCH FUNCTION

function submitEvent() {
    document.getElementById('github-form').addEventListener('submit', (event) => {
        if (keywordState === 'Search by username') {
            searchAction(event)
        } else if (keywordState === 'Search by repository') {
            repoSearchAction(event)
        }
    })
}

function searchAction(event) {
    event.preventDefault()
    document.getElementById('user-list').innerHTML = ''
    document.getElementById('repos-list').innerHTML = ''
    fetch(`https://api.github.com/search/users?q=${event.target.search.value}`, {
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(function(data) {
        data.items.forEach(function(childItem) {
            let userElement = document.createElement('li')
            let userName = document.createElement('h2')
            userName.innerText = childItem.login
            userElement.appendChild(userName)
            let userImage = document.createElement('img')
            userImage.src = childItem.avatar_url
            userElement.appendChild(userImage)
            let userUrl = document.createElement('a')
            userUrl.href = `${childItem.html_url}`
            userUrl.innerText = 'User\'s Profile'
            userElement.appendChild(userUrl)
            userElement.addEventListener('click', () => {
                fetchRepoAction(userName.innerText)
            })
            document.getElementById('user-list').appendChild(userElement)
        })
    })
    document.getElementById('github-form').reset()
}





// USER-REPO SEARCH FUNCTION

function fetchRepoAction(userName) {
    document.getElementById('user-list').innerHTML = ''
    document.getElementById('repos-list').innerHTML = ''
    fetch(`https://api.github.com/users/${userName}/repos`, {
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(function(data) {
        data.forEach(function(repoItem) {
            let repoElement = document.createElement('li')
            let repoName = document.createElement('h2')
            repoName.innerText = repoItem.name
            repoElement.appendChild(repoName)
            let repoLink = document.createElement('a')
            repoLink.href = repoItem.html_url
            repoLink.innerText = 'Link to repository.'
            repoElement.appendChild(repoLink)
            document.getElementById('repos-list').appendChild(repoElement)
        })
    })
}





// SEARCH TOGGLE FUNCTION

let keywordState = 'Search by username'

function searchToggleFunction() {
    const searchToggleBtn = document.createElement('button')
    searchToggleBtn.innerText = keywordState
    searchToggleBtn.addEventListener('click', (event) => {
        searchToggleEvent(event)
    })
    document.getElementById('github-form').after(searchToggleBtn)
}

function searchToggleEvent(event) {
    if (keywordState === 'Search by username') {
        keywordState = 'Search by repository'
        event.target.innerText = keywordState
    } else if (keywordState === 'Search by repository') {
        keywordState = 'Search by username'
        event.target.innerText = keywordState
    }
}





// REPO SEARCH FUNCTION

function repoSearchAction(event) {
    event.preventDefault()
    document.getElementById('user-list').innerHTML = ''
    document.getElementById('repos-list').innerHTML = ''
    fetch(`https://api.github.com/search/repositories?q=${event.target.search.value}`, {
        header: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(function(data) {
        data.items.forEach(function(repoSearchItem) {
            let repoSearchElement = document.createElement('li')
            let repoSearchName = document.createElement('h2')
            repoSearchName.innerText = repoSearchItem.full_name
            repoSearchElement.append(repoSearchName)
            let repoSearchLink = document.createElement('a')
            repoSearchLink.href = repoSearchItem.html_url
            repoSearchLink.innerText = 'Link to repository.'
            repoSearchElement.append(repoSearchLink)
            document.getElementById('user-list').appendChild(repoSearchElement)
        })
    })
}