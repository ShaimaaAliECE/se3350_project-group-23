const mergeSortUrl = "merge_sort"; // has to match app.use router in app.js

// Renders the Level Select view 
const renderLvlSelect = (req, res, next) => {
  console.log("-> Rendering Merge Sort Level Select Page:");
  let jsonInfo = { 
    tabTitle: "MS Lvl " + req.params.lvl, 
    pageTitle: "Merge Sort",
    baseUrl: mergeSortUrl,
    maxLvl: 5,//5 change to 5 for 2nd release
    currLvl: (req.body.mergesortLvl == 0 ? 5 : req.body.mergesortLvl)
  }
  if(req.cookies.studentId && req.cookies.usr) {
      jsonInfo.usr = req.cookies.usr;
  }

  res.status(200).render("lvl_select", jsonInfo);

  console.log("* Rendered Merge Sort Level Select Page: SUCCESS\n");
};

// Renders the Merge Sort levels
const renderMergeSortLvl = (req, res, next) => {
  console.log("-> Rendering Merge Sort Level " + req.params.lvl + ":");

  let jsonInfo = { 
    tabTitle: "MS Lvl " + req.params.lvl, 
    pageTitle: "Merge Sort",
    algLvl: req.params.lvl,
  }
  if(req.cookies.studentId && req.cookies.usr) {
      jsonInfo.usr = req.cookies.usr;
  }

  res.status(200).render("merge_sort", jsonInfo);

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
