(function () {
  // Define cat data
  var data = {
    cats: [
      { name: "Kitty", img: "./cat1.webp", count: 0 },
      { name: "Nicky", img: "./cat2.jpg", count: 0 },
      { name: "Milly", img: "./cat3.jpg", count: 0 },
      { name: "Roy", img: "./cat4.webp", count: 0 },
      { name: "Tony", img: "./cat5.jpg", count: 0 },
    ],
    currentCat: null,
    currentCatID: null,
  };

  var octopus = {
    // Init app
    init: function () {
      this.setCurrentCat(data.cats[0], 0);

      catListView.init();
      catView.init();
      adminForm.init();
    },

    // Get all cats from data
    getCats: function () {
      return data.cats;
    },

    // Set current selected cat data
    setCurrentCat: function (cat, id) {
      data.currentCat = cat;
      data.currentCatID = id;
    },

    // Get current selected cat data
    getCurrentCat: function () {
      return data.currentCat;
    },

    // Get current selected cat data ID
    getCurrentCatID: function () {
      return data.currentCatID;
    },

    // Update cat data from admin form submits
    updateCatsData: function (newData) {
      data.cats[data.currentCatID] = newData;
      this.setCurrentCat(newData, data.currentCatID);
      catListView.render();
      catView.render();
    },

    // Selected cat image click count incrementer
    incrmentCounter: function () {
      data.currentCat.count++;
      catView.render();
      adminForm.render();
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
      this.catList.innerHTML = "";
      cats.forEach((cat, id) => {
        let elem = document.createElement("li");
        elem.textContent = cat.name;
        elem.className = "list-group-item list-group-item-action ";

        // Event listener to cat name list to check selected cat
        elem.addEventListener(
          "click",
          ((cat, id) => {
            return () => {
              octopus.setCurrentCat(cat, id);

              catView.render();
              adminForm.render();
            };
          })(cat, id)
        );
        this.catList.appendChild(elem);
      });
    },
  };

  // Cat view object
  var catView = {
    // Init cat view
    init: function () {
      this.catName = document.getElementById("catName");
      this.clickCounter = document.getElementById("clickCounter");
      this.catImg = document.getElementById("catImg");

      // Cat image click event listener
      this.catImg.addEventListener("click", function () {
        octopus.incrmentCounter();
      });

      this.render();
    },

    // Render selected cat view to screen
    render: function () {
      let currentCat = octopus.getCurrentCat();
      this.catName.textContent = currentCat.name;
      this.catImg.src = currentCat.img;
      this.clickCounter.textContent = currentCat.count;
    },
  };

  var adminForm = {
    // Init admin form
    init: function () {
      this.adminBtn = document.getElementById("adminBtn");
      this.adminForm = document.getElementById("adminForm");
      this.catNameInput = document.getElementById("catNameInput");
      this.catImgUrlInput = document.getElementById("catImgUrlInput");
      this.imgClickCount = document.getElementById("imgClickCount");
      this.formCancel = document.getElementById("formCancel");
      this.formSubmit = document.getElementById("formSubmit");

      // Admin form admin btn event listener
      this.adminBtn.addEventListener("click", () => {
        this.adminForm.classList.toggle("d-none");
      });

      // Admin form cancel btn event listener
      this.formCancel.addEventListener("click", () => {
        this.adminForm.classList.toggle("d-none");
      });

      // Admin form submit btn event listener
      this.formSubmit.addEventListener("click", () => {
        this.submit();
      });

      this.render();
    },

    // Render Data to admin form
    render: function () {
      let currentCat = octopus.getCurrentCat();
      this.catNameInput.value = currentCat.name;
      this.catImgUrlInput.value = currentCat.img;
      this.imgClickCount.value = currentCat.count;
    },

    // Submit user admin form data to Data
    submit: function () {
      octopus.updateCatsData({
        name: this.catNameInput.value,
        img: this.catImgUrlInput.value,
        count: this.imgClickCount.value,
      });
    },
  };

  octopus.init();
})();
