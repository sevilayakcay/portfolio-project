const toggleBtn = document.querySelector(".hamburger");
const dropDown = document.querySelector(".drop-down");

toggleBtn.addEventListener("click", e => {
  e.stopPropagation();
  dropDown.classList.toggle("active");
});

document.addEventListener("click", () => {
  dropDown.classList.remove("active");
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    dropDown.classList.remove("active");
  }
});

const repoContainer = document.querySelector("#repo-container");
const username = "sevilayakcay";

if (!repoContainer) {
  console.error("repo-container bulunamadı");
} else {
  const selectedRepos = ["API-Assignment-group-6", "Responsive-Web-Game", "Portfolio-project", "group5-zooAssignment", "versioncontrol_group_09"];

  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => {
      if (!response.ok) {
        throw new Error("GitHub API error");
      }
      return response.json();
    })
    .then(repos => {
      const filteredRepos = repos.filter(repo => selectedRepos.includes(repo.name));

      // Eğer eşleşen repo yoksa kullanıcıya mesaj göster
      if (filteredRepos.length === 0) {
        repoContainer.innerHTML = "<p>No selected projects found.</p>";
        return;
      }

      filteredRepos.forEach(repo => {
        const card = document.createElement("div");
        card.className = "repo-card";
        card.tabIndex = 0; // accessibility (keyboard focus)

        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "Check out my repo on GitHub."}</p>
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        `;

        repoContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error("GitHub repos fetch error:", error);
      repoContainer.innerHTML = "<p>Unable to load projects at the moment.</p>";
    });
}
