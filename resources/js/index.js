function ID() {
  return Math.random().toString(16).substring(2, 12);
}

function createAccordion(id, title) {
  return `
    <div class="accordion-item">
    <h2 class="accordion-header" id="flush-heading${id}">
    <button class="accordion-button collapsed accordion-title" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${id}" aria-expanded="true" aria-controls="flush-collapse${id}">
    ${title}
    </button>
    </h2>
    <div id="flush-collapse${id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${id}" data-bs-parent="#accordionFlushExample">
    <div class="accordion-body" id="accordion-body${id}">

    </div>
    </div>
    `;
}

function createCarouselOuter(id, innerId) {
  console.log(id,innerId)
  return `
    <div id="carousel${id}" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner" id="${innerId}">

    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel${id}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel${id}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
    </button>
    </div>
    `;
}

function createCarouselInner(id,active) {
  // console.log(id);
  return `
    <div class="carousel-item ${active ? "active" : ""}" id="${id}">

    </div>
    `;
}

function createCard(info,date) {
  return `
    
    <div class="card mb-3">
    <a href="${info.link}" target="_blank">
    <img src="${info.enclosure.link}" class="card-img-top" alt="Image">
    </a>
    <div class="card-body">
    <h5 class="card-title">${info.title}</h5>
    <p class="card-text"><span class="author">${info.author}</span><span class="date">${date}</span></p>
    <p class="card-text"><small class="text-muted">${info.description}</small></p>
    </div>
    </div>
    `;
}

async function addContent() {
  for (let i = 0; i < magazines.length; i++) {
    const url = magazines[i];
    // console.log(url);
    let response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${url}`
    );
    let data = await response.json();
    // console.log(data);

    //accordion
    let accordionId = ID();
    //console.log(accordionId);
    let accordion = createAccordion(accordionId, data.feed.title);
    document.querySelector(`#accordionFlushExample`).innerHTML += accordion;
    //showing first feed
    if (i == 0) {
      document
        .getElementById(`flush-collapse${accordionId}`)
        .classList.add("show");
    }
    //carouselOuter
    let carouselId = ID();
    let carouselInnerId = ID();
    //console.log(carouselId);
    let carousel = createCarouselOuter(carouselId, carouselInnerId);
    document.querySelector(`#accordion-body${accordionId}`).innerHTML +=
      carousel;

    //carouselInner
    // let innerId = ID();
    // let carouselInner = createCarouselInner(innerId,active);
    // document.getElementById(`${carouselInnerId}`).innerHTML += carouselInner;

    //cards
    let item = data.items;
    for (let j = 0; j < item.length; j++) {
      const pubDate = item[j].pubDate.split(" ");
      const date = pubDate[0];
      const cardItem = item[j];
      // console.log(date)
      let innerId = ID();
      let carouselInner = createCarouselInner(innerId, j==0);
      document.getElementById(`${carouselInnerId}`).innerHTML += carouselInner;
      let card = createCard(cardItem, date);
      // console.log(innerId);
      document.getElementById(`${innerId}`).innerHTML += card;
    }
  }
}
addContent();