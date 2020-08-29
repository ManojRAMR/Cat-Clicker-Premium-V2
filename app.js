(function () {
  var data = {
    cats: [
      { name: "Kitty", img: "./cat1.webp", count: 0 },
      { name: "Nicky", img: "./cat2.jpg", count: 0 },
      { name: "Milly", img: "./cat3.jpg", count: 0 },
      { name: "Roy", img: "./cat4.webp", count: 0 },
      { name: "Tony", img: "./cat5.jpg", count: 0 },
    ],
    currentCat: null,
  };

  var octopus = {
    init: function () {
      this.setCurrentCat(data.cats[0]);

      catListView.init();
      catView.init();
    },
    // Get cats from data
    getCats: function () {
      return data.cats;
    },

    setCurrentCat: function (cat) {
      data.currentCat = cat;
    },

    getCurrentCat: function () {
      return data.currentCat;
    },

    incrmentCounter: function () {
      data.currentCat.count++;
      catView.render();
    },
  };

  var catListView = {
    // init cal list
    init: function () {
      this.catList = document.getElementById("catList");
      this.render();
    },

    // Render cat list
    render: function () {
      let cats = octopus.getCats();
      cats.forEach((cat) => {
        let elem = document.createElement("li");
        elem.textContent = cat.name;
        elem.className = "list-group-item list-group-item-action ";

        elem.addEventListener(
          "click",
          ((cat) => {
            return () => {
              octopus.setCurrentCat(cat);

              catView.render();
            };
          })(cat)
        );
        this.catList.appendChild(elem);
      });
    },
  };

  // Cat view object
  var catView = {
    init: function () {
      this.catName = document.getElementById("catName");
      this.clickCounter = document.getElementById("clickCounter");
      this.catImg = document.getElementById("catImg");

      this.catImg.addEventListener("click", function () {
        octopus.incrmentCounter();
      });

      this.render();
    },

    render: function () {
      let currentCat = octopus.getCurrentCat();
      this.catName.textContent = currentCat.name;
      this.catImg.src = currentCat.img;
      this.clickCounter.textContent = currentCat.count;
    },
  };

  octopus.init();
})();
