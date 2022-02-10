const mergeSortUrl = "merge_sort"; // has to match app.use router in app.js

// Renders the Level Select view 
const renderLvlSelect = (req, res, next) => {
  console.log("-> Rendering Merge Sort Level Select Page:");
  res.status(200).render("lvl_select", {
    tabTitle: "MS",
    pageTitle: "Merge Sort",
    baseUrl: mergeSortUrl,
    maxLvl: 5
  });
  console.log("* Rendered Merge Sort Level Select Page: SUCCESS\n");
};

// Renders the Merge Sort levels
const renderMergeSortLvl = (req, res, next) => {
  console.log("-> Rendering Merge Sort Level " + req.params.lvl + ":");

  res.status(200).render("merge_sort", {
    tabTitle: "MS Lvl " + req.params.lvl,
    pageTitle: "Merge Sort",
    algLvl: req.params.lvl,
  });

  console.log("* Rendered Merge Sort Level " + req.params.lvl + ": SUCCESS\n");
};

// Returns the algorithm array
const getMergeSortRow = (req, res, next) => {
  console.log("-> Rendering Merge Sort Level " + req.params.lvl + ":");

  res.status(200).json({
    arr: req.body.algArr,
  });

  console.log("* Rendered Merge Sort Level " + req.params.lvl + ": SUCCESS\n");
};

module.exports = {
  renderLvlSelect,
  renderMergeSortLvl,
  getMergeSortRow,
};
